using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Web.Mvc.Authorization;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.Gld;
using TomTeam.Project.Gld.Exam;
using TomTeam.Project.Gld.Metropolitan;

namespace TomTeam.Project.Web.Controllers
{
    [AbpMvcAuthorize]
    public class PersonalCenterController : TomAbpControllerBase
    {
        private readonly UserManager _userManager;
        private readonly IExamCollectAppService _examCollectAppService;
        private readonly IRepository<Metropolitan> _metropolitanRepository;
        private readonly IRepository<ExamHistory> _examHistoryAppService;
        private readonly IActivityConfigAppService _activityConfigAppService;
        public PersonalCenterController(UserManager _userManager, IExamCollectAppService _examCollectAppService, IRepository<Metropolitan> _metropolitanRepository, IRepository<ExamHistory> _examHistoryAppService, IActivityConfigAppService _activityConfigAppService)
        {
            this._userManager = _userManager;
            this._examCollectAppService = _examCollectAppService;
            this._metropolitanRepository = _metropolitanRepository;
            this._examHistoryAppService = _examHistoryAppService;
            this._activityConfigAppService = _activityConfigAppService;
        }
        // GET: PersonalCenter
        public async Task<ActionResult> Index()
        {
            ViewBag.UserInfo = await _userManager.FindByIdAsync(AbpSession.UserId.Value);
            ViewBag.ExamCollect = await _examCollectAppService.GetUserExamCollect();
            ViewBag.Metropolitan = await _metropolitanRepository.FirstOrDefaultAsync(x => !x.IsDeleted && x.CreatorUserId == AbpSession.UserId.Value)??new Metropolitan();
            ViewBag.UserExamHistory = await _examHistoryAppService.GetAllListAsync(x => x.CreatorUserId == AbpSession.UserId.Value) ?? new List<ExamHistory>();
            ViewBag.ActivityConfigHistory = await _activityConfigAppService.GetConfig(new Abp.Application.Services.Dto.NullableIdInput { Id = 0 });
            //
            return View();
        }
    }
}