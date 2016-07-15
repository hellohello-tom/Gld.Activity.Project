using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Gld.Exam.Dto;

namespace TomTeam.Project.Gld.Exam
{

    public interface IProvincialExamAppService : IApplicationService
    {
        /// <summary>
        /// 获取考试题目列表
        /// </summary>
        /// <param name="searchName"></param>
        /// <returns></returns>
        Task<PagedResultOutput<ExamListDto>> GetExamList(SearchExamInput searchName);

        /// <summary>
        /// 获取考试题目列表
        /// </summary>
        /// <param name="searchName"></param>
        /// <returns></returns>
        Task<GetExamForEditOutput> GetExam(NullableIdInput input);

        /// <summary>
        /// 更新或修改
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<int> AddOrUpdate(CreateOrUpdateExamInput input);

        /// <summary>
        /// 删除题目
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteProvincial(IdInput<int> input);
    }
}
