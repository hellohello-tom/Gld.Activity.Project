using System.Data.Entity.Migrations;
using Abp.Zero.EntityFramework;
using EntityFramework.DynamicFilters;
using TomTeam.Project.Migrations.Seed;
using TomTeam.Project.Migrations.Seed.Host;
using TomTeam.Project.Migrations.Seed.Tenants;

namespace TomTeam.Project.Migrations
{
    public sealed class Configuration : DbMigrationsConfiguration<EntityFramework.TomAbpDbContext>, ISupportSeedMode
    {
        public SeedMode SeedMode { get; set; }

        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "TomAbp";
            SeedMode = SeedMode.Host;
        }

        protected override void Seed(EntityFramework.TomAbpDbContext context)
        {
            context.DisableAllFilters();

            if (SeedMode == SeedMode.Host)
            {
                //Host seed
                new InitialHostDbBuilder(context).Create();

                //Default tenant seed (in host database).
                new DefaultTenantBuilder(context).Create();
                new TenantRoleAndUserBuilder(context, 1).Create();
            }
            else if(SeedMode == SeedMode.Tenant)
            {
                //You can add seed for tenant databases...
            }

            context.SaveChanges();
        }
    }
}
