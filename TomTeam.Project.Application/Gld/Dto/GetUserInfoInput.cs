using Abp.Runtime.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Gld.Dto
{
    public class GetUserInfoInput : PagedAndSortedInputDto, IShouldNormalize
    {
        public string SearchFilter { get; set; }

        public void Normalize()
        {
            if (string.IsNullOrEmpty(Sorting))
            {
                Sorting = "CreationTime";
            }
        }
    }
}
