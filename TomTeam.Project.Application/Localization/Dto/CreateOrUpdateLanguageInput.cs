using System.ComponentModel.DataAnnotations;
using Abp.Application.Services.Dto;

namespace TomTeam.Project.Localization.Dto
{
    public class CreateOrUpdateLanguageInput : IInputDto
    {
        [Required]
        public ApplicationLanguageEditDto Language { get; set; }
    }
}