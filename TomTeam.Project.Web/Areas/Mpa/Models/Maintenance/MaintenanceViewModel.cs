using System.Collections.Generic;
using TomTeam.Project.Caching.Dto;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Maintenance
{
    public class MaintenanceViewModel
    {
        public IReadOnlyList<CacheDto> Caches { get; set; }
    }
}