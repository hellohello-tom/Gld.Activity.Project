using Abp.Domain.Repositories;
using Abp.Web.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Config;

namespace TomTeam.Project.Web.Areas.Product.Controllers
{

    public class ConfigController:AbpController
    {
        /// <summary>
        /// p配置项的内容
        /// </summary>
        IRepository<WebConfig> _IWebConfigRepository;
        public ConfigController(IRepository<WebConfig> _IWebConfigRepository)
        {
            
            this._IWebConfigRepository = _IWebConfigRepository;
        }
    }
}