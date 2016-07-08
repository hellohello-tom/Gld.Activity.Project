using Abp.Dependency;
using Abp.Domain.Uow;
using Abp.MultiTenancy;
using Abp.Zero.EntityFramework;

namespace TomTeam.Project.EntityFramework
{
    public class AbpZeroDbMigrator : AbpZeroDbMigrator<TomAbpDbContext, Migrations.Configuration>
    {
        public AbpZeroDbMigrator(
            IUnitOfWorkManager unitOfWorkManager,
            IDbPerTenantConnectionStringResolver connectionStringResolver,
            IIocResolver iocResolver) :
            base(
                unitOfWorkManager,
                connectionStringResolver,
                iocResolver)
        {

        }
    }
}
