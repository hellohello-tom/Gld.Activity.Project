using Abp.Dependency;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using TomTeam.Project.Authorization.Users;

namespace TomTeam.Project.Web.Auth
{
    public class ApplicationSignInManager : SignInManager<User, long>, ITransientDependency
    {
        public ApplicationSignInManager(UserManager userManager, IAuthenticationManager authenticationManager)
            : base(userManager, authenticationManager)
        {
        }
    }
}