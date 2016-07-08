using System.Threading.Tasks;
using System.Web.Mvc;
using Abp.Application.Services.Dto;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Authorization;
using TomTeam.Project.Authorization.Roles;
using TomTeam.Project.Web.Areas.Mpa.Models.Roles;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_Roles)]
    public class RolesController : TomAbpControllerBase
    {
        private readonly IRoleAppService _roleAppService;

        public RolesController(IRoleAppService roleAppService)
        {
            _roleAppService = roleAppService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [AbpMvcAuthorize(AppPermissions.Pages_Administration_Roles_Create, AppPermissions.Pages_Administration_Roles_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(int? id)
        {
            var output = await _roleAppService.GetRoleForEdit(new NullableIdInput {Id = id});
            var viewModel = new CreateOrEditRoleModalViewModel(output);

            return PartialView("_CreateOrEditModal", viewModel);
        }
    }
}