using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Config;
using TomTeam.Project.Dto;
using TomTeam.Project.Gld.Dto;

namespace TomTeam.Project.Gld
{
    public interface IUserInfoAppService : IApplicationService
    {
        Task<PagedResultOutput<UserInfoListDto>> GetUsers(GetUserInfoInput input);

        Task<FileDto> GetUsersToExcel();

        Task UpdateUserInfo(UpdateUserInput input);

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task<UpdateUserInput> GetUserInfo(IdInput input);
    }
}
