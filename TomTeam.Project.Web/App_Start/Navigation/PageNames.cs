namespace TomTeam.Project.Web.Navigation
{
    public static class PageNames
    {
        public static class App
        {
            public static class Common
            {
                public const string Administration = "Administration";
                public const string Roles = "Administration.Roles";
                public const string Users = "Administration.Users";
                public const string AuditLogs = "Administration.AuditLogs";
                public const string OrganizationUnits = "Administration.OrganizationUnits";
                public const string Languages = "Administration.Languages";
            }

            public static class Host
            {
                public const string Tenants = "Tenants";
                public const string Editions = "Editions";
                public const string Maintenance = "Administration.Maintenance";
                public const string Settings = "Administration.Settings.Host";
            }

            public static class Tenant
            {
                public const string Dashboard = "Dashboard.Tenant";
                public const string Settings = "Administration.Settings.Tenant";
            }

            public static class Prodect
            {
                public const string Settings = "Prodect.Settings";
            }
        }

        public static class Frontend
        {
            public const string Home = "Frontend.Home";
            public const string About = "Frontend.About";


            public const string ActivityManage = "Frontend.ActivityManage";

            /// <summary>
            /// 个人中心
            /// </summary>
            public const string PersonalCenter = "Frontend.PersonalCenter";

            /// <summary>
            /// 活动配置
            /// </summary>
            public const string ActivityConfig = "Frontend.ActivityConfig";

            /// <summary>
            /// 乡试
            /// </summary>
            public const string ProvincialExamination = "Frontend.ProvincialExamination";

            /// <summary>
            /// 会试
            /// </summary>
            public const string MetropolitanExamination = "Frontend.MetropolitanExamination";

            /// <summary>
            /// 殿试
            /// </summary>
            public const string PalaceExamination = "Frontend.PalaceExamination";

            /// <summary>
            /// 信息汇总
            /// </summary>
            public const string UserInfo = "Frontend.UserInfo";

            /// <summary>
            /// 网站配置管理
            /// </summary>
            public const string WebConfig = "Frontend.WebConfig";

            /// <summary>
            /// 赛事新闻管理
            /// </summary>
            public const string News = "Frontend.News";
        }
    }
}