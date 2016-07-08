using System.ComponentModel.DataAnnotations;

namespace TomTeam.Project.Web.Models.Account
{
    public class ImpersonateModel
    {
        public int? TenantId { get; set; }

        [Range(1, long.MaxValue)]
        public long UserId { get; set; }
    }
}