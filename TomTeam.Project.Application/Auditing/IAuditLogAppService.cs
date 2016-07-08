using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Auditing.Dto;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Auditing
{
    public interface IAuditLogAppService : IApplicationService
    {
        Task<PagedResultOutput<AuditLogListDto>> GetAuditLogs(GetAuditLogsInput input);

        Task<FileDto> GetAuditLogsToExcel(GetAuditLogsInput input);
    }
}