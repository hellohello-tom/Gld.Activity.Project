using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class WelcomeController : TomAbpControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}