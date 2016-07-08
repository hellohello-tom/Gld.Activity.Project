using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Authorization.Users.Dto;

namespace TomTeam.Project.Authorization.Users
{
    public interface IUserLoginAppService : IApplicationService
    {
        Task<ListResultOutput<UserLoginAttemptDto>> GetRecentUserLoginAttempts();
    }
}
