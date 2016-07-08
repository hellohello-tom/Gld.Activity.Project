using Abp.Notifications;
using TomTeam.Project.Dto;

namespace TomTeam.Project.Notifications.Dto
{
    public class GetUserNotificationsInput : PagedInputDto
    {
        public UserNotificationState? State { get; set; }
    }
}