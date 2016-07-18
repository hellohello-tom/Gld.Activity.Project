using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    [AutoMapFrom(typeof(ExamTopic))]
    public class ExamListDto : IOutputDto, IHasCreationTime
    {

        public int Id { get; set; }

        /// <summary>
        /// 题目
        /// </summary>
        public string TopicName { get; set; }

        /// <summary>
        /// 答案
        /// </summary>
        public string AnswerContent { get; set; }

        public DateTime CreationTime
        {
            get;
            set;
        }
    }
}
