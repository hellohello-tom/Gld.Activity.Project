using System.Collections.Generic;
using System.Linq;
using Abp.Collections.Extensions;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using TomTeam.Project.Authorization.Users.Dto;
using TomTeam.Project.DataExporting.Excel.EpPlus;
using TomTeam.Project.Dto;
using TomTeam.Project.Gld.Dto;

namespace TomTeam.Project.Authorization.Users.Exporting
{
    public class UserListExcelExporter : EpPlusExcelExporterBase, IUserListExcelExporter
    {
        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public UserListExcelExporter(
            ITimeZoneConverter timeZoneConverter, 
            IAbpSession abpSession)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<UserInfoListDto> userListDtos)
        {
            return CreateExcelPackage(
                "user.xlsx",
                excelPackage =>
                {
                    var sheet = excelPackage.Workbook.Worksheets.Add(L("Users"));
                    sheet.OutLineApplyStyle = true;

                    AddHeader(
                        sheet,
                        "姓名",
                        "公司名称",
                        "专业",
                        "电话",
                        "创建时间"
                        );

                    AddObjects(
                        sheet, 2, userListDtos,
                        _ => _.Name,
                        _ => _.CompanyName,
                        _ => _.Major,
                        _ => _.Phone,
                        _ => _.CreationTime
                        );

                    //Formatting cells
                    var creationTimeColumn = sheet.Column(5);
                    creationTimeColumn.Style.Numberformat.Format = "yyyy-mm-dd h:mm";

                    for (var i = 1; i <= 7; i++)
                    {
                        sheet.Column(i).AutoFit();
                    }
                });
        }
        

        public FileDto ExportToFile(List<UserListDto> userListDtos)
        {
            return CreateExcelPackage(
                "UserList.xlsx",
                excelPackage =>
                {
                    var sheet = excelPackage.Workbook.Worksheets.Add(L("Users"));
                    sheet.OutLineApplyStyle = true;

                    AddHeader(
                        sheet,
                        L("Name"),
                        L("Surname"),
                        L("UserName"),
                        L("EmailAddress"),
                        L("EmailConfirm"),
                        L("Roles"),
                        L("LastLoginTime"),
                        L("Active"),
                        L("CreationTime")
                        );

                    AddObjects(
                        sheet, 2, userListDtos,
                        _ => _.Name,
                        _ => _.Surname,
                        _ => _.UserName,
                        _ => _.EmailAddress,
                        _ => _.IsEmailConfirmed,
                        _ => _.Roles.Select(r => r.RoleName).JoinAsString(", "),
                        _ => _timeZoneConverter.Convert(_.LastLoginTime, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.IsActive,
                        _ => _timeZoneConverter.Convert(_.CreationTime, _abpSession.TenantId, _abpSession.GetUserId())
                        );

                    //Formatting cells

                    var lastLoginTimeColumn = sheet.Column(7);
                    lastLoginTimeColumn.Style.Numberformat.Format = "yyyy-mm-dd";

                    var creationTimeColumn = sheet.Column(9);
                    creationTimeColumn.Style.Numberformat.Format = "yyyy-mm-dd";

                    for (var i = 1; i <= 7; i++)
                    {
                        sheet.Column(i).AutoFit();
                    }
                });
        }
    }
}
