using Abp.Runtime.Validation;

namespace TomTeam.Project.Configuration.Host.Dto
{
    public class HostUserManagementSettingsEditDto : IValidate
    {
        public bool IsEmailConfirmationRequiredForLogin { get; set; }
    }
}