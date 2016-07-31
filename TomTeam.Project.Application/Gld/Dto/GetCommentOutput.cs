using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.News;

namespace TomTeam.Project.Gld.Dto
{

    [AutoMapFrom(typeof(Comment))]
    public class GetCommentOutput : IOutputDto, IHasCreationTime
    {
        public int Id { get; set; }

        public DateTime CreationTime
        {
            get;
            set;
        }

        /// <summary>
        /// 父ID
        /// </summary>
        public int ParentId { get; set; }

        /// <summary>
        /// 回复用户
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 内容
        /// </summary>
        public string Content { get; set; }

        public List<GetCommentOutput> ChildItems { get; set; }
    }
}
