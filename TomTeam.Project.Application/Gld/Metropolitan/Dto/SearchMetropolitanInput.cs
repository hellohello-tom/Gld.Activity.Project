using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    public class SearchMetropolitanInput : PagedAndSortedInputDto, IInputDto
    {
        public string SearchTitle { get; set; }
    }
}
