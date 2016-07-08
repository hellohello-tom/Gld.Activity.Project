using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.MultiTenancy;
using TomTeam.Project.Common.Dto;
using TomTeam.Project.Editions;

namespace TomTeam.Project.Common
{
    [AbpAuthorize]
    public class CommonLookupAppService : TomAbpAppServiceBase, ICommonLookupAppService
    {
        private readonly EditionManager _editionManager;

        public CommonLookupAppService(EditionManager editionManager)
        {
            _editionManager = editionManager;
        }

        public async Task<ListResultOutput<ComboboxItemDto>> GetEditionsForCombobox()
        {
            var editions = await _editionManager.Editions.ToListAsync();
            return new ListResultOutput<ComboboxItemDto>(
                editions.Select(e => new ComboboxItemDto(e.Id.ToString(), e.DisplayName)).ToList()
                );
        }

        public async Task<PagedResultOutput<NameValueDto>> FindUsers(FindUsersInput input)
        {
            if (AbpSession.TenantId != null)
            {
                //Prevent tenants to get other tenant's users.
                input.TenantId = AbpSession.TenantId;
            }

            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var query = UserManager.Users
                    .WhereIf(
                        !input.Filter.IsNullOrWhiteSpace(),
                        u =>
                            u.Name.Contains(input.Filter) ||
                            u.Surname.Contains(input.Filter) ||
                            u.UserName.Contains(input.Filter) ||
                            u.EmailAddress.Contains(input.Filter)
                    );

                var userCount = await query.CountAsync();
                var users = await query
                    .OrderBy(u => u.Name)
                    .ThenBy(u => u.Surname)
                    .PageBy(input)
                    .ToListAsync();

                return new PagedResultOutput<NameValueDto>(
                    userCount,
                    users.Select(u =>
                        new NameValueDto(
                            u.FullName + " (" + u.EmailAddress + ")",
                            u.Id.ToString()
                            )
                        ).ToList()
                    );
            }
        }
    }
}
