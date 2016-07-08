using System;
using Abp.Modules;
using Abp.MultiTenancy;
using Abp.Zero.Configuration;
using Castle.MicroKernel.Registration;
using NSubstitute;

namespace TomTeam.Project.Tests
{
    [DependsOn(
        typeof(AbpZeroTemplateApplicationModule),
        typeof(AbpZeroTemplateDataModule))]
    public class AbpZeroTemplateTestModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.Timeout = TimeSpan.FromMinutes(1);

            //Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            //Registering fake services

            IocManager.IocContainer.Register(
                Component.For<IAbpZeroDbMigrator>()
                    .UsingFactoryMethod(() => Substitute.For<IAbpZeroDbMigrator>())
                    .LifestyleSingleton()
                );
        }
    }
}
