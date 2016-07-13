using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TomTeam.Project.Web.Controllers;

namespace TomTeam.Project.Web.Controllers
{

    public class UploadCallback
    {
        /// <summary>
        /// 状态 1成功 -1错误
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }
        /// <summary>
        /// 返回数据
        /// </summary>
        public UploadData data { get; set; }
    }

    public class UploadData
    {

        public string imgServerUrl { get; set; }

        /// <summary>
        /// 上传成功后的文件的相对路径
        /// </summary>
        public string newFileName { get; set; }

        /// <summary>
        /// 缩略图相对路径
        /// </summary>
        public string thumbnailFileName { get; set; }

        /// <summary>
        /// 原文件名
        /// </summary>
        public string originalFileName { get; set; }
    }

    /// <summary>
    /// 文件服务器上传返回API
    /// </summary>
    public class ServerUploadCallBack
    {
        /// <summary>
        /// 状态
        /// </summary>
        public string Status { get; set; }

        /// <summary>
        /// 消息
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// 返回数据
        /// </summary>
        public ServerUploadCallBackData data { get; set; }
    }

    /// <summary>
    /// 返回的文件数据信息
    /// </summary>
    public class ServerUploadCallBackData
    {
        /// <summary>
        /// 文件地址
        /// </summary>
        public string filePath { get; set; }

        /// <summary>
        /// 大小
        /// </summary>
        public int size { get; set; }

        /// <summary>
        /// 宽度
        /// </summary>
        public decimal width { get; set; }

        /// <summary>
        /// 高度
        /// </summary>
        public decimal height { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime createAt { get; set; }
    }

    public class AttrFilesController : TomAbpControllerBase
    {

        public async Task<ActionResult> UploadForEditor()
        {
            var res = await BaseUpload();

            var up = res.FirstOrDefault();
            if (up == null)
                return Json(new { error = 0, url = up.data.newFileName });
            return up.status == 1
                ? Json(new { error = 0, url = up.data.imgServerUrl + up.data.newFileName })
                : Json(new { error = 1, message = "图片上传失败" });
        }

        private async Task<List<UploadCallback>> BaseUpload(bool isImage = true)
        {
            var uploadCallback = new List<UploadCallback>();
            var context = HttpContext;
            var result = await Task.Run<List<UploadCallback>>(() =>
            {
                var callbackList = new List<UploadCallback>();
                var callback = new UploadCallback { status = -1 };
                if (context.Request.Files.Count == 0)
                {
                    callback.msg = "没有获取到文件数据！";
                    callbackList.Add(callback);
                }
                else
                {
                    for (var i = 0; i < context.Request.Files.Count; i++)
                    {
                        try
                        {
                            var fileStream = context.Request.Files[i];
                            string fileExt = Path.GetExtension(fileStream.FileName); //文件扩展名，含“.”
                            string originalFileName = fileStream.FileName.Substring(fileStream.FileName.LastIndexOf(@"\") + 1); //取得文件原名
                            string fileName = Guid.NewGuid().ToString() + fileExt; //随机文件名
                            string dirPath = "/upload/"; //上传目录相对路径
                            if (!IsImage(fileExt))
                            {
                                callback.msg = "对不起，仅允许上传图片文件！";
                                callbackList.Add(callback);
                                continue;
                            }
                            //检查文件大小是否合法
                            if (fileStream.ContentLength >= 1 * 1024 * 1024)
                            {
                                callback.msg = "文件超过限制的大小啦，1M以内！";
                                callbackList.Add(callback);
                                continue;
                            }
                            //获得要保存的文件路径
                            string serverFileName = dirPath + fileName;
                            string serverThumbnailFileName = dirPath + "small_" + fileName;
                            string returnFileName = serverFileName;
                            //物理完整路径                    
                            string toFileFullPath = context.Server.MapPath(dirPath);
                            //检查有该路径是否就创建
                            if (!Directory.Exists(toFileFullPath))
                            {
                                Directory.CreateDirectory(toFileFullPath);
                            }
                            //保存文件
                            fileStream.SaveAs(toFileFullPath + fileName);
                            callback.status = 1;
                            callback.msg = "上传成功!";
                            callback.data = new UploadData
                            {
                                newFileName = returnFileName,
                                thumbnailFileName = serverThumbnailFileName,//返回缩略图
                                originalFileName = originalFileName, //原文件名
                            };
                            callbackList.Add(callback);
                        }
                        catch (Exception ex)
                        {
                            callback.msg = ex.Message;
                            callbackList.Add(callback);
                            continue;
                        }
                    }
                }
                return callbackList;
            });
            return result;
        }


        //
        // GET: /Common/AttrFiles/
        /// <summary>
        /// 文件上传
        /// </summary>
        /// <param name="isImage">是否为图片</param>
        /// <returns></returns>
        public async Task<ActionResult> Upload(bool isImage = true)
        {
            var result = await BaseUpload(isImage);
            return Json(result);
        }


        private  bool IsImage(string _fileExt)
        {
            ArrayList al = new ArrayList();
            al.Add(".bmp");
            al.Add(".jpeg");
            al.Add(".jpg");
            al.Add(".gif");
            al.Add(".png");
            if (al.Contains(_fileExt.ToLower()))
            {
                return true;
            }
            return false;
        }

    }
}
