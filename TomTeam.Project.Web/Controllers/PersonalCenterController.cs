using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.Gld.Exam;
using TomTeam.Project.Gld.Metropolitan;

namespace TomTeam.Project.Web.Controllers
{
    [AbpAuthorize]
    public class PersonalCenterController : TomAbpControllerBase
    {
        private readonly UserManager _userManager;
        private readonly IExamCollectAppService _examCollectAppService;
        private readonly IRepository<Metropolitan> _metropolitanRepository;
        public PersonalCenterController(UserManager _userManager, IExamCollectAppService _examCollectAppService, IRepository<Metropolitan> _metropolitanRepository)
        {
            this._userManager = _userManager;
            this._examCollectAppService = _examCollectAppService;
            this._metropolitanRepository = _metropolitanRepository;
        }
        // GET: PersonalCenter
        public async Task<ActionResult> Index()
        {
            ViewBag.UserInfo = await _userManager.FindByIdAsync(AbpSession.UserId.Value);
            ViewBag.ExamCollect = await _examCollectAppService.GetUserExamCollect();
            ViewBag.Metropolitan = await _metropolitanRepository.FirstOrDefaultAsync(x => !x.IsDeleted && x.CreatorUserId == AbpSession.UserId.Value)??new Metropolitan();
            //
            return View();
        }
    }
}