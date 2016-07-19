using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using TomTeam.Project.Config;
using Abp.UI;
using Abp.Authorization;
using TomTeam.Project.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using System.Data.Entity;

namespace TomTeam.Project.Gld
{
    public class WebConfigAppService : TomAbpAppServiceBase, IWebConfigAppService
    {
        IRepository<WebConfig> _webconfigRepository;
        public WebConfigAppService(IRepository<WebConfig> _webconfigRepository)
        {
            this._webconfigRepository = _webconfigRepository;
        }

        [AbpAuthorize(AppPermissions.Pages_Activity_Manager)]
        public async Task<int> AddOrUpdate(WebConfig config)
        {
            if (config == null) throw new UserFriendlyException("传递的数据不正确");
            
            return await _webconfigRepository.InsertOrUpdateAndGetIdAsync(config);
        }

        public async Task<WebConfig> GetConfig(NullableIdInput input)
        {
            WebConfig configDetail;
            if (input.Id.HasValue && input.Id > 0)
            {
                configDetail = await _webconfigRepository.GetAsync(input.Id.Value);
            }

            else
            {
                configDetail = await _webconfigRepository.GetAll().OrderByDescending(x => x.CreationTime).FirstOrDefaultAsync() ?? new WebConfig();
            }
            return configDetail;
        }
    }
}
