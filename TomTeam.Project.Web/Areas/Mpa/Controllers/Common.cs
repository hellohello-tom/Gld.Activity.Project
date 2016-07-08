using System.Web.Mvc;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Web.Areas.Mpa.Models.Common.Modals;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class CommonController : TomAbpControllerBase
    {
        public PartialViewResult LookupModal(LookupModalViewModel model)
        {
            return PartialView("Modals/_LookupModal", model);
        }
    }
}