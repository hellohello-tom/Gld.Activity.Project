using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using TomTeam.Project.Authorization.Users;
using TomTeam.Project.MultiTenancy;

namespace TomTeam.Project.Web.Models.Account
{
    public class RegisterViewModel : IInputDto, IValidatableObject
    {
        /// <summary>
        /// Not required for single-tenant applications.
        /// </summary>
        [StringLength(Tenant.MaxTenancyNameLength)]
        public string TenancyName { get; set; }

        [Required]
        [StringLength(User.MaxNameLength)]
        public string Name { get; set; }

        [StringLength(User.MaxSurnameLength)]
        public string Surname { get; set; }

        [Required]
        [StringLength(11, MinimumLength = 11)]
        [RegularExpression(@"^(((1\d{2}))+\d{8})$", ErrorMessage = "请填写正确手机格式号码")]
        public string UserName { get; set; }

        
        [EmailAddress]
        [StringLength(User.MaxEmailAddressLength)]
        public string EmailAddress { get; set; }

        [Required]
        [StringLength(User.MaxPlainPasswordLength)]
        [DisableAuditing]
        public string Password { get; set; }

        public bool IsExternalLogin { get; set; }


        /// <summary>
        /// 公司名称
        /// </summary>
        [Required]
        [StringLength(100)]
        public virtual string CompanyName { get; set; }

        /// <summary>
        /// 电话
        /// </summary>
        [StringLength(11,MinimumLength =11)]
        [RegularExpression(@"^(((1\d{2}))+\d{8})$", ErrorMessage = "请填写正确手机格式号码")]
        public virtual string Phone { get; set; }

        /// <summary>
        /// 专业
        /// </summary>
        [Required]
        [StringLength(50)]
        public virtual string Major { get; set; }


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var emailRegex = new Regex(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
            if (!UserName.Equals(EmailAddress) && emailRegex.IsMatch(UserName))
            {
                yield return new ValidationResult("Username cannot be an email address unless it's same with your email address !");
            }
        }
    }
}