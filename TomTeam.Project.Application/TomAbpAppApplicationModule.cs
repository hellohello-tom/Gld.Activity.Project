using System.Reflection;
using Abp.Modules;
using TomTeam.Project.Authorization;

namespace TomTeam.Project
{
    /// <summary>
    /// Application layer module of the application.
    /// </summary>
    [DependsOn(typeof(TomAbpCoreModule))]
    public class TomAbpApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            //Adding authorization providers
            Configuration.Authorization.Providers.Add<AppAuthorizationProvider>();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());

            //Custom DTO auto-mappings
            CustomDtoMapper.CreateMappings();
        }
    }
}
