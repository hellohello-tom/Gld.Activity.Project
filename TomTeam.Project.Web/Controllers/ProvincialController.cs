using Abp.Application.Navigation;
using Abp.Configuration.Startup;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.Threading;
using Abp.Web.Mvc.Authorization;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
        private IExamCollectAppService _examCollectAppService;
        private IRepository<ExamHistory> _examHistoryAppService;
        public ProvincialController(IProvincialExamAppService _provincialExamAppService, IActivityConfigAppService _activityConfigAppService, IExamCollectAppService _examCollectAppService, IRepository<ExamHistory> _examHistoryAppService)
        {
            
            this._provincialExamAppService = _provincialExamAppService;
            this._activityConfigAppService = _activityConfigAppService;
            this._examCollectAppService = _examCollectAppService;
            this._examHistoryAppService = _examHistoryAppService;
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
            ViewBag.UserExamHistory = await _examHistoryAppService.GetAllListAsync(x => x.CreatorUserId == AbpSession.UserId.Value) ?? new List<ExamHistory>();
            ViewBag.UserExamCollect = await _examCollectAppService.GetUserExamCollect();
            return View(activityConfig);
        }
    }
}