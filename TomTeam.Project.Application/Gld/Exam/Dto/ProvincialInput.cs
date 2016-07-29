using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    public class ProvincialInput : IInputDto
    {
        public int ExamHistoryId { get; set; }

        public List<TempExamDto> Answers { get; set; }
        
    }
} 
