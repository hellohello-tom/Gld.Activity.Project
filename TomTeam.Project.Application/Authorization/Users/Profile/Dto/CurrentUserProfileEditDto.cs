using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace TomTeam.Project.Authorization.Users.Profile.Dto
{
    [AutoMap(typeof(User))]
    public class CurrentUserProfileEditDto : IDoubleWayDto
    {
        [Required]
        [StringLength(User.MaxNameLength)]
        public string Name { get; set; }

        [Required]
        [StringLength(User.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [StringLength(User.MaxUserNameLength)]
        public string UserName { get; set; }

        [Required]
        [StringLength(User.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        public string Timezone { get; set; }
    }
}