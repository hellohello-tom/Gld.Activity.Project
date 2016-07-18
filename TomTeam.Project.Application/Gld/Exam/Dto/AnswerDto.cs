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
    [AutoMap(typeof(Answer))]
    public class AnswerDto : IValidate
    {
        /// <summary>
        /// 选项
        /// </summary>
        [Required(ErrorMessage ="选项必填")]
        [StringLength(10,ErrorMessage="选项字符不能超过10个")]
        public string Options { get; set; }

        /// <summary>
        /// 选项内容
        /// </summary>
        [Required(ErrorMessage = "选项内容必填")]
        [StringLength(200, ErrorMessage = "选项字符不能超过200个")]
        public string Content { get; set; }
        
        /// <summary>
        /// 是否正确答案
        /// </summary>
        public bool IsTrueAnswer { get; set; }
    }
}
