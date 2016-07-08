using Abp.Application.Services.Dto;
using Abp.Configuration;

namespace TomTeam.Project.Timing.Dto
{
    public class GetTimezoneComboboxItemsInput : IInputDto
    {
        public SettingScopes DefaultTimezoneScope;

        public string SelectedTimezoneId { get; set; }
    }
}
