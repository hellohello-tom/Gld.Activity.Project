using System.Collections.Generic;
using TomTeam.Project.Authorization.Dto;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Common
{
    public interface IPermissionsEditViewModel
    {
        List<FlatPermissionDto> Permissions { get; set; }

        List<string> GrantedPermissionNames { get; set; }
    }
}