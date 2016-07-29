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
        IRepository<ExamTopic> _provincialRepository;
        IRepository<ExamHistory> _examHistoryRepository;
        public ExamCollectAppService(IActivityConfigAppService _activityConfigRepository, IRepository<ExamCollect> _examCollectRepository, IRepository<Exam.ExamTopic> _provincialRepository, IRepository<ExamHistory> _examHistoryRepository)
        {
            this._activityConfigRepository = _activityConfigRepository;
            this._examCollectRepository = _examCollectRepository;
            this._provincialRepository = _provincialRepository;
            this._examHistoryRepository = _examHistoryRepository;
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

            var detail = await _examCollectRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId.Value && !x.IsDeleted) ?? new ExamCollect();

            return detail.MapTo<GetExamCollectOutput>();
        }

        public async Task InitExamInfo()
        {
            if (!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("没有获取到登录用户信息！");
            var userInit = await _examCollectRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId.Value) ?? new ExamCollect();
            if (userInit.Id <= 0)
            {
                var user = await UserManager.GetUserByIdAsync(AbpSession.UserId.Value);
                userInit = await _examCollectRepository.InsertAsync(new ExamCollect
                {
                    IsMetropolitanStatus = true,
                    UserId = Convert.ToInt32(AbpSession.UserId.Value),
                    ProvincialIntegral = 0,
                    IsCompleteProvincial = false,
                    UserDisplayName = user.Name
                });
            }
            //初始化历史数据
            var userExamHistoryList = await _examHistoryRepository.GetAll().Where(x => x.CreatorUserId == AbpSession.UserId.Value).OrderByDescending(X => X.CreationTime).ToListAsync() ?? new List<ExamHistory>();
            var activityConfig = await _activityConfigRepository.GetConfig(new NullableIdInput { Id = 0 });
            if (userExamHistoryList.Count + 1 > activityConfig.ExaminationCount)
                throw new UserFriendlyException("您的考试次数已用完！");
            var detail = userExamHistoryList.FirstOrDefault();
            if (detail != null)
            {
                if (!detail.IsCompleteProvincial && DateTime.Now < detail.CreationTime.AddMinutes(activityConfig.ExamTime))
                    throw new UserFriendlyException("您已初始化过数据，请直接刷新页面进行考试！");
            }
            await _examHistoryRepository.InsertAndGetIdAsync(new ExamHistory
            {
                Score = 0,
                ExamCollect = userInit,
                IsCompleteProvincial = false
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
            var userCollect = await _examCollectRepository.FirstOrDefaultAsync(x => x.UserId == AbpSession.UserId) ?? new ExamCollect();
            if (userCollect.Id <= 0)
                throw new UserFriendlyException("您还没有初始化数据，请在页面点击开始考试！");
            //获取考试历史内容
            var userExamHistoryList = await _examHistoryRepository.GetAll().Where(x => x.CreatorUserId == AbpSession.UserId.Value).OrderByDescending(X => X.CreationTime).ToListAsync();
            if (userExamHistoryList == null || userExamHistoryList.Count == 0)
                throw new UserFriendlyException("您还没有初始化数据，请在页面点击开始考试！");
            if (userExamHistoryList.Count >= activityConfig.ExaminationCount)
                throw new UserFriendlyException("您的考试次数已用完！");

            var historyDetail = userExamHistoryList.FirstOrDefault();
            if (input.ExamHistoryId != historyDetail.Id)
                throw new UserFriendlyException("页面数据变化，请刷新页面重新进行考试！");
            if (DateTime.Now > historyDetail.CreationTime.AddMinutes(activityConfig.ExamTime))
                throw new UserFriendlyException("您的考试时间已过，本次成绩无效，请直接开始下次考试！");
            if (historyDetail.IsCompleteProvincial)
                throw new UserFriendlyException("您已提交过本次试卷，不能重复提交！");
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
            historyDetail.Score = intergral;
            historyDetail.IsCompleteProvincial = true;
            await _examHistoryRepository.UpdateAsync(historyDetail);
            userCollect.ProvincialIntegral = userCollect.ProvincialIntegral + intergral;
            if (userExamHistoryList.Count >= activityConfig.ExaminationCount)
            {
                userCollect.IsCompleteProvincial = true;
            }
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


        [AbpAuthorize(AppPermissions.Pages_Activity_ProvincialExaminationCollect)]
        public async Task DeleteCollect(IdInput input)
        {
            if (input.Id <= 0)
            {
                throw new UserFriendlyException("请传入正确的数值！");
            }

            var collect = await _examCollectRepository.SingleAsync(x => x.Id == input.Id);

            await _examCollectRepository.DeleteAsync(collect);
            await _examHistoryRepository.DeleteAsync(x => x.ExamCollect.Id == collect.Id);
        }
    }
}
