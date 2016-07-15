using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam
{
    public class Answer : FullAuditedEntity
    {
        public string Options { get; set; }

        public string Content { get; set; }

        public int ExamTopicId { get; set; }
        
        public ExamTopic Target { get; set; }

        /// <summary>
        /// 是否正确答案
        /// </summary>
        public bool IsTrueAnswer { get; set; }
        public object Title { get; set; }
    }
}
