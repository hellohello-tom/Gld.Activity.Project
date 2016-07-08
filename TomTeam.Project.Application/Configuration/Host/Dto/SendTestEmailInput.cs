using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;
using TomTeam.Project.Authorization.Users;

namespace TomTeam.Project.Configuration.Host.Dto
{
    public class SendTestEmailInput : IInputDto
    {
        [Required]
        [MaxLength(User.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }
    }
}