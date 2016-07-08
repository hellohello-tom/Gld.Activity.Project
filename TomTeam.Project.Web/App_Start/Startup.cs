using System;
using System.Configuration;
using Abp.Owin;
using Hangfire;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.Facebook;
using Microsoft.Owin.Security.Google;
using Microsoft.Owin.Security.Twitter;
using TomTeam.Project.Web;
using TomTeam.Project.WebApi.Controllers;
using Owin;
using System.Threading;
using System.Globalization;

[assembly: OwinStartup(typeof(Startup))]

namespace TomTeam.Project.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseAbp();

            app.UseOAuthBearerAuthentication(AccountController.OAuthBearerOptions);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                LoginPath = new PathString("/Account/Login")
            });

            app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);
            
      
            app.MapSignalR();

            //Enable it to use HangFire dashboard (uncomment only if it's enabled in TomAbpWebModule)
            //app.UseHangfireDashboard();
        }
    }
}