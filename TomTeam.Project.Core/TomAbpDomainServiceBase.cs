using Abp.Domain.Services;

namespace TomTeam.Project
{
    public abstract class TomAbpDomainServiceBase : DomainService
    {
        /* Add your common members for all your domain services. */

        protected TomAbpDomainServiceBase()
        {
            LocalizationSourceName = TomAbpConsts.LocalizationSourceName;
        }
    }
}
