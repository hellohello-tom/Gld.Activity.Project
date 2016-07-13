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

namespace TomTeam.Project.Gld.Dto
{
    [AutoMap(typeof(News.News))]
    public class CreateOrUpdateNewsInput : IInputDto
    {
        public int? Id { get; set; }
        
        public string DefaultImg { get; set; }

        [Required(ErrorMessage ="标题必填")]
        [StringLength(50,ErrorMessage ="标题长度请输入在50个字符以内")]
        public string Title { get; set; }

        public string Content { get; set; }

    }
}
