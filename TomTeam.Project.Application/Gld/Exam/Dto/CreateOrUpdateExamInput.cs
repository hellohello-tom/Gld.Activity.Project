using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    public class CreateOrUpdateExamInput : IInputDto
    {
        [Required]
        public ExamTopicDto ExamTopic { get; set; }

        [Required]
        public List<AnswerDto> Answers { get; set; }
    }
}
