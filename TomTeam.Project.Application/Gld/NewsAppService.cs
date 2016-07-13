using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using TomTeam.Project.Gld.Dto;
using Abp.Domain.Repositories;
using Abp.AutoMapper;
using System.Data.Entity;
using Abp.UI;
using Abp.Authorization;
using TomTeam.Project.Authorization;
using Abp.Linq.Extensions;

namespace TomTeam.Project.Gld
{
    [AbpAuthorize(AppPermissions.Pages_Activity_Manager)]
    public class NewsAppService : TomAbpAppServiceBase, INewsAppService
    {
        IRepository<News.News> _newsRepository;
        public NewsAppService(IRepository<News.News> _newsRepository)
        {
            this._newsRepository = _newsRepository;
        }

        public NewsAppService()
        {
        }

        public async Task<int> AddOrUpdate(CreateOrUpdateNewsInput createOrUpdateNewsInput)
        {
            var newsModel = new News.News();
            if (createOrUpdateNewsInput.Id.HasValue && createOrUpdateNewsInput.Id > 0)
            {
                newsModel = _newsRepository.Get(createOrUpdateNewsInput.Id.Value);
            }
            createOrUpdateNewsInput.MapTo(newsModel);
            return await _newsRepository.InsertOrUpdateAndGetIdAsync(newsModel);
        }

        public async Task DeleteNews(IdInput<int> input)
        {
            if (input.Id <= 0)
            {
                throw new UserFriendlyException("请传入正确的数值！");
            }
            await _newsRepository.DeleteAsync(input.Id);
        }

        public async Task<PagedResultOutput<GetNewsListOutput>> GetNewsList(SearchNewsInput searchInput)
        {
            var query = _newsRepository.GetAll().Where(news => !news.IsDeleted);
            if (!string.IsNullOrEmpty(searchInput.SearchTitle))
            {
                query = query.Where(news => news.Title.Contains(searchInput.SearchTitle));
            }
            var listCount = await query.CountAsync();
            var list = await query.OrderByDescending(x => x.CreationTime).PageBy(searchInput).ToListAsync();
            var newsListDto = list.MapTo<List<GetNewsListOutput>>();
            return new PagedResultOutput<GetNewsListOutput>(listCount, newsListDto);
        }

        public async Task<GetNewsListOutput> GetNews(NullableIdInput input)
        {
            GetNewsListOutput newsDetail;
            if (input.Id.HasValue)
            {
                var news = await _newsRepository.GetAsync(input.Id.Value);
                newsDetail = news.MapTo<GetNewsListOutput>();
            }

            else
            {
                newsDetail = new GetNewsListOutput();
            }
            return newsDetail;
        }
    }
}
