using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    [AutoMapFrom(typeof(TomTeam.Project.Gld.Exam.Metropolitan))]
    public class GetMetropolitanOutput : IOutputDto, IHasCreationTime
    {
        public int Id { get; set; }
        
        public string Title { get; set; }


        public string Content { get; set; }


        public string ImgsPath { get; set; }


        public string FilePath { get; set; }

        public string UserDisplayName { get; set; }

        public int LikeCount { get; set; }
        
        public bool IsShow { get; set; }

        public DateTime CreationTime
        {
            get;

            set;
        }
    }
}
