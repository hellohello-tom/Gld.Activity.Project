using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Caching.Dto;

namespace TomTeam.Project.Caching
{
    public interface ICachingAppService : IApplicationService
    {
        ListResultOutput<CacheDto> GetAllCaches();

        Task ClearCache(IdInput<string> input);

        Task ClearAllCaches();
    }
}
