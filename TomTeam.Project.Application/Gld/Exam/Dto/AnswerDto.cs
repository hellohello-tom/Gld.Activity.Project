using Abp.AutoMapper;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    [AutoMap(typeof(Answer))]
    public class AnswerDto : IValidate
    {
        /// <summary>
        /// 选项
        /// </summary>
        public string Options { get; set; }

        /// <summary>
        /// 选项内容
        /// </summary>
        public string Content { get; set; }
        
        /// <summary>
        /// 是否正确答案
        /// </summary>
        public bool IsTrueAnswer { get; set; }
    }
}
