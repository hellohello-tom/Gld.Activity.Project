using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Gld.Metropolitan.Dto;

namespace TomTeam.Project.Gld.Metropolitan
{
    public interface IMetropolitanAppService : IApplicationService
    {
        /// <summary>
        /// 添加工程
        /// </summary>
        /// <returns></returns>
        Task AddMetropolitian(CreateOrUpdateMetropolitanInput input);

        /// <summary>
        /// 获取用户上传的工程列表
        /// </summary>
        /// <returns></returns>
        Task<PagedResultOutput<GetMetropolitanOutput>> GetMetropolitanList(SearchMetropolitanInput input);

        /// <summary>
        /// 管理员更新会试人员信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<int> Update(UpdateMetropolitanForAdminInput input);

        /// <summary>
        /// 根据主键获取用户的信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<GetMetropolitanOutput> GetMetropolitanById(NullableIdInput input);

        /// <summary>
        /// 删除信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteMetropolitan(IdInput<int> input);

        /// <summary>
        /// 用户更新自己的工程
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<int> UpdateByUser(UpdateMetropolitanForAdminInput input);

        /// <summary>
        /// 投票
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task Vote(IdInput input);
    }
}
