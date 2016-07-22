using Abp.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TomTeam.Project.Web.Controllers
{
    [AbpAuthorize]
    public class PersonalCenterController : Controller
    {
        // GET: PersonalCenter
        public ActionResult Index()
        {
            return View();
        }
    }
}