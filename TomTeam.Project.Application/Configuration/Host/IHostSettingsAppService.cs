using System.Threading.Tasks;
using Abp.Application.Services;
using TomTeam.Project.Configuration.Host.Dto;

namespace TomTeam.Project.Configuration.Host
{
    public interface IHostSettingsAppService : IApplicationService
    {
        Task<HostSettingsEditDto> GetAllSettings();

        Task UpdateAllSettings(HostSettingsEditDto input);

        Task SendTestEmail(SendTestEmailInput input);
    }
}
