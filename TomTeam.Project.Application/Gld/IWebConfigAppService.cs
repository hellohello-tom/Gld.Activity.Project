using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Config;

namespace TomTeam.Project.Gld
{
    public interface IWebConfigAppService : IApplicationService
    {
        /// <summary>
        /// 增加或更新网站配置信息
        /// </summary>
        /// <param name="createOrUpdateNewsInput"></param>
        /// <returns></returns>
        Task<int> AddOrUpdate(WebConfig config);

        /// <summary>
        /// 获取Model
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<WebConfig> GetConfig(NullableIdInput input);
    }
}
