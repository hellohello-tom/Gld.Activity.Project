using System.Threading.Tasks;
using System.Web.Mvc;
using Abp.Configuration;
using Abp.Timing;
using Abp.Web.Mvc.Authorization;
using TomTeam.Project.Authorization.Users.Profile;
using TomTeam.Project.Timing;
using TomTeam.Project.Timing.Dto;
using TomTeam.Project.Web.Areas.Mpa.Models.Profile;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Areas.Mpa.Controllers
{
    [AbpMvcAuthorize]
    public class ProfileController : TomAbpControllerBase
    {
        private readonly IProfileAppService _profileAppService;
        private readonly ITimingAppService _timingAppService;


        public ProfileController(
            IProfileAppService profileAppService, 
            ITimingAppService timingAppService)
        {
            _profileAppService = profileAppService;
            _timingAppService = timingAppService;
        }

        public async Task<PartialViewResult> MySettingsModal()
        {
            var output = await _profileAppService.GetCurrentUserProfileForEdit();
            var timezoneItems = await _timingAppService.GetEditionComboboxItems(new GetTimezoneComboboxItemsInput
            {
                DefaultTimezoneScope = SettingScopes.User,
                SelectedTimezoneId = output.Timezone
            });

            var viewModel = new MySettingsViewModel(output)
            {
                TimezoneItems = timezoneItems
            };

            return PartialView("_MySettingsModal", viewModel);
        }

        public PartialViewResult ChangePictureModal()
        {
            return PartialView("_ChangePictureModal");
        }

        public PartialViewResult ChangePasswordModal()
        {
            return PartialView("_ChangePasswordModal");
        }

        public PartialViewResult LinkedAccountsModal()
        {
            return PartialView("_LinkedAccountsModal");
        }

        public PartialViewResult LinkAccountModal()
        {
            return PartialView("_LinkAccountModal");
        }
    }
}