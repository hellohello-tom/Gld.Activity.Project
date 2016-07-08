using System.Threading.Tasks;
using Abp.Application.Services;
using TomTeam.Project.Sessions.Dto;

namespace TomTeam.Project.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
