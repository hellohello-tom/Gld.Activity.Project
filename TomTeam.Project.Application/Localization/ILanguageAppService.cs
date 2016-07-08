using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using TomTeam.Project.Localization.Dto;

namespace TomTeam.Project.Localization
{
    public interface ILanguageAppService : IApplicationService
    {
        Task<GetLanguagesOutput> GetLanguages();

        Task<GetLanguageForEditOutput> GetLanguageForEdit(NullableIdInput input);

        Task CreateOrUpdateLanguage(CreateOrUpdateLanguageInput input);

        Task DeleteLanguage(IdInput input);

        Task SetDefaultLanguage(SetDefaultLanguageInput input);

        Task<PagedResultOutput<LanguageTextListDto>> GetLanguageTexts(GetLanguageTextsInput input);

        Task UpdateLanguageText(UpdateLanguageTextInput input);
    }
}
