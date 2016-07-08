using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.Auditing;

namespace TomTeam.Project.Authorization.Users.Profile.Dto
{
    public class ChangePasswordInput : IInputDto
    {
        [Required]
        [StringLength(User.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string CurrentPassword { get; set; }

        [Required]
        [StringLength(User.MaxPlainPasswordLength, MinimumLength = User.MinPlainPasswordLength)]
        [DisableAuditing]
        public string NewPassword { get; set; }
    }
}