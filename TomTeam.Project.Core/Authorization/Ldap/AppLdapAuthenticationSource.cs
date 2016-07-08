using Abp.Zero.Ldap.Authentication;
using Abp.Zero.Ldap.Configuration;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.MultiTenancy;

namespace TomTeam.Project.Authorization.Ldap
{
    public class AppLdapAuthenticationSource : LdapAuthenticationSource<Tenant, User>
    {
        public AppLdapAuthenticationSource(ILdapSettings settings, IAbpZeroLdapModuleConfig ldapModuleConfig)
            : base(settings, ldapModuleConfig)
        {
        }
    }
}
