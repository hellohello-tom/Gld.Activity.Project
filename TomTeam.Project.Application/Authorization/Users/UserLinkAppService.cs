using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.MultiTenancy;

namespace TomTeam.Project.Authorization.Users
{
    [AbpAuthorize]
    public class UserLinkAppService : TomAbpAppServiceBase, IUserLinkAppService
    {
        private readonly AbpLoginResultTypeHelper _abpLoginResultTypeHelper;
        private readonly IUserLinkManager _userLinkManager;
        private readonly IRepository<Tenant> _tenantRepository;
        private readonly IRepository<UserAccount, long> _userAccountRepository;

        public UserLinkAppService(
            AbpLoginResultTypeHelper abpLoginResultTypeHelper,
            IUserLinkManager userLinkManager,
            IRepository<Tenant> tenantRepository,
            IRepository<UserAccount, long> userAccountRepository)
        {
            _abpLoginResultTypeHelper = abpLoginResultTypeHelper;
            _userLinkManager = userLinkManager;
            _tenantRepository = tenantRepository;
            _userAccountRepository = userAccountRepository;
        }

        public async Task LinkToUser(LinkToUserInput input)
        {
            var loginResult = await UserManager.LoginAsync(input.UsernameOrEmailAddress, input.Password, input.TenancyName);

            if (loginResult.Result != AbpLoginResultType.Success)
            {
                throw _abpLoginResultTypeHelper.CreateExceptionForFailedLoginAttempt(loginResult.Result, input.UsernameOrEmailAddress, input.TenancyName);
            }

            if (AbpSession.IsUser(loginResult.User))
            {
                throw new UserFriendlyException(L("YouCannotLinkToSameAccount"));
            }

            if (loginResult.User.ShouldChangePasswordOnNextLogin)
            {
                throw new UserFriendlyException(L("ChangePasswordBeforeLinkToAnAccount"));
            }

            await _userLinkManager.Link(GetCurrentUser(), loginResult.User);
        }

        public async Task<PagedResultOutput<LinkedUserDto>> GetLinkedUsers(GetLinkedUsersInput input)
        {
            var query = await CreateLinkedUsersQuery(input.Sorting);
            query = query.Skip(input.SkipCount)
                        .Take(input.MaxResultCount);

            var totalCount = await query.CountAsync();
            var linkedUsers = await query.ToListAsync();

            return new PagedResultOutput<LinkedUserDto>(
                totalCount,
                linkedUsers
            );
        }

        [DisableAuditing]
        public async Task<ListResultOutput<LinkedUserDto>> GetRecentlyUsedLinkedUsers()
        {
            var query = await CreateLinkedUsersQuery("LastLoginTime DESC");
            var recentlyUsedlinkedUsers = await query.Skip(0).Take(3).ToListAsync();

            return new ListResultOutput<LinkedUserDto>(recentlyUsedlinkedUsers);
        }

        public async Task UnlinkUser(UnlinkUserInput input)
        {
            var currentUserAccount = await _userLinkManager.GetUserAccountAsync(AbpSession.ToUserIdentifier());

            if (!currentUserAccount.UserLinkId.HasValue)
            {
                throw new ApplicationException(L("You are not linked to any account"));
            }

            if (!await _userLinkManager.AreUsersLinked(AbpSession.ToUserIdentifier(), input.ToUserIdentifier()))
            {
                return;
            }

            await _userLinkManager.Unlink(input.ToUserIdentifier());
        }

        private async Task<IQueryable<LinkedUserDto>> CreateLinkedUsersQuery(string sorting)
        {
            var currentUserIdentifier = AbpSession.ToUserIdentifier();
            var currentUserAccount = await _userLinkManager.GetUserAccountAsync(AbpSession.ToUserIdentifier());

            return (from userAccount in _userAccountRepository.GetAll()
                    join tenant in _tenantRepository.GetAll() on userAccount.TenantId equals tenant.Id into tenantJoined
                    from tenant in tenantJoined.DefaultIfEmpty()
                    where
                        (userAccount.TenantId != currentUserIdentifier.TenantId ||
                        userAccount.UserId != currentUserIdentifier.UserId) &&
                        userAccount.UserLinkId.HasValue &&
                        userAccount.UserLinkId == currentUserAccount.UserLinkId
                    select new LinkedUserDto
                    {
                        Id = userAccount.UserId,
                        TenantId = userAccount.TenantId,
                        TenancyName = tenant == null ? "." : tenant.TenancyName,
                        Username = userAccount.UserName,
                        LastLoginTime = userAccount.LastLoginTime
                    }).OrderBy(sorting);
        }
    }
}