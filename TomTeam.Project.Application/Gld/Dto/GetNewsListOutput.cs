using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Dto
{
    public class GetNewsListOutput : IHasTotalCount,IOutputDto
    {
        public int Id { get; set; }
        public  string DefaultImg { get; set; }

        public  string Title { get; set; }

        public  string Content { get; set; }
        public int TotalCount
        {
            get;

            set;
        }
    }
}
