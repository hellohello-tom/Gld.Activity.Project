/**
 * 操作提示，需要进一步封装为成功或失败方法，模块化
 * 使用方法：require或Webpack，单独使用时：showTipsState('操作成功',function(){}),showTipsState('操作失败','error',function(){})
 * @author  Zhao Liubin
 * @type {[type]}
 */

(function() {
  var showTips = function(content, state, callback, time) {
    content = content || '你好';
    time = parseInt(time) || 2500;
    var box = document.createElement('div');
    var styleBox = 'position: fixed;bottom: 30%;left: 50%;min-width:100px;max-width:300px;padding: 0.5em 1em;font-size:12px;line-height: 1.5;text-align: center;color: #fff;background:#777;background: rgba(0,0,0,0.5);border-radius: 1px;z-index: 1028;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);transition:.35s;opacity:0;will-change:transform;';
    box.style.cssText = styleBox;
    box.classList.add('tips-state');

    if (state === 'cancel' || state === 'error' || state === 'false') {
      box.style.background = '#e77777';
      box.style.background = 'rgba(200,0,0,0.5)';
    }
    box.innerHTML = '<div>' + content + '</div>';
    document.body.appendChild(box);
    setTimeout(function() {
      box.style.bottom = '31%';
      box.style.opacity = 1;
    }, 30);

    // var opDef=0,deg=95;
    // var rotateShow=function(){
    //     opDef+=0.05,deg-=5;
    //     box.style.transform='translate(-50%,-50%) rotateX('+deg+'deg)';
    //     box.style.opacity=opDef;
    //     if(opDef<0.95){
    //         requestAnimationFrame(rotateShow);
    //     }
    // }
    // requestAnimationFrame(rotateShow);

    var _close = function() {
      document.body.removeChild(box);
    };

    setTimeout(function() {
      box.style.opacity = 0.05;
    }, parseInt(time) - 500);
    setTimeout(function() {
      _close();
      typeof state === 'function' ? state() : typeof callback === 'function' && callback();
    }, parseInt(time));
  };

  var exportObj = showTips;
  typeof module === 'object' && module.exports ? module.exports = exportObj : typeof define === 'function' && define.amd ? define(function() {
    return exportObj;
  }) : window.showTips = exportObj;
})();
