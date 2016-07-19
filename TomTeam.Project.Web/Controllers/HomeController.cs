using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using System.Web.Mvc;
using TomTeam.Project.Gld;

namespace TomTeam.Project.Web.Controllers
{
    public class HomeController : TomAbpControllerBase
    {
        public  ActionResult Index()
        {
            return View();
            //return View();
        }
    }
}