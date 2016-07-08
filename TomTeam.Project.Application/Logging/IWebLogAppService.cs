using Abp.Application.Services;
using TomTeam.Project.Dto;
using TomTeam.Project.Logging.Dto;

namespace TomTeam.Project.Logging
{
    public interface IWebLogAppService : IApplicationService
    {
        GetLatestWebLogsOutput GetLatestWebLogs();

        FileDto DownloadWebLogs();
    }
}
