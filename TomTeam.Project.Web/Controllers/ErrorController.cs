using System.Web.Mvc;
using Abp.Auditing;

namespace TomTeam.Project.Web.Controllers
{
    public class ErrorController : TomAbpControllerBase
    {
        [DisableAuditing]
        public ActionResult E404()
        {
            return View();
        }
    }
}