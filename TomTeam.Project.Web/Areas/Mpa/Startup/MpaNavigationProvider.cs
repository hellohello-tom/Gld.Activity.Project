using Abp.Application.Navigation;
using Abp.Localization;
using TomTeam.Project.Authorization;
using TomTeam.Project.Web.Navigation;

namespace TomTeam.Project.Web.Areas.Mpa.Startup
{
    public class MpaNavigationProvider : NavigationProvider
    {
        public const string MenuName = "Mpa";
        
        public override void SetNavigation(INavigationProviderContext context)
        {
            var menu = context.Manager.Menus[MenuName] = new MenuDefinition(MenuName, new FixedLocalizableString("Main Menu"));

            menu
                .AddItem(new MenuItemDefinition(
                    PageNames.App.Host.Tenants,
                    L("Tenants"),
                    url: "Mpa/Tenants",
                    icon: "icon-globe",
                    requiredPermissionName: AppPermissions.Pages_Tenants
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Host.Editions,
                    L("Editions"),
                    url: "Mpa/Editions",
                    icon: "icon-grid",
                    requiredPermissionName: AppPermissions.Pages_Editions
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Tenant.Dashboard,
                    L("Dashboard"),
                    url: "Mpa/Dashboard",
                    icon: "icon-home",
                    requiredPermissionName: AppPermissions.Pages_Tenant_Dashboard
                    )
                ).AddItem(new MenuItemDefinition(
                    PageNames.App.Common.Administration,
                    L("Administration"),
                    icon: "icon-wrench"
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.OrganizationUnits,
                        L("OrganizationUnits"),
                        url: "Mpa/OrganizationUnits",
                        icon: "icon-layers",
                        requiredPermissionName: AppPermissions.Pages_Administration_OrganizationUnits
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Roles,
                        L("Roles"),
                        url: "Mpa/Roles",
                        icon: "icon-briefcase",
                        requiredPermissionName: AppPermissions.Pages_Administration_Roles
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Users,
                        L("Users"),
                        url: "Mpa/Users",
                        icon: "icon-users",
                        requiredPermissionName: AppPermissions.Pages_Administration_Users
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.Languages,
                        L("Languages"),
                        url: "Mpa/Languages",
                        icon: "icon-flag",
                        requiredPermissionName: AppPermissions.Pages_Administration_Languages
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Common.AuditLogs,
                        L("AuditLogs"),
                        url: "Mpa/AuditLogs",
                        icon: "icon-lock",
                        requiredPermissionName: AppPermissions.Pages_Administration_AuditLogs
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Host.Maintenance,
                        L("Maintenance"),
                        url: "Mpa/Maintenance",
                        icon: "icon-wrench",
                        requiredPermissionName: AppPermissions.Pages_Administration_Host_Maintenance
                        )
                    )
                    .AddItem(new MenuItemDefinition(
                        PageNames.App.Host.Settings,
                        L("Settings"),
                        url: "Mpa/HostSettings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Host_Settings
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.App.Tenant.Settings,
                        L("Settings"),
                        url: "Mpa/Settings",
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Administration_Tenant_Settings
                        )
                    )
                ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.ActivityManage,
                        L("ActivityManage"),
                        icon: "icon-settings",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                    ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.ProvincialExamination,
                        L("ProvincialExamination"),
                        url: "activity.pe",
                        icon: "icon-pencil",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.MetropolitanExamination,
                        L("MetropolitanExamination"),
                        url: "activity.me",
                        icon: "icon-pencil",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.PalaceExamination,
                        L("PalaceExamination"),
                        url: "activity.palace",
                        icon: "icon-pencil",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.PersonalCenter,
                        L("PersonalCenter"),
                        url: "activity.person",
                        icon: "icon-users",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                        )
                    ).AddItem(new MenuItemDefinition(
                        PageNames.Frontend.UserInfo,
                        L("UserInfo"),
                        url: "activity.userInfo",
                        icon: "icon-bar-chart",
                        requiredPermissionName: AppPermissions.Pages_Manager_News
                        )
                    )
                );
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, TomAbpConsts.LocalizationSourceName);
        }
    }
}