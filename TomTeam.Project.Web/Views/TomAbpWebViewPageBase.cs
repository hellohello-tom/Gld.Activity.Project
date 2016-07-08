using Abp.Web.Mvc.Views;

namespace TomTeam.Project.Web.Views
{
    public abstract class TomAbpWebViewPageBase : TomAbpWebViewPageBase<dynamic>
    {

    }

    public abstract class TomAbpWebViewPageBase<TModel> : AbpWebViewPage<TModel>
    {
        protected TomAbpWebViewPageBase()
        {
            LocalizationSourceName = TomAbpConsts.LocalizationSourceName;
        }
    }
}