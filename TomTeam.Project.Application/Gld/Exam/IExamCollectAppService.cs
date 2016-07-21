using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Gld.Exam.Dto;

namespace TomTeam.Project.Gld.Exam
{
    public interface IExamCollectAppService : IApplicationService
    {
        Task PostExamInfo(ProvincialInput input);

        Task InitExamInfo();

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        Task<GetExamCollectOutput> GetUserExamCollect();
    }
}
