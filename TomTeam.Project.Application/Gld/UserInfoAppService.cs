using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Diagnostics;
using System.Linq;
using System.Linq.Dynamic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.AutoMapper;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Notifications;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.AspNet.Identity;
using TomTeam.Project.Authorization.Dto;
using TomTeam.Project.Authorization.Roles;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.Authorization.Users.Exporting;
using TomTeam.Project.Dto;
using TomTeam.Project.Notifications;
using TomTeam.Project.Gld.Dto;
using TomTeam.Project.Gld;

namespace TomTeam.Project.Authorization.Users
{
    //[AbpAuthorize(AppPermissions.Pages_Activity_Manager)]
    public class UserInfoAppService : TomAbpAppServiceBase, IUserInfoAppService
    {
        private readonly RoleManager _roleManager;
        private readonly IUserEmailer _userEmailer;
        private readonly IUserListExcelExporter _userListExcelExporter;
        private readonly INotificationSubscriptionManager _notificationSubscriptionManager;
        private readonly IAppNotifier _appNotifier;
        
        public UserInfoAppService(
            RoleManager roleManager,
            IUserEmailer userEmailer,
            IUserListExcelExporter userListExcelExporter,
            INotificationSubscriptionManager notificationSubscriptionManager, 
            IAppNotifier appNotifier)
        {
            _roleManager = roleManager;
            _userEmailer = userEmailer;
            _userListExcelExporter = userListExcelExporter;
            _notificationSubscriptionManager = notificationSubscriptionManager;
            _appNotifier = appNotifier;
        }


        public async Task<FileDto> GetUsersToExcel()
        {
            var guestRole = await _roleManager.Roles.SingleOrDefaultAsync(x => x.DisplayName == "Guest");
            if (guestRole == null) throw new UserFriendlyException("没有获取到注册用户角色信息");
            var users = await UserManager.Users.Include(u => u.Roles).Where(x => x.Roles.All(o => o.RoleId == guestRole.Id)).ToListAsync();
            var userListDtos = users.MapTo<List<UserInfoListDto>>();

            return _userListExcelExporter.ExportToFile(userListDtos);
        }

        public async Task<PagedResultOutput<UserInfoListDto>> GetUsers(GetUserInfoInput input)
        {
            var guestRole = await _roleManager.Roles.SingleOrDefaultAsync(x => x.DisplayName == "Guest");
            
            if (guestRole == null) throw new UserFriendlyException("没有获取到注册用户角色信息");
            var query = UserManager.Users
             .Include(u => u.Roles)
             .WhereIf(
                 !input.SearchFilter.IsNullOrWhiteSpace(),
                 u =>
                     (u.Name.Contains(input.SearchFilter) ||
                     u.CompanyName.Contains(input.SearchFilter) ||
                     u.Phone.Contains(input.SearchFilter) ||
                     u.Major.Contains(input.SearchFilter))
             ).Where(x => x.Roles.All(o=>o.RoleId==guestRole.Id));
            
            var userCount = await query.CountAsync();
            var users = await query
                .OrderBy(input.Sorting)
                .PageBy(input)
                .ToListAsync();

            var userListDtos = users.MapTo<List<UserInfoListDto>>();

            return new PagedResultOutput<UserInfoListDto>(
                userCount,
                userListDtos
                );
        }
    }
}
