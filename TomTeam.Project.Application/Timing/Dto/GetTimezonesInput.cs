using Abp.Application.Services.Dto;
using Abp.Configuration;

namespace TomTeam.Project.Timing.Dto
{
    public class GetTimezonesInput : IInputDto
    {
        public SettingScopes DefaultTimezoneScope;
    }
}
