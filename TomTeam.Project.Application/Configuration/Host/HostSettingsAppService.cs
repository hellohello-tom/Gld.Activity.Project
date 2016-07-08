using System;
using System.Globalization;
using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Configuration;
using Abp.Extensions;
using Abp.Net.Mail;
using Abp.Timing;
using Abp.Zero.Configuration;
using TomTeam.Project.Authorization;
using TomTeam.Project.Configuration.Host.Dto;
using TomTeam.Project.Editions;
using TomTeam.Project.Timing;

namespace TomTeam.Project.Configuration.Host
{
    [AbpAuthorize(AppPermissions.Pages_Administration_Host_Settings)]
    public class HostSettingsAppService : TomAbpAppServiceBase, IHostSettingsAppService
    {
        private readonly IEmailSender _emailSender;
        private readonly EditionManager _editionManager;
        private readonly ITimeZoneService _timeZoneService;

        public HostSettingsAppService(
            IEmailSender emailSender,
            EditionManager editionManager,
            ITimeZoneService timeZoneService)
        {
            _emailSender = emailSender;
            _editionManager = editionManager;
            _timeZoneService = timeZoneService;
        }

        public async Task<HostSettingsEditDto> GetAllSettings()
        {
            var timezone = await SettingManager.GetSettingValueForApplicationAsync(TimingSettingNames.TimeZone);
            var hostSettings = new HostSettingsEditDto
            {
                General = new GeneralSettingsEditDto
                {
                    WebSiteRootAddress = await SettingManager.GetSettingValueAsync(AppSettings.General.WebSiteRootAddress),
                    Timezone = timezone,
                    TimezoneForComparison = timezone
                },
                TenantManagement = new TenantManagementSettingsEditDto
                {
                    AllowSelfRegistration = await SettingManager.GetSettingValueAsync<bool>(AppSettings.TenantManagement.AllowSelfRegistration),
                    IsNewRegisteredTenantActiveByDefault = await SettingManager.GetSettingValueAsync<bool>(AppSettings.TenantManagement.IsNewRegisteredTenantActiveByDefault),
                    UseCaptchaOnRegistration = await SettingManager.GetSettingValueAsync<bool>(AppSettings.TenantManagement.UseCaptchaOnRegistration)
                },
                UserManagement = new HostUserManagementSettingsEditDto
                {
                    IsEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin)
                },
                Email = new EmailSettingsEditDto
                {
                    DefaultFromAddress = await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromAddress),
                    DefaultFromDisplayName = await SettingManager.GetSettingValueAsync(EmailSettingNames.DefaultFromDisplayName),
                    SmtpHost = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Host),
                    SmtpPort = await SettingManager.GetSettingValueAsync<int>(EmailSettingNames.Smtp.Port),
                    SmtpUserName = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.UserName),
                    SmtpPassword = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Password),
                    SmtpDomain = await SettingManager.GetSettingValueAsync(EmailSettingNames.Smtp.Domain),
                    SmtpEnableSsl = await SettingManager.GetSettingValueAsync<bool>(EmailSettingNames.Smtp.EnableSsl),
                    SmtpUseDefaultCredentials = await SettingManager.GetSettingValueAsync<bool>(EmailSettingNames.Smtp.UseDefaultCredentials)
                }
            };

            var defaultTenantId = await SettingManager.GetSettingValueAsync(AppSettings.TenantManagement.DefaultEdition);
            if (!string.IsNullOrEmpty(defaultTenantId) && (await _editionManager.FindByIdAsync(Convert.ToInt32(defaultTenantId)) != null))
            {
                hostSettings.TenantManagement.DefaultEditionId = Convert.ToInt32(defaultTenantId);
            }

            var defaultTimeZoneId = await _timeZoneService.GetDefaultTimezoneAsync(SettingScopes.Application, AbpSession.TenantId);
            if (hostSettings.General.Timezone == defaultTimeZoneId)
            {
                hostSettings.General.Timezone = string.Empty;
            }

            return hostSettings;
        }

        public async Task UpdateAllSettings(HostSettingsEditDto input)
        {
            //General
            await SettingManager.ChangeSettingForApplicationAsync(AppSettings.General.WebSiteRootAddress, input.General.WebSiteRootAddress.EnsureEndsWith('/'));

            if (Clock.SupportsMultipleTimezone())
            {
                if (input.General.Timezone.IsNullOrEmpty())
                {
                    var defaultValue = await _timeZoneService.GetDefaultTimezoneAsync(SettingScopes.Application, AbpSession.TenantId);
                    await SettingManager.ChangeSettingForApplicationAsync(TimingSettingNames.TimeZone, defaultValue);
                }
                else
                {
                    await SettingManager.ChangeSettingForApplicationAsync(TimingSettingNames.TimeZone, input.General.Timezone);
                }
            }

            //Tenant management
            await SettingManager.ChangeSettingForApplicationAsync(AppSettings.TenantManagement.AllowSelfRegistration, input.TenantManagement.AllowSelfRegistration.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));
            await SettingManager.ChangeSettingForApplicationAsync(AppSettings.TenantManagement.IsNewRegisteredTenantActiveByDefault, input.TenantManagement.IsNewRegisteredTenantActiveByDefault.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));
            await SettingManager.ChangeSettingForApplicationAsync(AppSettings.TenantManagement.UseCaptchaOnRegistration, input.TenantManagement.UseCaptchaOnRegistration.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));

            var defaultEditionId = (input.TenantManagement.DefaultEditionId == null ? null : input.TenantManagement.DefaultEditionId.Value.ToString()) ?? "";

            await SettingManager.ChangeSettingForApplicationAsync(AppSettings.TenantManagement.DefaultEdition, defaultEditionId);

            //User management
            await SettingManager.ChangeSettingForApplicationAsync(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin, input.UserManagement.IsEmailConfirmationRequiredForLogin.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));

            //Email
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.DefaultFromAddress, input.Email.DefaultFromAddress);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.DefaultFromDisplayName, input.Email.DefaultFromDisplayName);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Host, input.Email.SmtpHost);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Port, input.Email.SmtpPort.ToString(CultureInfo.InvariantCulture));
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.UserName, input.Email.SmtpUserName);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Password, input.Email.SmtpPassword);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.Domain, input.Email.SmtpDomain);
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.EnableSsl, input.Email.SmtpEnableSsl.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));
            await SettingManager.ChangeSettingForApplicationAsync(EmailSettingNames.Smtp.UseDefaultCredentials, input.Email.SmtpUseDefaultCredentials.ToString(CultureInfo.InvariantCulture).ToLower(CultureInfo.InvariantCulture));
        }

        public async Task SendTestEmail(SendTestEmailInput input)
        {
            var subject = L("TestEmail_Subject");
            var body = L("TestEmail_Body");

            await _emailSender.SendAsync(input.EmailAddress, subject, body);
        }
    }
}