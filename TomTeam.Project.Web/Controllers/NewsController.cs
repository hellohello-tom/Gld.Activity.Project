using Abp.Application.Services.Dto;
using Abp.Threading;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Gld;

namespace TomTeam.Project.Web.Controllers
{
    public class NewsController : TomAbpControllerBase
    {

        private INewsAppService _newsAppService;
        private ICommentAppService _commentAppService;
        public NewsController(INewsAppService _newsAppService, ICommentAppService _commentAppService)
        {
            this._newsAppService = _newsAppService;
            this._commentAppService = _commentAppService;
        }

        // GET: News
        public async virtual Task<ActionResult> Index(int pageIndex = 1, int pageSize = 10,string searchTitle="")
        {
            ViewBag.PageIndex = pageIndex;
            ViewBag.PageSize = pageSize;
            var pageList =await _newsAppService.GetNewsList(new Gld.Dto.SearchNewsInput
            {
                MaxResultCount = pageSize,
                SkipCount = (pageIndex - 1)*pageSize,
                SearchTitle = searchTitle
            });
            return View(pageList);
        }

        public async virtual Task<ActionResult> Detail(int id)
        {
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            var detail = await _newsAppService.GetNews(new NullableIdInput { Id = id }) ?? new Gld.Dto.GetNewsListOutput();
            return View(detail);
        }

        /// <summary>
        /// 评论列表
        /// </summary>
        /// <returns></returns>
        public ActionResult _Comment(int id, int pageSize=6,int pageIndex=1)
        {
            ViewBag.IsLogin = AbpSession.UserId.HasValue;
            ViewBag.PageIndex = pageIndex;
            ViewBag.PageSize = pageSize;
            var commentList = AsyncHelper.RunSync(() => _commentAppService.GetCommentPageList(new Gld.Dto.SearchCommentInput
            {
                NewsId = id,
                SkipCount = 0,
                MaxResultCount = pageSize * pageIndex
            }));
            return View(commentList);
        }
    }
}