using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TomTeam.Project.Gld
{
    public class FileAttr : FullAuditedEntity
    {
        /// <summary>
        /// 文件名称
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// 扩展名
        /// </summary>
        public string FileExt { get; set; }
        /// <summary>
        /// 分组类型
        /// </summary>
        public string FileGroup { get; set; }
        /// <summary>
        /// 文件分类 0，图片，1，其他类型
        /// </summary>
        public int? FileType { get; set; }
        /// <summary>
        /// 路径
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// 大小
        /// </summary>
        public int? FileSize { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int? Sort { get; set; }
        /// <summary>
        /// MD5
        /// </summary>
        public string FileMd5 { get; set; }
    }
}
