using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using System;
using System.Collections.Generic;
using System.IO;
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
        private readonly IActivityConfigAppService _activityConfigAppService;
        private readonly IMetropolitanAppService _metropolitanAppService;
        private readonly IExamCollectAppService _examColllectAppService;
        private readonly IRepository<Metropolitan> _metropolitanRepository;
        private readonly IRepository<FileAttr> _fileAttrRepository;

        public MetropolitanController(IMetropolitanAppService _metropolitanAppService, IExamCollectAppService _examColllectAppService, IRepository<Metropolitan> _metropolitanRepository, IActivityConfigAppService _activityConfigAppService, IRepository<FileAttr> _fileAttrRepository)
        {
            this._metropolitanAppService = _metropolitanAppService;
            this._examColllectAppService = _examColllectAppService;
            this._metropolitanRepository = _metropolitanRepository;
            this._activityConfigAppService = _activityConfigAppService;
            this._fileAttrRepository = _fileAttrRepository;
        }

        // GET: Metropolitan
        /// <summary>
        /// 浏览会试
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> Index(string sortName = "CreationTime", int pageIndex = 1, int pageSize = 15)
        {
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            ViewBag.SortName = sortName;
            var pagedList = await _metropolitanAppService.GetMetropolitanList(new Gld.Metropolitan.Dto.SearchMetropolitanInput
            {
                Sorting = sortName + " DESC",
                MaxResultCount = pageSize,
                SkipCount = (pageIndex - 1) * pageSize
            });
            if (AbpSession.UserId.HasValue)
            {
                ViewBag.ExamCollectUserInfo = await _metropolitanRepository.FirstOrDefaultAsync(x => x.CreatorUserId == AbpSession.UserId);
            }
            ViewBag.ActivityConfig = await _activityConfigAppService.GetConfig(new NullableIdInput { Id = 0 });
            ViewBag.PageSize = pageSize;
            ViewBag.PageIndex = pageIndex;
            return View(pagedList);
        }

        public async Task<ActionResult> Detail(int id=0)
        {
            //增加一次浏览记录
            var detail = await _metropolitanRepository.FirstOrDefaultAsync(x => x.Id == id) ?? new Metropolitan();
            if (detail != null && detail.Id > 0)
            {
                detail.ViewCount = detail.ViewCount + 1;
                await _metropolitanRepository.UpdateAsync(detail);
            }
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            return View(detail);
        }

        public async Task<ActionResult> DownLoad(int id)
        {
            if (!AbpSession.UserId.HasValue) return Content("请先登录");
            var metropolitanModel = await _metropolitanRepository.FirstOrDefaultAsync(id);
            if (metropolitanModel == null) return Content("没有获取到工程信息");
            var filePath = Server.MapPath(metropolitanModel.FilePath);
            if (!System.IO.File.Exists(filePath)) return Content("没有找到工程文件");
            FileStream stream = System.IO.File.OpenRead(filePath);
            byte[] buffur = new byte[stream.Length];
            stream.Read(buffur, 0, (int)stream.Length);
            stream.Close();
            var file = File(buffur, "application/octet-stream",
                 HttpUtility.UrlEncode(metropolitanModel.FileName));
            return file;
        }

        /// <summary>
        /// 上传工程
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> UploadProject(NullableIdInput input)
        {
            var model = new GetMetropolitanOutput();
            var activityConfig = await _activityConfigAppService.GetConfig(new NullableIdInput { Id = 0 });
            var examInfoModel = await _examColllectAppService.GetUserExamCollect();
            model = await _metropolitanAppService.GetMetropolitanById(input);
            ViewBag.ExamInfo = examInfoModel;

            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            ViewBag.ActivityConfig = activityConfig;
            return View(model);
        }
    }
}