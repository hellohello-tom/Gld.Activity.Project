using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.News
{
    public class News : FullAuditedEntity
    {
        public virtual string DefaultImg { get; set; }

        public virtual string Title { get; set; }

        public virtual string Content { get; set; }

        /// <summary>
        /// 置顶
        /// </summary>
        public virtual bool IsTop { get; set; }
    }
}
