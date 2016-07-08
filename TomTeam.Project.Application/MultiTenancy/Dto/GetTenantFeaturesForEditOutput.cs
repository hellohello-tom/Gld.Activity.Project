using System.Collections.Generic;
using Abp.Application.Services.Dto;
using TomTeam.Project.Editions.Dto;

namespace TomTeam.Project.MultiTenancy.Dto
{
    public class GetTenantFeaturesForEditOutput : IOutputDto
    {
        public List<NameValueDto> FeatureValues { get; set; }

        public List<FlatFeatureDto> Features { get; set; }
    }
}