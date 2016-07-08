using System.Collections.Generic;
using Abp.Application.Services.Dto;
using TomTeam.Project.Editions.Dto;

namespace TomTeam.Project.Web.Areas.Mpa.Models.Common
{
    public interface IFeatureEditViewModel
    {
        List<NameValueDto> FeatureValues { get; set; }

        List<FlatFeatureDto> Features { get; set; }
    }
}