using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Config
{
    /// <summary>
    /// 活动配置
    /// </summary>
    public class ActivityConfig : FullAuditedEntity, IInputDto
    {
        /// <summary>
        /// 试卷题目
        /// </summary>
        [Required(ErrorMessage ="试卷标题必填")]
        [StringLength(15,ErrorMessage = "试卷标题必填")]
        public string ExamTtile { get; set; }

        /// <summary>
        /// 乡试开始时间
        /// </summary>
        [Required(ErrorMessage ="乡试开始时间必填")]
        public DateTime? ProvincialStartTime { get; set; }

        /// <summary>
        /// 乡试结束时间
        /// </summary>
        [Required(ErrorMessage = "乡试结束时间必填")]
        public DateTime? ProvincialEndTime { get; set; }

        /// <summary>
        /// 乡试持续时长，分钟
        /// </summary>
        [Required(ErrorMessage = "乡试考试持续时长必填")]
        [Range(1,300,ErrorMessage = "乡试考试持续时长请输入1~300分钟")]
        [RegularExpression(@"^\d+$", ErrorMessage = "乡试考试持续时长请输入正整数")]
        public int ExamTime { get; set; }

        /// <summary>
        /// 考试次数
        /// </summary>
        [Required(ErrorMessage = "考试次数必填")]
        [Range(1, 100, ErrorMessage = "考试次数1~100")]
        [RegularExpression(@"^\d+$", ErrorMessage = "考试次数请输入正整数")]
        public int ExaminationCount { get; set; }

        /// <summary>
        /// 随机出题的数目
        /// </summary>
        [Required(ErrorMessage = "乡试考试随机题数必填")]
        [Range(1, 500, ErrorMessage = "乡试考试随机题数请输入1~500")]
        [RegularExpression(@"^\d+$", ErrorMessage = "乡试考试随机题数请输入正整数")]
        public int ExamCount { get; set; }

        /// <summary>
        /// 每一个考试题目的分数
        /// </summary>
        [Required(ErrorMessage = "乡试考试每题分数必填")]
        [Range(1, 100, ErrorMessage = "乡试考试每题分数请输入1~100")]
        [RegularExpression(@"^\d+$", ErrorMessage = "乡试考试每题分数请输入正整数")]
        public int EveryExamIntegral { get; set; }

        /// <summary>
        /// 乡试活动状态
        /// </summary>
        [Required(ErrorMessage = "请选择乡试活动状态")]
        public bool ProvincialState { get; set; }

        /// <summary>
        /// 会试开始时间
        /// </summary>
        [Required(ErrorMessage = "会试开始时间必填")]
        public DateTime? MetropolitanStartTime { get; set; }

        /// <summary>
        /// 会试试卷上传截止时间
        /// </summary>
        [Required(ErrorMessage = "会试试卷上传截止时间必填")]
        public int MetropolitanUploadExamTime { get; set; }

        /// <summary>
        /// 会试结束时间
        /// </summary>
        [Required(ErrorMessage = "会试结束时间必填")]
        public DateTime? MetropolitanEndTime { get; set; }

        /// <summary>
        /// 每个可投票数
        /// </summary>
        [Required]
        public int VoteCount { get; set; } 

        /// <summary>
        /// 会试活动状态
        /// </summary>
        [Required(ErrorMessage = "请选择会试活动状态")]
        public bool MetropolitanState { get; set; }

        /// <summary>
        /// 殿试开始时间
        /// </summary>
        [Required(ErrorMessage = "殿试开始时间必填")]
        public DateTime? PalaceStartTime { get; set; }

        /// <summary>
        /// 殿试结束时间
        /// </summary>
        [Required(ErrorMessage = "殿试开始时间必填")]
        public DateTime? PalaceEndTime { get; set; }

        /// <summary>
        /// 殿试活动状态
        /// </summary>
        [Required(ErrorMessage = "请选择殿试活动状态")]
        public bool PalaceState { get; set; }


        public string PalaceContent { get; set; }
    }
}
