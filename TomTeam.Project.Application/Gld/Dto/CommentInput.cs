using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.News;

namespace TomTeam.Project.Gld.Dto
{
    [AutoMap(typeof(Comment))]
    public class CommentInput : IInputDto
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "参数缺省NewsId")]
        public int NewsId { get; set; }

        [Required(ErrorMessage = "参数缺省ParentId")]
        public int? ParentId { get; set; }

        [Required(ErrorMessage = "内容必填")]
        [StringLength(500, ErrorMessage = "内请输入在500个字符以内")]
        public string Content { get; set; }
    }
}
