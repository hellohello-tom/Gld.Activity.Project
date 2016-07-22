using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    [AutoMap(typeof(Exam.Metropolitan))]
    public class CreateOrUpdateMetropolitanInput : IInputDto
    {
        [Required(ErrorMessage ="标题必填")]
        [StringLength(50,ErrorMessage ="标题请在50字以内")]
        public string Title { get; set; }

        [Required(ErrorMessage = "请描述上传的工程")]
        [StringLength(500, ErrorMessage = "请用500字以内描述您的工程")]
        public string Content { get; set; }

        [Required(ErrorMessage ="请上传图片")]
        public string ImgsPath { get; set; }

        [Required(ErrorMessage ="请上传文件")]
        public string FilePath { get; set; }
    }
}
