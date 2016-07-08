using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Authorization;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Tenant_Dashboard)]
    public class DashboardController : TomAbpControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}