using System.Data.Common;
using System.Data.Entity;
using Abp.Zero.EntityFramework;
using TomTeam.Project.Authorization.Roles;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.MultiTenancy;
using TomTeam.Project.Storage;
using TomTeam.Project.Config;
using TomTeam.Project.Gld.Exam;

namespace TomTeam.Project.EntityFramework
{
    public class TomAbpDbContext : AbpZeroDbContext<Tenant, Role, User>
    {
        /* Define an IDbSet for each entity of the application */

        public virtual IDbSet<News.News> NewsDbSet { get; set; }
        public virtual IDbSet<WebConfig> WebConfigDbSet { get; set; }
        public virtual IDbSet<BinaryObject> BinaryObjects { get; set; }

        public virtual IDbSet<ActivityConfig> ActivityConfigDbSet { get; set; }
        public virtual IDbSet<ExamTopic> ExamTopicDbSet { get; set; }
        public virtual IDbSet<Answer> AnswerDbSet { get; set; }


        /* Setting "Default" to base class helps us when working migration commands on Package Manager Console.
         * But it may cause problems when working Migrate.exe of EF. ABP works either way.         * 
         */
        public TomAbpDbContext()
            : base("Default")
        {
            
        }

        /* This constructor is used by ABP to pass connection string defined in TomAbpDataModule.PreInitialize.
         * Notice that, actually you will not directly create an instance of TomAbpDbContext since ABP automatically handles it.
         */
        public TomAbpDbContext(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        /* This constructor is used in tests to pass a fake/mock connection.
         */
        public TomAbpDbContext(DbConnection dbConnection)
            : base(dbConnection, true)
        {

        }
    }
}
