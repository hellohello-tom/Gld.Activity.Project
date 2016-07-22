using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Exam.Dto
{
    [AutoMap(typeof(ExamCollect))]
    public class CreateOrUpdateExamCollectInput : IInputDto
    {

        public int? Id { get; set; }

        /// <summary>
        /// 乡试得分
        /// </summary>
        [Required(ErrorMessage = "乡试得分必填")]
        public int ProvincialIntegral { get; set; }


        /// <summary>
        /// 是否有资格参加会试
        /// </summary>
        [Required(ErrorMessage = "是否有资格参加会试")]
        public bool IsMetropolitanStatus { get; set; }


    }
}
