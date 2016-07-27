using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Dto
{
    [AutoMapFrom(typeof(News.News))]
    public class GetNewsListOutput:IOutputDto, IHasCreationTime
    {
        public int Id { get; set; }
        public  string DefaultImg { get; set; }

        public  string Title { get; set; }

        public  string Content { get; set; }

        /// <summary>
        /// 置顶
        /// </summary>
        public virtual bool IsTop { get; set; }

        public DateTime CreationTime
        {
            get;

            set;
        }
    }
}
