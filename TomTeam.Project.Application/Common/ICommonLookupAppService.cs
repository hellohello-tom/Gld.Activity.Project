using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Common.Dto;

namespace TomTeam.Project.Common
{
    public interface ICommonLookupAppService : IApplicationService
    {
        Task<ListResultOutput<ComboboxItemDto>> GetEditionsForCombobox();

        Task<PagedResultOutput<NameValueDto>> FindUsers(FindUsersInput input);
    }
}