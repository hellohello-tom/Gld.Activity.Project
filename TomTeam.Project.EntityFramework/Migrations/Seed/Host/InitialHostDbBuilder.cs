using TomTeam.Project.EntityFramework;

namespace TomTeam.Project.Migrations.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly TomAbpDbContext _context;

        public InitialHostDbBuilder(TomAbpDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
