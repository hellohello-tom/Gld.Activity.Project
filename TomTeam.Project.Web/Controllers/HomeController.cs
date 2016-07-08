using System.Web.Mvc;

namespace TomTeam.Project.Web.Controllers
{
    public class HomeController : TomAbpControllerBase
    {
        public ActionResult Index()
        {
            return View();
        }
	}
}