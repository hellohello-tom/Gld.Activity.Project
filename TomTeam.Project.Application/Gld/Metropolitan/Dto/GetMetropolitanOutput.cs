using Abp.Application.Services.Dto;
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
    [AutoMapFrom(typeof(TomTeam.Project.Gld.Exam.Metropolitan))]
    public class GetMetropolitanOutput : IOutputDto, ICreationAudited
    {
        public int Id { get; set; }
        
        public string Title { get; set; }


        public string Content { get; set; }



        public string DefaultImg { get; set; }


        public string ImgsPath { get; set; }


        public string FilePath { get; set; }

        /// <summary>
        /// 文件名
        /// </summary>
        public string FileName { get; set; }

        public string UserDisplayName { get; set; }

        /// <summary>
        /// 地区
        /// </summary>
        public string Region { get; set; }

        /// <summary>
        /// 点赞数
        /// </summary>
        public int LikeCount { get; set; }

        /// <summary>
        /// 浏览次数
        /// </summary>
        public int ViewCount { get; set; }

        public bool IsShow { get; set; }

        /// <summary>
        /// 考试试题路径
        /// </summary>
        public string ExamPath { get; set; }

        /// <summary>
        /// 是否上传考试文件
        /// </summary>
        public bool IsUploadFile { get; set; }

        /// 是否上传考试文件
        /// </summary>
        public bool IsTimeOut { get; set; }


        /// <summary>
        /// 得分
        /// </summary>
        public int Score { get; set; }

        public DateTime CreationTime
        {
            get;

            set;
        }

        public long? CreatorUserId
        {
            get;

            set;
        }
    }
}
