using System;
using Abp.Dependency;
using Abp.Reflection;
using Abp.Timing;
using Abp.Web;
using Castle.Facilities.Logging;

namespace TomTeam.Project.Web
{
    public class MvcApplication : AbpWebApplication
    {
        protected override void Application_Start(object sender, EventArgs e)
        {
            
            Clock.Provider = new LocalClockProvider();

            /* This line provides better startup performance for the application by disabling detailed assembly investigation.
             * If you need deeper assembly investigation, remove it. */
            AbpBootstrapper.IocManager.RegisterIfNot<IAssemblyFinder, CurrentDomainAssemblyFinder>();

            //Log4Net configuration
            AbpBootstrapper.IocManager.IocContainer
                .AddFacility<LoggingFacility>(f => f.UseLog4Net() 
                    .WithConfig("log4net.config")
                );
            
            base.Application_Start(sender, e);
        }
    }
}
