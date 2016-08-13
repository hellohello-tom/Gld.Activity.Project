using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Gld;

namespace TomTeam.Project.Web.Controllers
{
    public class PalaceController : Controller
    {
        private readonly IActivityConfigAppService _activityConfigAppService;
        public PalaceController(IActivityConfigAppService _activityConfigAppService)
        {
            this._activityConfigAppService = _activityConfigAppService;
        }
        // GET: Palace
        public async Task<ActionResult> Index()
        {
            var model = await _activityConfigAppService.GetConfig(new NullableIdInput { Id = 0 });
            return View(model);
        }
    }
}