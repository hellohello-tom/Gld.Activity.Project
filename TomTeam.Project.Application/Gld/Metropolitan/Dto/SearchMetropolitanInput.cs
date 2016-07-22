using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    public class SearchMetropolitanInput : IInputDto, IPagedResultRequest
    {
        public string SearchTitle { get; set; }
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
