using System.Collections.Generic;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);
    }
}