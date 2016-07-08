using System.Threading.Tasks;
using Abp.Configuration;

namespace TomTeam.Project.Timing
{
    public interface ITimeZoneService
    {
        Task<string> GetDefaultTimezoneAsync(SettingScopes scope, int? tenantId);
    }
}
