using System.Web.Mvc;
using Abp.Auditing;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Authorization;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [DisableAuditing]
    [AbpMvcAuthorize(AppPermissions.Pages_Administration_AuditLogs)]
    public class AuditLogsController : TomAbpControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}