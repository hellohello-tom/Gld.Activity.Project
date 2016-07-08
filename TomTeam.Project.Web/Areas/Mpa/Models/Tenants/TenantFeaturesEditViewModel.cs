using Abp.AutoMapper;
using TomTeam.Project.MultiTenancy;
using TomTeam.Project.MultiTenancy.Dto;
using TomTeam.Project.Web.Areas.Mpa.Models.Common;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Tenants
{
    [AutoMapFrom(typeof (GetTenantFeaturesForEditOutput))]
    public class TenantFeaturesEditViewModel : GetTenantFeaturesForEditOutput, IFeatureEditViewModel
    {
        public Tenant Tenant { get; set; }

        public TenantFeaturesEditViewModel(Tenant tenant, GetTenantFeaturesForEditOutput output)
        {
            Tenant = tenant;
            output.MapTo(this);
        }
    }
}