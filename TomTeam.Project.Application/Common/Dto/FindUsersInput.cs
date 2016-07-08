using TomTeam.Project.Dto;

namespace TomTeam.Project.Common.Dto
{
    public class FindUsersInput : PagedAndFilteredInputDto
    {
        public int? TenantId { get; set; }
    }
}