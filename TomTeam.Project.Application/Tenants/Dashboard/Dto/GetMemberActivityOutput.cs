using System.Collections.Generic;

namespace TomTeam.Project.Tenants.Dashboard.Dto
{
    public class GetMemberActivityOutput
    {
        public List<int> TotalMembers { get; set; }

        public List<int> NewMembers { get; set; }
    }
}