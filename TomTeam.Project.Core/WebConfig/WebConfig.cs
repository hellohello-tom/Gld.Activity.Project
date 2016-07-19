using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations;

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
        [Required(ErrorMessage ="网站名称必填")]
        [StringLength(30,ErrorMessage ="网站名称不能超过30个字符")]
        public string WebName { get; set; }

        /// <summary>
        /// 页脚信息
        /// </summary>
        public string FooterContent { get; set; }

        /// <summary>
        /// 活动介绍
        /// </summary>
        [Required(ErrorMessage = "活动介绍必填")]
        public string ActivityInfo { get; set; }
    }
}
