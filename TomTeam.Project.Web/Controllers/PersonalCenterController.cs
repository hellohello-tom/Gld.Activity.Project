using Abp.Authorization;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.Gld.Exam;

namespace TomTeam.Project.Web.Controllers
{
    [AbpAuthorize]
    public class PersonalCenterController : TomAbpControllerBase
    {
        private readonly UserManager _userManager;
        private readonly IExamCollectAppService _examCollectAppService;
        public PersonalCenterController(UserManager _userManager, IExamCollectAppService _examCollectAppService)
        {
            this._userManager = _userManager;
            this._examCollectAppService = _examCollectAppService;
        }
        // GET: PersonalCenter
        public async Task<ActionResult> Index()
        {
            ViewBag.UserInfo = await _userManager.FindByIdAsync(AbpSession.UserId.Value);
            ViewBag.ExamCollect = await _examCollectAppService.GetUserExamCollect();
            //
            return View();
        }
    }
}