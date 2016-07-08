using System.Threading.Tasks;
using Abp.Application.Services;
using TomTeam.Project.Authorization.Users.Profile.Dto;

namespace TomTeam.Project.Authorization.Users.Profile
{
    public interface IProfileAppService : IApplicationService
    {
        Task<CurrentUserProfileEditDto> GetCurrentUserProfileForEdit();

        Task UpdateCurrentUserProfile(CurrentUserProfileEditDto input);
        
        Task ChangePassword(ChangePasswordInput input);

        Task UpdateProfilePicture(UpdateProfilePictureInput input);
    }
}
