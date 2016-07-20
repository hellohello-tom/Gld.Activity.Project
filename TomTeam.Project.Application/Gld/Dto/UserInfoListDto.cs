using Abp.Authorization.Users;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Authorization.Users;

namespace TomTeam.Project.Gld.Dto
{
    [AutoMapFrom(typeof(User))]
    public class UserInfoListDto
    {
        public string Name { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }


        public DateTime? LastLoginTime { get; set; }
        /// <summary>
        /// 公司名称
        /// </summary>
        public virtual string CompanyName { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        public virtual string Phone { get; set; }

        /// <summary>
        /// 专业
        /// </summary>
        public virtual string Major { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreationTime { get; set; }
    }
}
