using System.Threading.Tasks;
using Abp.Application.Services;
using TomTeam.Project.Configuration.Tenants.Dto;

namespace TomTeam.Project.Configuration.Tenants
{
    public interface ITenantSettingsAppService : IApplicationService
    {
        Task<TenantSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(TenantSettingsEditDto input);
    }
}
