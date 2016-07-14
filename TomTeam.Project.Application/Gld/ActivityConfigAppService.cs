using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Authorization;
using TomTeam.Project.Config;

namespace TomTeam.Project.Gld
{
    [AbpAuthorize(AppPermissions.Pages_Activity_Manager)]
    public class ActivityConfigAppService : TomAbpAppServiceBase, IActivityConfigAppService
    {
        IRepository<ActivityConfig> _activityConfigRepository;
        public ActivityConfigAppService(IRepository<ActivityConfig> _activityConfigRepository)
        {
            this._activityConfigRepository = _activityConfigRepository;
        }
        public async Task<int> AddOrUpdate(ActivityConfig config)
        {
            if (config == null) throw new UserFriendlyException("传递的数据不正确");
            return await _activityConfigRepository.InsertOrUpdateAndGetIdAsync(config);
        }

        public async Task<ActivityConfig> GetConfig(NullableIdInput input)
        {
            ActivityConfig configDetail;
            if (input.Id.HasValue && input.Id > 0)
            {
                configDetail = await _activityConfigRepository.GetAsync(input.Id.Value);
            }

            else
            {
                configDetail = await _activityConfigRepository.GetAll().OrderByDescending(x => x.CreationTime).FirstOrDefaultAsync() ?? new ActivityConfig();
            }
            return configDetail;
        }
    }
}
