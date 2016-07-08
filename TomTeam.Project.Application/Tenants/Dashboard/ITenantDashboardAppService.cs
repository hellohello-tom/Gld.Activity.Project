using Abp.Application.Services;
using TomTeam.Project.Tenants.Dashboard.Dto;

namespace TomTeam.Project.Tenants.Dashboard
{
    public interface ITenantDashboardAppService : IApplicationService
    {
        GetMemberActivityOutput GetMemberActivity();
    }
}
