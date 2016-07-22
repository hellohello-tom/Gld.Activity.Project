/**
 * 手机端弹窗
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {opts}
 * @return {[type]}
 */
var popupMobile = function(opts) {
  var opt = {
    title: opts.title || '',
    content: opts.content || '', //内容
    cancelVal: opts.cancelVal || '', //取消文本
    okVal: opts.okVal || '', //确认文本
    ok: opts.ok || '', //确认回调
    cancel: opts.cancel || '', //取消回调
    mask: !!opts.mask || true, //是否遮罩
    theme: opts.theme || '', //主题：dark、iOS、weixin
    time: opts.time || 0, //自动关闭倒计时
    beforeShow: opts.beforeShow || '', //弹窗前执行事件
    afterShow: opts.afterShow || '',
    closeCallback: opts.closeCallback || '' //关闭后执行
  };
  //$.extend(opt, opts);
  var style = document.createElement('style');
  style.id = 'z-popup';
  style.innerText =
    '.popup{ position: fixed; top: 0; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 100; }' +
    '.popup .wrapper { position: absolute; top: 40%; left: 7%;right: 7%; padding: 5px;padding-bottom:0; margin: 0 10px;margin-top: -10px;text-align: center;  background: rgba(255,255,255,.96); color: #333;opacity: 0; -webkit-border-radius: 3px; border-radius: 3px ;-webkit-transition: all, 0.1s; transition: all, 0.1s; -webkit-transform: translate(0, -50%); transform: translate(0, -50%); -webkit-animation: popup-show 0.1s ease-in forwards; animation: popup-show 0.1s ease-in forwards; }' +
    '.popup .wrapper .title{font-size:16px;font-weight:400;margin-top:10px;}' +
    '.popup .content {padding:10px 15px; margin-bottom:5px;font-size:14px;text-align:left;color:#666;}' +
    '.popup.dark .content{color:#fff;margin:0;padding:8px 12px;line-height:1}' +
    '.popup .btns{margin: 10px 0; font-size: 0; }.popup .btns .btn{width: 100%; padding:0 4px;border:0;line-height:40px;font-size: 16px;text-decoration:none;color:#333; }' +
    '.popup .wrapper .btns .btn-wrapper{display: block;display:-webkit-flex;display:flex; border:0;-webkit-box-shadow:0 -1px #e2e2e2;box-shadow:0 -1px #e2e2e2;padding: 0; overflow: hidden; -webkit-box-flex: 1; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; align-items:center;}' +
    '.popup.nomask{ background: transparent }' +
    '.popup.dark .wrapper{ left:50%;right:auto;padding:0; background: rgba(0, 0, 0, 0.7); color: #fff;border-radius:2px;-webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}' +
    '.popup .wrapper .close {display: none; }' +
    '.popup .wrapper .close { position: absolute; right: -8px; top: -8px; padding: 15px; line-height: 1; background: #fff; -webkit-border-radius: 50%; -moz-border-radius: 50%; border-radius: 50%; }' + ".popup .wrapper .close:before,.popup .wrapper .close:after {  content: ''; position: absolute; left: 50%; top: 5px; bottom: 5px; width: 1px; background: #FA8803; -webkit-transform: rotate(45deg); transform: rotate(45deg); }" +
    '.popup .wrapper .close:after{ -webkit-transform: rotate(-45deg); transform: rotate(-45deg); }' +
    '.popup.dark .btn{color:#fff;min-width:6em;}' +
    '.popup .wrapper .btns{display: -webkit-box; display: -webkit-flex; display: flex; margin: 0 -5px; }' +
    '.popup .wrapper .btns .btn-wrapper .btn, {border: 0; margin: 0;background-color: transparent; -webkit-border-radius: 0; -moz-border-radius: 0; border-radius: 0; }' +
    '.popup .wrapper .btns .btn-wrapper + .btn-wrapper{border-left: 1px solid #e2e2e2;}' +
    '.popup.ios .wrapper .btns .btn-wrapper .btn.ok{color: #4891DC;}.popup.weixin .wrapper .btns .btn-wrapper .btn.ok{color:#0BB20C}' +
    '@-webkit-keyframes popup-show { 100% { opacity: 1; } } @keyframes popup-show {100% {opacity: 1; } }';

  var _isFunction = (obj) => typeof obj == 'function' ? true : false;

  !document.querySelector('#z-popup') && document.querySelector('head').appendChild(style);
  var title = opt.title,
    content = opt.content,
    ok = opt.ok,
    okVal = opt.okVal || _isFunction(opt.ok) ? opt.okVal ? opt.okVal : '确定' : '',
    mask = opt.mask;
  var time = parseInt(opt.time),
    cancelVal = opt.cancelVal || _isFunction(opt.cancel) ? opt.cancelVal ? opt.cancelVal : '取消' : '',
    cancel = opt.cancel,
    beforeShow = opt.beforeShow,
    afterShow = opt.afterShow,
    closeCallback = opt.closeCallback;

  if (opt.theme == 'dark') {
    mask = false;
  } else if (/iOS|iPhone|Apple/i.test(opt.theme)) {
    //mask = false;
    opt.theme = 'iOS';
  } else {
    opt.theme = 'weixin';
  }

  var div = document.createElement('div'),
    className = 'popup ' + opt.theme.toLowerCase();

  if (!mask) {
    className += ' nomask';
  }

  div.className = className;
  //var $div = $(div);
  //div.appendChild(style);
  var html = '<div class="wrapper">' + (title ? ('<h3 class="title">' + title + '</h3>') : '') + '<a href="javascript:;" class="close"></a>' + (content ? ('<div class="content">' + content + '</div>') : '') + ((okVal || cancelVal) ? ('<div class="btns">' + (cancelVal ? ('<span class="btn-wrapper"><a href="javascript:;" class="cancel btn">' + cancelVal + '</a></span>') : '') + (okVal ? ('<span class="btn-wrapper"><a href="javascript:;" class="btn ok">' + okVal + '</a></span>') : '')) : '') + '</div></div>';
  div.innerHTML += html;

  // function _remove() {
  //     div.parentNode.removeChild(div);
  // }

  var _remove = () => {
    div.parentNode.removeChild(div);
  };

  // function _isFunction(obj) {
  //     return typeof obj == 'function' ? true : false;
  // }

  document.body.appendChild(div);
  div.addEventListener('click', function(e) {
    e = e || window.event;
    var cl = e.target.classList;
    if (cl.contains('close') || cl.contains('cancel')) {
      _isFunction(cancel) && cancel();
      _remove();
    } else if (cl.contains('ok')) {
      _isFunction(ok) && ok();
      _remove();
    }
  });

  _isFunction(beforeShow) && beforeShow();

  //自动关闭执行事件
  //
  var _autoClose = () => {
    _remove();
    _isFunction(closeCallback) && closeCallback();
  };
  // function _autoClose() {
  //     _remove();
  //     _isFunction(closeCallback) && closeCallback();
  // }

  if (time > 0) {
    setTimeout(_autoClose, time);
  }
  return div;
};

typeof module == 'object' && module.exports ? module.exports = popupMobile : window.popupMobile = popupMobile;
