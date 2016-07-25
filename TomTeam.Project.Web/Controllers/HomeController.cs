using Abp.Application.Services.Dto;
using System.Threading.Tasks;
using System.Web.Mvc;
using TomTeam.Project.Gld;

namespace TomTeam.Project.Web.Controllers
{
    public class HomeController : TomAbpControllerBase
    {
        private IWebConfigAppService _webConfigAppService;
        private INewsAppService _newsAppService;
        public HomeController(IWebConfigAppService _webConfigAppService, INewsAppService _newsAppService)
        {
            this._webConfigAppService = _webConfigAppService;
            this._newsAppService = _newsAppService;
        }

        public async virtual Task<ActionResult> Index()
        {
            var webConfigModel = await _webConfigAppService.GetConfig(new NullableIdInput { Id = 0 });
            ViewBag.NewsList = await _newsAppService.GetNewsList(new Gld.Dto.SearchNewsInput { MaxResultCount = 7 });
            return View(webConfigModel);
        }

        public ActionResult Login()
        {
            return View();
        }

        [ChildActionOnly]
        public ActionResult PageTips(string message = "", bool isShowTitles = true)
        {
            ViewBag.Message = message;
            ViewBag.IsShowTitle = isShowTitles;
            return View();
        }

    }
}