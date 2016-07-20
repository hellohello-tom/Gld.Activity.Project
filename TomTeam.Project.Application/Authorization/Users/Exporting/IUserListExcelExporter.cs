using System.Collections.Generic;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.Dto;
using TomTeam.Project.Gld.Dto;

namespace TomTeam.Project.Authorization.Users.Exporting
{
    public interface IUserListExcelExporter
    {
        FileDto ExportToFile(List<UserListDto> userListDtos);

        FileDto ExportToFile(List<UserInfoListDto> userListDtos);
        
    }
}