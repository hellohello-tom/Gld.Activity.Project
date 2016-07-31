using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Dto
{
    public class SearchCommentInput : IInputDto, IPagedResultRequest
    {
        public int NewsId { get; set; }

        public int MaxResultCount
        {
            get;
            set;
        }

        public int SkipCount
        {
            get;
            set;
        }
    }
}
