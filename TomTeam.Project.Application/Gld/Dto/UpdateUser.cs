using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TomTeam.Project.Authorization.Users;

namespace TomTeam.Project.Gld.Dto
{
    [AutoMap(typeof(User))]
    public class UpdateUserInput : IInputDto
    {

        /// <summary>
        /// ID
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 用户备注
        /// </summary>
        [StringLength(500, ErrorMessage = "备注信息请输入在500个字符以内")]
        public string UserRemark { get; set; }
        /// <summary>
        /// 密码
        /// </summary>        
        [StringLength(User.MaxPlainPasswordLength)]
        public string Password { get; set; }
    }
}
