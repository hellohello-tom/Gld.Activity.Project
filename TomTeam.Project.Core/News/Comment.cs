using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.News
{
    public class Comment : FullAuditedEntity
    {
        public int ParentId { get; set; }

        public string UserName { get; set; }

        public string Content { get; set; }

        public News News { get; set; }
    }
}
