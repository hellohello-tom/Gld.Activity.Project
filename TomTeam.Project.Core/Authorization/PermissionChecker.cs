using Abp.Authorization;
using TomTeam.Project.Authorization.Roles;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.MultiTenancy;

namespace TomTeam.Project.Authorization
{
    /// <summary>
    /// Implements <see cref="PermissionChecker"/>.
    /// </summary>
    public class PermissionChecker : PermissionChecker<Tenant, Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {

        }
    }
}
