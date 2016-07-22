using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using TomTeam.Project.Gld.Metropolitan;
using TomTeam.Project.Gld.Metropolitan.Dto;
using Abp.Authorization;
using TomTeam.Project.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using Abp.AutoMapper;
using System.Data.Entity;
using Abp.Linq.Extensions;

namespace TomTeam.Project.Gld.Metropolitan
{
    public class MetropolitanAppService : TomAbpAppServiceBase, IMetropolitanAppService
    {
        IRepository<Exam.Metropolitan> _metropolitanRepository;
        public MetropolitanAppService(IRepository<Exam.Metropolitan> _metropolitanRepository)
        {
            this._metropolitanRepository = _metropolitanRepository;
        }

        public async Task AddMetropolitian(CreateOrUpdateMetropolitanInput input)
        {
            var model = new Exam.Metropolitan();
            if (!AbpSession.UserId.HasValue)
                throw new UserFriendlyException("没有获取到当前登录用户信息");
            input.MapTo(model);
            await _metropolitanRepository.InsertOrUpdateAndGetIdAsync(model);
        }

        public async Task DeleteMetropolitan(IdInput<int> input)
        {
            if (input.Id <= 0)
            {
                throw new UserFriendlyException("请传入正确的数值！");
            }
            await _metropolitanRepository.DeleteAsync(input.Id);
        }

        public async Task<GetMetropolitanOutput> GetMetropolitanById(NullableIdInput input)
        {
            GetMetropolitanOutput newsDetail;
            if (input.Id.HasValue)
            {
                var news = await _metropolitanRepository.GetAsync(input.Id.Value);
                newsDetail = news.MapTo<GetMetropolitanOutput>();
            }

            else
            {
                newsDetail = new GetMetropolitanOutput();
            }
            return newsDetail;
        }
        
        public async Task<PagedResultOutput<GetMetropolitanOutput>> GetMetropolitanList(SearchMetropolitanInput input)
        {
            var query = _metropolitanRepository.GetAll().Where(news => !news.IsDeleted);
            if (!string.IsNullOrEmpty(input.SearchTitle))
            {
                query = query.Where(news => news.Title.Contains(input.SearchTitle));
            }
            var listCount = await query.CountAsync();
            var list = await query.OrderByDescending(x => x.CreationTime).PageBy(input).ToListAsync();
            var newsListDto = list.MapTo<List<GetMetropolitanOutput>>();
            return new PagedResultOutput<GetMetropolitanOutput>(listCount, newsListDto);
        }

        [AbpAuthorize(AppPermissions.Pages_Activity_MetropolitanExamination)]
        public async Task<int> Update(UpdateMetropolitanForAdminInput input)
        {
            if (input.Id > 0)
            {
                var newsModel = _metropolitanRepository.Get(input.Id);
                input.MapTo(newsModel);
                return await _metropolitanRepository.InsertOrUpdateAndGetIdAsync(newsModel);
            }
            else
            {
                throw new UserFriendlyException("数据传递错误");
            }
        }
    }
}
