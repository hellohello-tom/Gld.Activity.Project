using Abp.Application.Navigation;
using Abp.Configuration.Startup;
using Abp.Runtime.Session;
using Abp.Threading;
using Abp.Web.Mvc.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Gld;
using TomTeam.Project.Gld.Exam;
using TomTeam.Project.Sessions;
using TomTeam.Project.Web.Areas.Mpa.Models.Layout;
using TomTeam.Project.Web.Navigation;

namespace TomTeam.Project.Web.Controllers
{
    
    public class ProvincialController : TomAbpControllerBase
    {
        private IProvincialExamAppService _provincialExamAppService;
        private IActivityConfigAppService _activityConfigAppService;
        private readonly ISessionAppService _sessionAppService;
        private readonly IUserNavigationManager _userNavigationManager;
        private readonly IMultiTenancyConfig _multiTenancyConfig;
        public ProvincialController(IProvincialExamAppService _provincialExamAppService, IActivityConfigAppService _activityConfigAppService, ISessionAppService sessionAppService, IUserNavigationManager userNavigationManager, IMultiTenancyConfig multiTenancyConfig)
        {
            
            this._provincialExamAppService = _provincialExamAppService;
            this._activityConfigAppService = _activityConfigAppService;
            _sessionAppService = sessionAppService;
            _userNavigationManager = userNavigationManager;
            _multiTenancyConfig = multiTenancyConfig;
        }

        [ChildActionOnly]
        public PartialViewResult Header()
        {
            var headerModel = new HeaderViewModel();

            if (AbpSession.UserId.HasValue)
            {
                headerModel.LoginInformations = AsyncHelper.RunSync(() => _sessionAppService.GetCurrentLoginInformations());
            }

            return PartialView("~/Views/Provincial/_Header.cshtml", headerModel);
        }
        // GET: Provincial
        public async Task<ActionResult> Index()
        {
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            //获取配置信息
            var activityConfig = await _activityConfigAppService.GetConfig(new Abp.Application.Services.Dto.NullableIdInput { Id = 0 });
            if (activityConfig.ProvincialState)
            {
                ViewBag.ExamList = await _provincialExamAppService.GetExamRadom(new Gld.Exam.Dto.SearchExamInput
                {
                    MaxResultCount = activityConfig.ExamCount,
                });
            }
            return View(activityConfig);
        }
    }
}