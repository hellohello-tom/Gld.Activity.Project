using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace TomTeam.Project.Config
{
    /// <summary>
    /// 站点配置表
    /// </summary>
    public class WebConfig : FullAuditedEntity
    {
        /// <summary>
        /// 微信二维码地址
        /// </summary>
        public string WeChatPath { get; set; }

        /// <summary>
        /// 网站名称
        /// </summary>
        public string WebName { get; set; }

        /// <summary>
        /// 页脚信息
        /// </summary>
        public string FooterContent { get; set; }

        /// <summary>
        /// 活动介绍
        /// </summary>
        public string ActivityInfo { get; set; }
    }
}
