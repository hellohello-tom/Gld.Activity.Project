//HTML5 上传简单实现，jQuery插件版
// ;
// (function ($) {
//     $.fn.upload = function (opts) {
//         var def = {
//             url: '',
//             type: 'POST',
//             dataType: 'JSON',
//             callback: function () { }
//         };

//         var opt = $.extend(true, def, opts);

//         this.on('change', function () {
//             var file = this.files[0];
//             var formData = new FormData();
//             formData.append('filename', file);
//             $.ajax({
//                 url: opt.url,
//                 type: opt.type,
//                 dataType: opt.dataType,
//                 data: formData,
//                 processData: false, //告诉jQuery不要去处理发送的数据
//                 contentType: false, //告诉jQuery不要支设置Content-Type请求头
//                 success: opt.callback
//             })
//             $(this).replaceWith($(this).clone(true));
//         })
//         return this;
//     }
// })($);

//HTML5 FormData 上传
// html5Upload({
//     obj:$('#id')[0],
//     beforeUpload:function(){
//         if(...){
//             return false;
//         }
//         return true;
//     },
//     callback:function(data){
//         console.log(data);
//     },
//     errorCallback:function(){
//         alert('服务器错误');
//     }
// })

//一些验证方法
;
var validator = {
    _reg: {
        empty: /^\s*$/,
        phone: /^1\d{10}$/,
        email: /^\w+[\w-+.]*@[\w-]+(\.[\w-])+$/,
        moneyFormat: /^\d+(\.\d{1,2})?$/,
        integer: /^\d+$/,
        illegal: /[<>]/,
        percent: /^0$|^[1-9]\d?$|^100$/
    },
    _check: function(pattern) {
        return function(arg) {
            return pattern.test(arg);
        }
    },
    isEmpty: function(arg) {
        var l = arguments.length;
        for (i = 0; i < l; i++) {
            if (this._check(this._reg.empty)(arguments[i]))
                return true;
        }
        return false;
    },
    isNotPhone: function(arg) {
        return !this._check(this._reg.phone)(arg);
    },
    isNotEmail: function(arg) {
        return !this._check(this._reg.email)(arg);
    },
    isNotMoneyFormat: function(arg) {
        return !this._check(this._reg.moneyFormat)(arg);
    },
    isNotInteger: function(arg) {
        return !this._check(this._reg.integer)(arg);
    },
    isIllegal: function(arg) {
        return this._check(this._reg.illegal)(arg);
    },
    isNotPercent: function(arg) {
        var l = arguments.length;
        for (i = 0; i < l; i++) {
            if (!this._check(this._reg.percent)(arguments[i]))
                return true;
        }
        return false;
    }
};


    $('[data-tips]').on('input',function(){
        $(this).removeClass('error').parent().children('.tips').hide();
    })

    //错误聚焦
    function errorFocus(obj){
        var arr=[];
        if(typeof obj=='Array'){
           arr=obj;
        }
        else{
            arr.push(obj);
        }
        for(var i=0;i<obj.length;i++){
            var $t=$(obj[i]);
            $t.focus().addClass('error');
            if($t.data('tips')){
                if($t.parent().children('.tips').length){
                    $t.parent().children('.tips').show();
                    return;
                }
                $t.parent().append('<span class="text-muted tips">'+$t.data('tips')+'</span>');
            }
        }
    }

//HTML5 上传
function html5Upload() {
    var arg = arguments[0];
    var obj = arg.obj;                               //作用于上传按钮对象
    var name = obj.name || 'image';                  //formData 格式
    var url = arg.url || '';                         //上传服务器
    var beforeUpload = arg.beforeUpload || '';       //上传前执行，需要返回值
    var callback = arg.callback || '';               //成功回调
    var errorCallback = arg.errorCallback || '';     //失败回调
    if (obj) {
        obj.addEventListener('change', function () {
            //构造加载进度HTML
            var progressBg = document.createElement('div');
            progressBg.style.cssText = 'position:fixed;left:50%;top:50%;padding:10px 40px 0;border:1px solid #666;box-shadow:inset 0 0 1px #fff;border-radius:4px;text-align:center;color:#fff;background:rgba(0,0,0,.5);z-index:123;transform:translate(-50%,-50%);'
            var progressBarOuter = document.createElement('div');
            progressBarOuter.style.cssText = 'position:relative;height:6px;width:100px;border-radius:6px;border:1px solid #ddd;';
            var progressBarInner = document.createElement('span');
            progressBarInner.style.cssText = 'position:absolute;left:0;top:0;bottom:0;background:#56C7A8;transition:.3s;';
            var progressNum = document.createElement('p');
            var isReady = true;
            var selfFunc=arguments.callee;
            //FormData上传
            if (window.FormData) {
                if (typeof beforeUpload == 'function') {
                    isReady = beforeUpload(obj);
                }    
                if (isReady) {
                    var formData = new FormData();
                    formData.append(name, obj.files[0]);
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            progressBg.parentNode.removeChild(progressBg);
                            var data = JSON.parse(xhr.response);
                            typeof callback == 'function' && callback(data);
                            var newNode = obj.cloneNode(true);
                            obj.parentNode.replaceChild(newNode, obj);
                            html5Upload({
                                obj: newNode,
                                url: url,
                                callback: callback,
                                beforeUpload: beforeUpload,
                                name: name,
                                errorCallback:errorCallback
                            });
                            obj.removeEventListener('change',selfFunc);
                        } else {
                            typeof errorCallback == 'function' && errorCallback();
                            console.log('上传失败');
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
        })
    }
}

//加载等待提示，pcWaiting.show()、waiting.remove(),电脑端等待，没有提示文字,arg=global：全遮罩
var PCwaiting = {
    _getDiv: function (arg) {
        var w = document.querySelector('.PCwaiting');
        
        if (!w) {
            var div = document.createElement('div');
            div.className = 'PCwaiting '+(arg=='global'?'':'local');
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

//手机端等待遮罩，与PC端只用一个即可（可加提示文字）
var mobileWaiting={
    _getDiv: function(arg) {
        var w = document.querySelector('.mobileWaiting'),
            content = arg || '数据加载中，请稍等';
        if (!w) {
            var div = document.createElement('div');
            div.className = 'mobileWaiting';
            w = div;
            var style=document.createElement('style');
            style.innerText='.mobileWaiting {position: fixed;top: 0;bottom: 0;left: 0;right: 0;color:#fff;background-color: rgba(0, 0, 0, 0.5);z-index: 8888;}.mobileWaiting .content {padding: 10px 0;position: absolute;top: 50%;left: 50%; margin-top: -30px; font-size: 16px; color: #eee; text-shadow: 1px 1px 1px #333; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}.mobileWaiting .elipsis {position: absolute; width: .25em; overflow: hidden; white-space: nowrap; -webkit-transition: all 0.3s; transition: all 0.3s; -webkit-animation: loading 1.5s steps(3) infinite; animation: loading 1.5s steps(3) infinite; }@-webkit-keyframes loading {  100% {width: 1em; } } @keyframes loading {100% {width: 1em; } }}';
            w.appendChild(style);
            w.innerHTML+='<span class=content><span class="body"></span><span class="elipsis">...</span></span>';
            document.body.appendChild(w);
        }
        w.querySelector('.body').innerHTML=content;
        return w;
    },
    show: function(arg) {
        this._getDiv(arg).style.display = 'block';
    },
    hide: function() {
        this._getDiv().style.display = 'none';
    },
    remove: function() {
        document.body.removeChild(this._getDiv());
    }
}

//popup({title:"你好",content:"呵呵",theme:'ios',okVal:"确定",cancelVal:"取消"}) // //
//popup().remove();
function popup(opts) {
    var opt = {
        title: opts.title||'',
        content: opts.content||'',                  //内容
        cancelVal: opts.cancelVal||'',              //取消文本
        okVal: opts.okVal||'',                      //确认文本
        callback: opts.callback||'',                //确认回调
        cancelCallback: opts.cancelCallback||'',    //取消回调
        mask: !!opts.mask||true,                    //是否遮罩
        theme: opts.theme||'',                        //主题：dark、iOS、weixin
        time: opts.time||0,                         //自动关闭倒计时
        beforeShow: opts.beforeShow||'',            //弹窗前执行事件
        afterShow: opts.afterShow||'',
        closeCallback: opts.closeCallback||''       //关闭后执行
    }
    //$.extend(opt, opts);
var style=document.createElement('style');
style.id='z-popup';
style.innerText='.popup .btns{margin: 10px 0; text-align: center; font-size: 0; }.popup .btns .btn{padding:12px 4px;line-height:1;}'+
'.popup .btns .btn-wrapper {display: inline-block; width: 50%; padding: 5px; }'+
'.popup .btns .btn{width: 100%; font-size: 16px; }'+
'.popup{ position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 100; }'+
'.popup.nomask{ background: transparent; }'+
'.popup .wrapper { position: absolute; top: 50%; left: 0; right: 0; padding: 25px; margin: 0 10px; background: #fff; opacity: 0; -webkit-transition: all, 0.1s; transition: all, 0.1s; -webkit-transform: translate(0, -50%); transform: translate(0, -50%); -webkit-animation: popup-show 0.1s ease-in forwards; animation: popup-show 0.1s ease-in forwards; }'+
'.popup .wrapper .title{font-size:16px;font-weight:400;margin-top:10px;}'+
'.popup .wrapper .close { position: absolute; right: -8px; top: -8px; padding: 15px; line-height: 1; background: #fff; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%; }'
+".popup .wrapper .close:before,.popup .wrapper .close:after {  content: ''; position: absolute; left: 50%; top: 5px; bottom: 5px; width: 1px; background: #FA8803; -webkit-transform: rotate(45deg); transform: rotate(45deg); }"+
'.popup .wrapper .close:after{ -webkit-transform: rotate(-45deg); transform: rotate(-45deg); }'+
'.popup .content {padding: 10px 0; margin-bottom:5px;}.popup.weixin .wrapper .content{padding:10px 15px;text-align:left;color:#666;}'+
'.popup .btns{margin: 0;}.popup.dark .btn{color:#fff}'+
'.popup.dark .wrapper, .popup.ios .wrapper,.popup.weixin .wrapper{  left: 7%; right: 7%; padding: 5px; padding-bottom:0;margin-top: -10px; text-align: center; background: rgba(0, 0, 0, 0.7); color: #fff; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; }'
+'.popup.ios .wrapper,.popup.weixin .wrapper {background: rgba(255,255,255,.96); color: #333; -webkit-border-radius: 4px; border-radius: 4px; }'
+'.popup.dark .wrapper .close, .popup.ios .wrapper .close,.popup.weixin .wrapper .close {display: none; }'+
'.popup.dark .wrapper .btns,.popup.ios .wrapper .btns,.popup.weixin .wrapper .btns{display: -webkit-box; display: -webkit-flex; display: flex; margin: 0 -5px; }'+
'.popup.dark .wrapper .btns .btn-wrapper, .popup.ios .wrapper .btns .btn-wrapper,.popup.weixin .wrapper .btns .btn-wrapper{display: block; border:0;-webkit-box-shadow:0 -1px rgba(255,255,255,.3);box-shadow:0 -1px rgba(255,255,255,.3); padding: 0; overflow: hidden; -webkit-box-flex: 1; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; }'
+'.popup.dark .wrapper .btns .btn-wrapper .btn, .popup.ios .wrapper .btns .btn-wrapper .btn,.popup.weixin .wrapper .btns .btn-wrapper .btn  {border: 0; margin: 0;background-color: transparent; -webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0; }'
+'.popup.dark .wrapper .btns .btn-wrapper + .btn-wrapper,  .popup.ios .wrapper .btns .btn-wrapper + .btn-wrapper,.popup.weixin .wrapper .btns .btn-wrapper + .btn-wrapper {border-left: 1px solid rgba(255, 255, 255, 0.3);}'
+'.popup.ios .wrapper .btns .btn-wrapper,.popup.weixin .wrapper .btns .btn-wrapper {border:0;-webkit-box-shadow:0 -1px #e2e2e2;box-shadow:0 -1px #e2e2e2;}'
+'.popup.ios .wrapper .btns .btn-wrapper .btn,.popup.weixin .wrapper .btns .btn-wrapper .btn {color: #333; }.popup.ios .wrapper .btns .btn-wrapper .btn.ok{color: #4891DC;}.popup.weixin .wrapper .btns .btn-wrapper .btn.ok{color:#0BB20C}'+
'.popup.ios .wrapper .btns .btn-wrapper + .btn-wrapper,.popup.weixin .wrapper .btns .btn-wrapper + .btn-wrapper {border-color: #e2e2e2; }'+
'@-webkit-keyframes popup-show { 100% { opacity: 1; } } @keyframes popup-show {100% {opacity: 1; } }';
   
    !document.querySelector('#z-popup') && document.querySelector('head').appendChild(style);
    var title = opt.title,
        content = opt.content,
        okVal = opt.okVal,
        callback = opt.callback,
        mask = opt.mask;
    var time = parseInt(opt.time),
        cancelVal = opt.cancelVal,
        cancelCallback = opt.cancelCallback,
        beforeShow = opt.beforeShow,
        afterShow = opt.afterShow,
        closeCallback = opt.closeCallback;

    if (opt.theme == 'dark') {
        mask = false;
    } else if (/iOS|iPhone|Apple/i.test(opt.theme)) {
        //mask = false;
        opt.theme = 'iOS';
    }else {
        opt.theme='weixin';
    }

    var div = document.createElement('div'),
        className = 'popup ' + opt.theme.toLowerCase();

        console.log(mask);
    if (!mask) {
        className += ' nomask';
    }

    div.className = className;
    //var $div = $(div);
    //div.appendChild(style);
    var html = '<div class="wrapper">' + (title ? ('<h3 class="title">' + title + '</h3>') : '') + '<a href="javascript:;" class="close"></a>' + (content ? ('<div class="content">' + content + '</div>') : '') + ((okVal || cancelVal) ? ('<div class="btns">' + (cancelVal ? ('<span class="btn-wrapper"><a href="javascript:;" class="cancel btn btn-danger">' + cancelVal + '</a></span>') : '') + (okVal ? ('<span class="btn-wrapper"><a href="javascript:;" class="btn btn-warning ok">' + okVal + '</a></span>') : '')) : '') + '</div></div>';
    div.innerHTML += html;

    function _remove() {
        div.parentNode.removeChild(div);
    }

    function _isFunction(obj) {
        return typeof obj == 'function' ? true : false;
    }

    document.body.appendChild(div);
    div.addEventListener('click', function(e) {
        var e = e || window.event,
            cl = e.target.classList;
        if (cl.contains('close') || cl.contains('cancel')) {
            _isFunction(cancelCallback) && cancelCallback();
            _remove();
        } else if (cl.contains('ok')) {
            _isFunction(callback) && callback();
            _remove();
        }
    })

    _isFunction(beforeShow) && beforeShow();

    //自动关闭执行事件
    function _autoClose() {
        _remove();
        _isFunction(closeCallback) && closeCallback();
    }

    if (time > 0) {
        setTimeout(_autoClose, time);
    }
    return div;
}

//加载等待效果，var spin1=new SPIN('.loadmore','loadMore');
(function() {
        var spinOpts = {
            defaultOpt: {
                lines: 10 // The number of lines to draw
                    ,
                length: 3 // The length of each line
                    ,
                width: 2 // The line thickness
                    ,
                radius: 3 // The radius of the inner circle
                    ,
                scale: 1 // Scales overall size of the spinner
                    ,
                corners: 1 // Corner roundness (0..1)
                    ,
                color: '#333' // #rgb or #rrggbb or array of colors
                    ,
                opacity: 0.25 // Opacity of the lines
                    ,
                rotate: 0 // The rotation offset
                    ,
                direction: 1 // 1: clockwise, -1: counterclockwise
                    ,
                speed: 1 // Rounds per second
                    ,
                trail: 50 // Afterglow percentage
                    ,
                fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                    ,
                zIndex: 2e9 // The z-index (defaults to 2000000000)
                    ,
                className: 'spinner' // The CSS class to assign to the spinner
                    ,
                top: '50%' // Top position relative to parent
                    ,
                left: '50%' // Left position relative to parent
                    ,
                shadow: false // Whether to render a shadow
                    ,
                hwaccel: false // Whether to use hardware acceleration
                    ,
                position: 'absolute' // Element positioning
            },
            _getLoadMore: function() {

            },
            loadMore: function() {
                var o = Object.create(this.defaultOpt);
                o.className = 'spinner-loadmore';
                return o;
            }
        };

        function SPIN(target, spinType) {
           if(typeof Spinner!=='function' ){
            console.log('需要引入spin.js哦');
            return;
           }
            this.init(target, spinType);
        }
        SPIN.prototype.init = function(target, spinType) {
            this.target = target.nodeType ? target : document.querySelector(target);
            if(!this.target){
                return;
            }
            this.spinOpt = spinType ? spinOpts[spinType]() : spinOpts.defaultOpt;
            this.target.classList.add(this.spinOpt.className);
            this.spinner = new Spinner(this.spinOpt).spin(this.target);
        }
        SPIN.prototype.stop = function() {
            if(!this.target){
                return;
            }
            this.target.classList.remove(this.spinOpt.className);
            this.spinner.stop();
        }

        window.SPIN = SPIN;
    })();


    //顶部提示框
    function showTipsTop(content,target,time){
    var div=document.createElement('div'),container='';
    var cssText = 'position:absolute;left:25%;right:25%;top:0;padding:4px 30px;border:1px solid #ffd0c0;text-align:center;background:#fff6f3;color:#fb6362;line-height:2;z-index:5;';
    div.innerHTML=content||'小提示';
    div.classList.add('tips-top');
    div.style.cssText=cssText;

    if(target){
        if(typeof target=='string'){
            container=document.querySelector(target);
        }
        else if(target.nodeName){
            container=target;
        }
        else{
            container=target[0]
        }
    }
    else{
        container=document.body;
    }

    var tar=container;
    tar.insertBefore(div,tar.firstChild);

    var t=parseInt(time);
    if(t){
        setTimeout(function(){
            tar.removeChild(div);
        },t)
    }

}

    //修正iOS固定元素显示错乱，传入需要修正的元素
    function fixFixed(eles) {
        if(!eles||eles.length<=0){
            return;
        }

        //目前只修正iOS部分
        var regiOS=/i(os|pad|phone)/i;
        if(!regiOS.test(navigator.userAgent)){
            return;
        }

        //没有输入，就不修了
        var inputs = document.querySelectorAll('input,textarea'),
            iptL = inputs.length;

        if(iptL<=0){
            return;
        }

        var l=eles.length;
        //
        var _fixEles=function(e){
             var top = document.body.scrollTop || document.documentElement.scrollTop;
             if(l>0){
                for(var i=0;i<l;i++){
                     eles[i].style.cssText='position:absolute;-webkit-transform:translate3D(0,'+top+'px,0)';
                }
                return;
             }
                eles.style.cssText = 'position:absolute;-webkit-transform:translate3D(0,' + top + 'px,0)';
        }

        //滚动绑定事件
        var _fix = function() {
            document.addEventListener('scroll', _fixEles);
        }

        //解绑
        var _unbindFix=function(){
            document.removeEventListener('scroll',_fixEles);
            if(l>0){
                for(var i=0;i<l;i++){
                     eles[i].removeAttribute('style');
                }
                return;
            }
            eles.removeAttribute('style');
        }

        //目前绑在所有可输入元素上,异步加载时有些问题，暂时绑到滚动
        for(var i=0;i<iptL;i++){
            inputs[i].removeEventListener('focus', _fix);
            inputs[i].removeEventListener('blur', _unbindFix);

            inputs[i].addEventListener('focus', _fix);
            inputs[i].addEventListener('blur', _unbindFix)
        }
        // _fix();
    }