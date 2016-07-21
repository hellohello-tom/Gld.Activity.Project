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
    public class NewsController : Controller
    {

        private INewsAppService _newsAppService;
        public NewsController(INewsAppService _newsAppService)
        {
            this._newsAppService = _newsAppService;
        }

        // GET: News
        public async virtual Task<ActionResult> Index(int pageIndex = 1, int pageSize = 10,string searchTitle="")
        {
            ViewBag.PageIndex = pageIndex;
            ViewBag.PageSize = pageSize;
            var pageList =await _newsAppService.GetNewsList(new Gld.Dto.SearchNewsInput
            {
                MaxResultCount = 10,
                SkipCount = pageIndex - 1,
                SearchTitle = searchTitle
            });
            return View(pageList);
        }

        public async virtual Task<ActionResult> Detail(int id)
        {
            var detail = await _newsAppService.GetNews(new NullableIdInput { Id = id }) ?? new Gld.Dto.GetNewsListOutput();
            return View(detail);
        }
    }
}