using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Authorization.Users.Dto;

namespace TomTeam.Project.Authorization.Users
{
    public interface IUserLinkAppService : IApplicationService
    {
        Task LinkToUser(LinkToUserInput linkToUserInput);

        Task<PagedResultOutput<LinkedUserDto>> GetLinkedUsers(GetLinkedUsersInput input);

        Task<ListResultOutput<LinkedUserDto>> GetRecentlyUsedLinkedUsers();

        Task UnlinkUser(UnlinkUserInput input);
    }
}
