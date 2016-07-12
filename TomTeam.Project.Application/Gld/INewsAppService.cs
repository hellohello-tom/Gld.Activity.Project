using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Gld.Dto;

namespace TomTeam.Project.Gld
{
    public interface INewsAppService : IApplicationService
    {
        /// <summary>
        /// 获取新闻列表
        /// </summary>
        /// <param name="searchName"></param>
        /// <returns></returns>
        Task<PagedResultOutput<GetNewsListOutput>> GetNewsList(SearchNewsInput searchName);

        /// <summary>
        /// 删除新闻
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteNews(IdInput<int> input);

        /// <summary>
        /// 增加或更新新闻信息放回主键ID
        /// </summary>
        /// <param name="createOrUpdateNewsInput"></param>
        /// <returns></returns>
        Task<int> AddOrUpdate(CreateOrUpdateNewsInput createOrUpdateNewsInput);
    }
}
