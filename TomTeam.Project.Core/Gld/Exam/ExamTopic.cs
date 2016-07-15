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

        /// <summary>
        /// 题目类型0单选 1多选
        /// </summary>
        public int ExamType { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        public string AnswerContent { get; set; }

        public List<Answer> Answers { get; set; }
    }
}
