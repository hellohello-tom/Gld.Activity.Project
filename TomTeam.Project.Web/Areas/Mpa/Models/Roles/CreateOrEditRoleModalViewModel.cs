using Abp.AutoMapper;
using TomTeam.Project.Authorization.Roles.Dto;
using TomTeam.Project.Web.Areas.Mpa.Models.Common;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Roles
{
    [AutoMapFrom(typeof(GetRoleForEditOutput))]
    public class CreateOrEditRoleModalViewModel : GetRoleForEditOutput, IPermissionsEditViewModel
    {
        public bool IsEditMode
        {
            get { return Role.Id.HasValue; }
        }

        public CreateOrEditRoleModalViewModel(GetRoleForEditOutput output)
        {
            output.MapTo(this);
        }
    }
}