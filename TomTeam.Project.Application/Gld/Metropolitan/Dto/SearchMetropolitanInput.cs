using Abp.Application.Services.Dto;
using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    public class SearchMetropolitanInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public string SearchTitle { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "CreationTime DESC";
            } 
        }
    }
}
