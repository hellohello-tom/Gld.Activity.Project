using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam
{
    public class Metropolitan : FullAuditedEntity
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string ImgsPath { get; set; }

        [Required]
        public string FilePath { get; set; }
        
        public string UserDisplayName { get; set; }

        public int LikeCount { get; set; }


        public bool IsShow { get; set; }
    }
}
