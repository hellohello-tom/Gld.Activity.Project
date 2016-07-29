using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam
{
    public class ExamHistory: FullAuditedEntity
    {
        /// <summary>
        /// 本次得分
        /// </summary>
        public int Score { get; set; }

        /// <summary>
        /// 用户是否手动提交结束考试
        /// </summary>
        public bool IsCompleteProvincial { get; set; }

        /// <summary>
        /// 考试汇总信息外键关系
        /// </summary>
        public ExamCollect ExamCollect { get; set; }
    }
}
