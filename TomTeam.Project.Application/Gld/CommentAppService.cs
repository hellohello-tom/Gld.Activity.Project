using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using TomTeam.Project.Config;
using TomTeam.Project.Gld.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using Abp.AutoMapper;
using TomTeam.Project.Authorization;

namespace TomTeam.Project.Gld
{
    [AbpAuthorize]
    public class CommentAppService : TomAbpAppServiceBase, ICommentAppService
    {
        private readonly IRepository<News.News> _newsRepository;
        private readonly IRepository<News.Comment> _commentRepository;
        public CommentAppService(IRepository<News.News> _newsRepository, IRepository<News.Comment> _commentRepository)
        {
            this._newsRepository = _newsRepository;
            this._commentRepository = _commentRepository;
        }


        public async Task PostComment(CommentInput input)
        {
            var news = await _newsRepository.GetAsync(input.NewsId) ?? new News.News();
            if (news == null || news.Id == 0)
                throw new UserFriendlyException("没有获取到新闻信息，数据传递错误");
            var detail = new News.Comment();
            if (input.Id.HasValue && input.Id > 0)
            {
                detail = await _commentRepository.GetAsync(input.Id.Value);
            }
            input.MapTo(detail);
            await _commentRepository.InsertOrUpdateAndGetIdAsync(detail);
        }

        [AbpAuthorize(AppPermissions.Pages_Activity_Manager)]
        public async Task DeleteComment(IdInput input)
        {
            if (input.Id <= 0)
            {
                throw new UserFriendlyException("请传入正确的数值！");
            }
            await _commentRepository.DeleteAsync(input.Id);
        }
    }
}
