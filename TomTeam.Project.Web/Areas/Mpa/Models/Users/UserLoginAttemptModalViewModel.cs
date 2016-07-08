using System.Collections.Generic;
using TomTeam.Project.Authorization.Users.Dto;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Users
{
    public class UserLoginAttemptModalViewModel
    {
        public List<UserLoginAttemptDto> LoginAttempts { get; set; }
    }
}