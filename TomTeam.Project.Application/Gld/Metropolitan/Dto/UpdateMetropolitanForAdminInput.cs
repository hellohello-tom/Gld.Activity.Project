using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld.Metropolitan.Dto
{
    [AutoMap(typeof(Exam.Metropolitan))]
    public class UpdateMetropolitanForAdminInput: ICreationAudited
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "标题必填")]
        [StringLength(50, ErrorMessage = "标题请在50字以内")]
        public string Title { get; set; }

        [Required(ErrorMessage = "地区必填")]
        [StringLength(50, ErrorMessage = "地区请在50字以内")]
        public string Region { get; set; }

        [Required(ErrorMessage = "请描述上传的工程")]
        [StringLength(500, ErrorMessage = "请用500字以内描述您的工程")]
        public string Content { get; set; }

        [Required]
        public string DefaultImg { get; set; }

        [Required]
        public string ImgsPath { get; set; }

        [Required]
        public string FilePath { get; set; }

        /// <summary>
        /// 文件名
        /// </summary>
        public string FileName { get; set; }

        [Required(ErrorMessage = "请输入点赞的数目")]
        [Range(1, 100000, ErrorMessage = "1~10万")]
        [RegularExpression(@"^\d+$", ErrorMessage = "点赞的数目请输入正整数")]
        public int LikeCount { get; set; }


        public bool IsShow { get; set; }

        public long? CreatorUserId
        {
            get;

            set;
        }

        public DateTime CreationTime
        {
            get;

            set;
        }
    }
}
