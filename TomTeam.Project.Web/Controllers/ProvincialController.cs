using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Gld;
using TomTeam.Project.Gld.Exam;

namespace TomTeam.Project.Web.Controllers
{
    public class ProvincialController : Controller
    {
        private IProvincialExamAppService _provincialExamAppService;
        private IActivityConfigAppService _activityConfigAppService;
        public ProvincialController(IProvincialExamAppService _provincialExamAppService, IActivityConfigAppService _activityConfigAppService)
        {
            this._provincialExamAppService = _provincialExamAppService;
            this._activityConfigAppService = _activityConfigAppService;
        }

        // GET: Provincial
        public async Task<ActionResult> Index()
        {
            //获取配置信息
            var activityConfig = await _activityConfigAppService.GetConfig(new Abp.Application.Services.Dto.NullableIdInput { Id = 0 });
            if (activityConfig.ProvincialState)
            {
                ViewBag.ExamList = _provincialExamAppService.GetExamRadom(new Gld.Exam.Dto.SearchExamInput
                {
                    MaxResultCount = activityConfig.ExamCount,
                });
            }
            return View(activityConfig);
        }
    }
}