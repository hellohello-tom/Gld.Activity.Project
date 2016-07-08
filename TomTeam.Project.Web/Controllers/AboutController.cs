using System.Web.Mvc;

namespace TomTeam.Project.Web.Controllers
{
    public class AboutController : TomAbpControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}