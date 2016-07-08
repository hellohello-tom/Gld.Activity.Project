using System.Collections.Generic;
using Abp.Application.Services.Dto;
using TomTeam.Project.Configuration.Tenants.Dto;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Settings
{
    public class SettingsViewModel
    {
        public TenantSettingsEditDto Settings { get; set; }
        
        public List<ComboboxItemDto> TimezoneItems { get; set; }
    }
}