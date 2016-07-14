using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam
{
    public class ExamTopic: FullAuditedEntity
    {
        /// <summary>
        /// 题目
        /// </summary>
        public string TopicName { get; set; }

        
    }
}
