using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    public class GetExamForEditOutput : IOutputDto
    {
        public GetExamForEditOutput()
        {
            ExamTopic = new ExamTopicDto();
            Answers = new List<AnswerDto>();
        }

        public ExamTopicDto ExamTopic { get; set; }

        public List<AnswerDto> Answers { get; set; }
    }
}
