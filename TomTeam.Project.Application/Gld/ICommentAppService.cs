using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Gld.Dto;

namespace TomTeam.Project.Gld
{
    public interface ICommentAppService: IApplicationService
    {
        /// <summary>
        /// 提交评论
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task PostComment(CommentInput input);

        /// <summary>
        /// 删除评论
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        Task DeleteComment(IdInput input);
    }
}
