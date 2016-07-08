using Abp.WebApi.Controllers;

namespace TomTeam.Project.WebApi
{
    public abstract class TomAbpApiControllerBase : AbpApiController
    {
        protected TomAbpApiControllerBase()
        {
            LocalizationSourceName = TomAbpConsts.LocalizationSourceName;
        }
    }
}