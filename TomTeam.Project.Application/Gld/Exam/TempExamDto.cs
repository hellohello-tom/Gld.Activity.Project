using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam
{
    public class TempExamDto : IInputDto
    {
        public int Topic { get; set; }
        
        public int Answer { get; set; }
    }
}
