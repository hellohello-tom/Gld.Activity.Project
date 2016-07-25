using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TomTeam.Project.Web.Controllers
{
    public class MetropolitanController : TomAbpControllerBase
    {
        // GET: Metropolitan
        /// <summary>
        /// 浏览首页
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 上传工程
        /// </summary>
        /// <returns></returns>
        public ActionResult UploadProject()
        {
            return View();
        }
    }
}