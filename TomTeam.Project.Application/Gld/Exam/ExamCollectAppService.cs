using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Authorization;
using TomTeam.Project.Config;
using TomTeam.Project.Gld.Exam.Dto;

namespace TomTeam.Project.Gld.Exam
{
    public class ExamCollectAppService : TomAbpAppServiceBase, IExamCollectAppService
    {
        IActivityConfigAppService _activityConfigRepository;
        IRepository<ExamCollect> _examCollectRepository;
        IRepository<Exam.ExamTopic> _provincialRepository;
        public ExamCollectAppService(IActivityConfigAppService _activityConfigRepository, IRepository<ExamCollect> _examCollectRepository, IRepository<Exam.ExamTopic> _provincialRepository)
        {
            this._activityConfigRepository = _activityConfigRepository;
            this._examCollectRepository = _examCollectRepository;
            this._provincialRepository = _provincialRepository;
        }

        [AbpAuthorize(AppPermissions.Pages_Activity_ProvincialExaminationCollect)]
        public async Task<PagedResultOutput<GetExamCollectOutput>> GetExamCollectList(SearchExamCollectInput searchInput)
        {
            var query = _examCollectRepository.GetAll().Where(collect => !collect.IsDeleted);
            if (!string.IsNullOrEmpty(searchInput.SearchTitle))
            {
                query = query.Where(collect => collect.UserDisplayName.Contains(searchInput.SearchTitle));
            }
            var listCount = await query.CountAsync();
            var list = await query.OrderByDescending(x => x.CreationTime).PageBy(searchInput).ToListAsync();
            var newsListDto = list.MapTo<List<GetExamCollectOutput>>();
            return new PagedResultOutput<GetExamCollectOutput>(listCount, newsListDto);
        }





        public async Task<GetExamCollectOutput> GetUserExamCollect()
        {

            var detail = await _examCollectRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId.Value) ?? new ExamCollect();

            return detail.MapTo<GetExamCollectOutput>();
        }

        public async Task InitExamInfo()
        {
            if (!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("没有获取到登录用户信息！");
            var userInit = await _examCollectRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId.Value)??new ExamCollect();
            if (userInit.Id > 0)
                throw new UserFriendlyException("您已初始化过考试信息，请直接进行考试！");
            var user = await UserManager.GetUserByIdAsync(AbpSession.UserId.Value);
            await _examCollectRepository.InsertAsync(new ExamCollect
            {
                IsCompleteProvincial = false,
                MetropolitanFile = "",
                IsMetropolitanStatus = false,
                MetropolitanImg = "",
                UserId = Convert.ToInt32(AbpSession.UserId.Value),
                ProvincialIntegral = 0,
                UserDisplayName = user.Name
            });
        }

        public async Task PostExamInfo(ProvincialInput input)
        {
            
            if (!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("没有获取到登录用户信息！");
            var activityConfig = await _activityConfigRepository.GetConfig(new NullableIdInput { Id = 0 });
            if (activityConfig == null)
                throw new UserFriendlyException("没有获取到活动的配置信息！");
            if (!activityConfig.ProvincialState)
                throw new UserFriendlyException("乡试活动已关闭！");
            if (DateTime.Now < activityConfig.ProvincialStartTime)
                throw new UserFriendlyException("乡试活动未开始！");
            if (DateTime.Now > activityConfig.ProvincialEndTime)
                throw new UserFriendlyException("乡试活动已结束！");
            var userCollect = await _examCollectRepository.FirstOrDefaultAsync(x => x.UserId == AbpSession.UserId)?? new ExamCollect();
            if (userCollect.Id<=0)
                throw new UserFriendlyException("您还没有初始化数据！");
            if (DateTime.Now > userCollect.CreationTime.AddMinutes(activityConfig.ExamTime))
                throw new UserFriendlyException("您的考试时间已过，数据无效！");
            if (userCollect.IsCompleteProvincial)
                throw new UserFriendlyException("您已提交过试卷，不能重复提交！");
            if (input.Answers == null || input.Answers.Count == 0 || input.Answers.Count > 1000)
                throw new UserFriendlyException("没有获取到您的答题内容，请重新提交！");
            //获取全部试卷
            var examList = await _provincialRepository.GetAll().Include(x => x.Answers).ToListAsync();
            var dictonaryExamList = examList.GroupBy(x => x.Id).ToDictionary(x => x.First().Id, x => x.First());
            var intergral = 0;
            foreach (var item in input.Answers.GroupBy(x => x.Topic).Select(x => x.First()))
            {
                if (dictonaryExamList.ContainsKey(item.Topic))
                {
                    if (dictonaryExamList[item.Topic].Answers.Where(x => x.IsTrueAnswer).Count(x => x.Id == item.Answer) > 0)
                    {
                        intergral += activityConfig.EveryExamIntegral;
                    }
                }
            }

            //更新实体
            userCollect.IsCompleteProvincial = true;
            userCollect.ProvincialIntegral = intergral;
            await _examCollectRepository.UpdateAsync(userCollect);
        }

        [AbpAuthorize(AppPermissions.Pages_Activity_ProvincialExaminationCollect)]

        public async Task<ExamCollect> Update(CreateOrUpdateExamCollectInput updateCollectInput)
        {
            var model = new ExamCollect();
            if (updateCollectInput.Id.HasValue && updateCollectInput.Id > 0)
            {
                model = await _examCollectRepository.GetAsync(updateCollectInput.Id.Value);
            }
            updateCollectInput.MapTo(model);
            return await _examCollectRepository.UpdateAsync(model);
        }
    }
}
