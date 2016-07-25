using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Gld;
using TomTeam.Project.Gld.Exam;
using TomTeam.Project.Gld.Metropolitan;
using TomTeam.Project.Gld.Metropolitan.Dto;

namespace TomTeam.Project.Web.Controllers
{
    public class MetropolitanController : TomAbpControllerBase
    {
        private IActivityConfigAppService _activityConfigAppService;
        IMetropolitanAppService _metropolitanAppService;
        IExamCollectAppService _examColllectAppService;
        IRepository<Metropolitan> _metropolitanRepository;
        public MetropolitanController(IMetropolitanAppService _metropolitanAppService, IExamCollectAppService _examColllectAppService, IRepository<Metropolitan> _metropolitanRepository, IActivityConfigAppService _activityConfigAppService)
        {
            this._metropolitanAppService = _metropolitanAppService;
            this._examColllectAppService = _examColllectAppService;
            this._metropolitanRepository = _metropolitanRepository;
            this._activityConfigAppService = _activityConfigAppService;
        }

        // GET: Metropolitan
        /// <summary>
        /// 浏览会试
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> Index(string sortName = "", int pageIndex = 1, int pageSize = 15)
        {
            ViewBag.IsLogin = AbpSession.UserId.HasValue;

            var pagedList = await _metropolitanAppService.GetMetropolitanList(new Gld.Metropolitan.Dto.SearchMetropolitanInput
            {
                Sorting = sortName,
                MaxResultCount = pageSize,
                SkipCount = pageIndex - 1
            });
            if (AbpSession.UserId.HasValue)
            {
                ViewBag.ExamCollectUserInfo = await _metropolitanRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId);
            }

            return View(pagedList);
        }

        public async Task<ActionResult> Detail(int id)
        {
            //增加一次浏览记录
            var detail = await _metropolitanAppService.GetMetropolitanById(new NullableIdInput { Id = id });
            if (detail.Id > 0)
            {
                detail.ViewCount = detail.ViewCount++;
                var data = detail.MapTo<Metropolitan>();
                await _metropolitanRepository.UpdateAsync(data);
            }
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            return View(detail);
        }

        /// <summary>
        /// 上传工程
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> UploadProject(NullableIdInput input)
        {
            var model = new GetMetropolitanOutput();
            var activityConfig = await _activityConfigAppService.GetConfig(new NullableIdInput { Id = 0 });
            if (activityConfig.ProvincialState)
            {
                var examInfoModel = await _examColllectAppService.GetUserExamCollect();
                model = await _metropolitanAppService.GetMetropolitanById(input);
                ViewBag.ExamInfo = examInfoModel;

                ViewBag.IsLogin = AbpSession.UserId.HasValue;
            }
            ViewBag.ActivityConfig = activityConfig;
            return View(model);
        }
    }
}