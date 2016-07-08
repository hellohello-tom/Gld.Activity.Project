using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Timing.Dto;

namespace TomTeam.Project.Timing
{
    public interface ITimingAppService : IApplicationService
    {
        Task<ListResultOutput<NameValueDto>> GetTimezones(GetTimezonesInput input);

        Task<List<ComboboxItemDto>> GetEditionComboboxItems(GetTimezoneComboboxItemsInput input);
    }
}
