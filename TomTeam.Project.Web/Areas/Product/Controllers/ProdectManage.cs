using Abp.Web.Mvc.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TomTeam.Project.Authorization;
using TomTeam.Project.Web.Controllers;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.Product.Controllers
{
    [AbpMvcAuthorize(AppPermissions.Pages_Product)]
    public class ProdectManage: TomAbpControllerBase
    {

    }
}