using Abp.AutoMapper;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.Web.Areas.Mpa.Models.Common;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Users
{
    [AutoMapFrom(typeof(GetUserPermissionsForEditOutput))]
    public class UserPermissionsEditViewModel : GetUserPermissionsForEditOutput, IPermissionsEditViewModel
    {
        public User User { get; private set; }

        public UserPermissionsEditViewModel(GetUserPermissionsForEditOutput output, User user)
        {
            User = user;
            output.MapTo(this);
        }
    }
}