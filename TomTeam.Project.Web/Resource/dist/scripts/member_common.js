/**
 * Created by Administrator on 2016/4/27.
 */

//上传文件风格2，直接拿到文件上传，前面就不校验啦。执行时直接对校验过的file对象作用，直接执行
function uploadFileStyle2(url,file,callback,check) {
    //构造加载进度HTML
    var progressBg = document.createElement('div');
    progressBg.style.cssText = 'position:fixed;left:50%;top:50%;padding:10px 40px 0;border:1px solid #666;box-shadow:inset 0 0 1px #fff;border-radius:4px;text-align:center;color:#fff;background:rgba(0,0,0,.5);z-index:8890;transform:translate(-50%,-50%);'
    var progressBarOuter = document.createElement('div');
    progressBarOuter.style.cssText = 'position:relative;height:6px;width:100px;border-radius:6px;border:1px solid #ddd;';
    var progressBarInner = document.createElement('span');
    progressBarInner.style.cssText = 'position:absolute;left:0;top:0;bottom:0;background:#56C7A8;transition:.3s;';
    var progressNum = document.createElement('p');
    //FormData上传
    if (window.FormData) {
        var formData = new FormData();
        formData.append('file', file);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                progressBg.parentNode.removeChild(progressBg);
                var data = JSON.parse(xhr.response);
                typeof callback == 'function' && callback(data);
            } else {
                typeof errorCallback == 'function' && errorCallback();
                console.log('上传故障');
            }
        };

        //加载进度事件
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                document.body.appendChild(progressBg);
                var complete = (event.loaded / event.total * 100 | 0) + '%';
                progressBarInner.style.width = complete;
                progressNum.innerHTML = '已完成：' + complete;
                progressBarOuter.innerHTML = progressBarInner.outerHTML;
                progressBg.innerHTML = progressBarOuter.outerHTML + progressNum.outerHTML;
            }
        }
        xhr.send(formData);
    }
}

(function(){
    var API={
        member:{
            export:'/member/memberUser/toHighSearch.html',
            import:'/member/memberUser/import.html',
            importFail:'importFail.html',
            download:'',
            errorDownload:'',
            delete:'/member/memberUser/deleteOfflineMember.html'
        }
    }

    //导出
    var ctx = "${ctx}";
    $('#export_member').on('click', function () {
//        // request发送请求
//        jQuery('<form action="' + ctx +'/member/expert/csv.html' + window.location.search + '" method="post" target="_blank"></form>').appendTo('body').submit().remove();
        window.location.href=API.member.export;
    });

    //会员导入
    var fileMember='',isFileOk=false;
    $('body').on('change','.file-select.member',function(){
        var $t=$(this),fileObj=this.files[0],name=fileObj.name,size=fileObj.size;
        var $wrapper=$t.closest('.file-area');
        $wrapper.find('.file-info').text(name);
        if(!/\.xlsx?$/.test(name)){
            $wrapper.find('.tips').text('需要上传xls(x)格式的文件哦').show();
            isFileOk=false;
            return;
        }
        if(3*1024*1024<size){
            $wrapper.find('.tips').text('文件太太了，要小于3M的才可以哦').show();
            isFileOk=false;
            return;
        }
        $wrapper.find('.tips').hide();
        fileMember=fileObj;
        isFileOk=true;
    });


    $('#import_member').on('click',function(){
        var d=dialog({
            width:350,
            title:'导入会员',
            content:$('.popup-html').children('.import-member').html(),
            ok:function(){
                if(isFileOk){
                    uploadFileStyle2(API.member.import,fileMember,function(data){
                        if(data.success){
                            dialog({
                                skin:'mini',
                                title:'提示',
                                content:'导入成功',
                                ok:function(){
                                    location.reload();
                                }
                            }).showModal();
                        }
                        else{
                            var object = eval(data.data.invalidNumber);
                            var stringify = JSON.stringify(object);
                            var csv = encodeURI(stringify);
                            dialog({
                                skin:'mini',
                                title:'提示',
                                content:'导入成功 '+data.data.total+' 条 '+' 失败 '+data.data.failureTotal+' 条<br>您可以点击下面按钮下载失败列表',
                                okValue:'下载失败列表',
                                ok:function(){
                                    //$.ajax({
                                    //    url:API.member.importFail,
                                    //    data:{csvString:csv},
                                    //    success:function(){
                                    //        if(data.data.total){
                                    //           //location.reload();
                                    //        }
                                    //    }
                                    //});
                                    var inputs = '<input type="hidden" name="csvString" value="' + csv + '" />';
                                    // request发送请求
                                    jQuery('<form action="/member/memberUser/importFail.html" method="post" id="import_fail">' + inputs+ '</form>').appendTo('body').submit().remove();
                                    d.close();
                                    if(data.data.total){
                                        setTimeout(function(){location.reload()},1500);
                                    }
                                }
                            }).showModal();
                        }
                    })
                }
                return false;
            },
            cancel:function(){

            }
        }).showModal();
    })


    //批量删除功能
    var arrMemberSelectedList = [];
    //全选
    $('.chks').on('change', '.chk-all', function () {
        $(this).closest('.chks').find('.chk').prop('checked', this.checked);
        arrMemberSelectedList = $(this).closest('.chks').find('.chk:checked').map(function () {
            return this.value;
        }).get();
    }).on('change', '.chk', function () {
        var $data_Container = $(this).closest('.chks');
        arrMemberSelectedList = $data_Container.find('.chk:checked').map(function () {
            return this.value;
        }).get();
        if (!this.checked) {
            $data_Container.find('.chk-all').prop('checked', false);
            return;
        }
        var length_checkbox = $data_Container.find('.chk:not(".chk-all")').length,
            length_checked = $data_Container.find(':checked').length;
        if (length_checkbox == length_checked) {
            $data_Container.find('.chk-all').prop('checked', true);
        }

    });

    //批量删除
    $('.btn-del-batch').on('click', function () {
        if (arrMemberSelectedList.length > 0) {

            dialog({
                width: 300,
                skin: 'mini',
                title: '批量删除',
                content: '点击确认将永久删除这些会员哦，请想清楚呢',
                ok: function () {
                    PCwaiting.show();
                    $.post(API.member.delete, {
                            memberIds: arrMemberSelectedList.toString()
                        },
                        function (data) {
                            PCwaiting.hide();
                            if (data.success) {
                                dialog({
                                    title:'提示',
                                    skin:'mini',
                                    content: data.message,
                                    ok: function () {
                                        location.reload();
                                    }
                                }).showModal();
                            }
                            else {
                                alertMsg(data.message);
                            }

                        },
                        'JSON'
                    )
                }
            }).showModal();
        }
        else {
            alertMsg('需要至少选中一个会员哦')
        }
    })

    //简单封一下，不带操作只提示文字的小弹窗
    function alertMsg(content){
        dialog({
            skin:'mini',
            title:'提示',
            content:content,
            okValue:'好的',
            ok:function(){

            }
        }).showModal();
    }

    //加载等待提示，pcWaiting.show()、waiting.remove(),电脑端等待，没有提示文字,arg=global：局部小等待
    PCwaiting = {
        _getDiv: function (arg) {
            var w = document.querySelector('.PCwaiting');

            if (!w) {
                var div = document.createElement('div');
                div.className = 'PCwaiting ' + (arg == 'global' ? '' : 'local');
                w = div;
                var style = document.createElement('style');
                style.innerHTML = ".PCwaiting{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:8888}.PCwaiting.local{left:50%;top:36%;width:50px;height:48px;margin-left:-25px;border-radius:3px;}.PCwaiting:after {content: ''; position: absolute; top: 50%; left: 50%; width: 3px; height: 3px; margin-top: -2px; margin-left: -2px; text-align: center; -webkit-border-radius: 100%; border-radius: 100%; box-shadow:0 0 3px; -webkit-transition: all, 0.3s, linear; transition: all, 0.3s, linear; -webkit-animation: am-wait 1.2s linear infinite; animation: am-wait 1.2s linear infinite;box-shadow:0 -10px 0 1px #eee, 10px 0px #eee, 0 10px #eee, -10px 0 #eee, -7px -7px 0 0.5px #eee, 7px -7px 0 0.5px #eee, 7px 7px #eee, -7px 7px #eee }@-webkit-keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}}@keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}";
                w.appendChild(style);
                document.body.appendChild(w);
            }
            return w;
        },
        show: function (arg) {
            this._getDiv(arg).style.display = 'block';
        },
        hide: function () {
            this._getDiv().style.display = 'none';
        },
        remove: function () {
            document.body.removeChild(this._getDiv());
        }
    };

})();