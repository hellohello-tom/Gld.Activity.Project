using System.Collections.Generic;
using TomTeam.Project.Auditing.Dto;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Auditing.Exporting
{
    public interface IAuditLogListExcelExporter
    {
        FileDto ExportToFile(List<AuditLogListDto> auditLogListDtos);
    }
}
