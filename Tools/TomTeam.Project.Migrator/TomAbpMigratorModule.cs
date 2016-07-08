using System.Data.Entity;
using System.Reflection;
using Abp.Modules;
using TomTeam.Project.EntityFramework;

namespace TomTeam.Project.Migrator
{
    [DependsOn(typeof(TomAbpDataModule))]
    public class TomAbpMigratorModule : AbpModule
    {
        public override void PreInitialize()
        {
            Database.SetInitializer<TomAbpDbContext>(null);

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(Assembly.GetExecutingAssembly());
        }
    }
}