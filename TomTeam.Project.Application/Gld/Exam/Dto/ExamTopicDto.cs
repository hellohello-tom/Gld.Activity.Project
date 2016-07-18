using Abp.AutoMapper;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    [AutoMap(typeof(ExamTopic))]
    public class ExamTopicDto : IValidate, IShouldNormalize
    {

        public int? Id { get; set; }
        /// <summary>
        /// 题目
        /// </summary>
        [Required(ErrorMessage = "题目字符不能为空")]
        [StringLength(200, ErrorMessage = "题目限制字符长度200以内")]
        public string TopicName { get; set; }

        /// <summary>
        /// 题目类型0单选 1多选
        /// </summary>
        public int ExamType { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        [StringLength(500, ErrorMessage = "答案内容限制字符长度500以内")]
        public string AnswerContent { get; set; }

        public void Normalize()
        {
            ExamType = 0;
        }
    }
}
