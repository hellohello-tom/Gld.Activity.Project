/**
 * 操作提示，需要进一步封装为成功或失败方法，模块化
 * 使用方法：require或Webpack，单独使用时：showTipsState('操作成功',function(){}),showTipsState('操作失败','error',function(){})
 * @author  Zhao Liubin
 * @type {[type]}
 */

(function() {
  var showTips = function(content, state, callback, time) {
    content = content || '操作成功';
    time = parseInt(time) || 2500;
    var box = document.createElement('div');
    var styleBox = 'position: fixed;top: 40%;left: 50%;min-width:150px;max-width:300px;padding: 1em 2em;border: 1px solid;font-size:12px;line-height: 1.5;text-align: center;color: #1fb5ac;background: #fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;z-index: 1028;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%) rotateX(90deg);transition:.35s;opacity:0;will-change:transform;';
    box.style.cssText = styleBox;
    box.classList.add('tips-state');

    var htmlIcon = '<span style="display: inline-block;width: 28px;margin-top: 4px;margin-bottom: 8px;border: 1px solid;font-size: 24px;line-height: 26px;font-family:sans-serif;-webkit-border-radius: 100%;border-radius: 100%;">';
    if (state === 'cancel' || state === 'error') {
      box.style.color = '#fb6363';
      htmlIcon += '!</span>';
    } else {
      htmlIcon += '&#x2713</span>';
    }

    box.innerHTML = htmlIcon + '<div>' + content + '</div>';
    document.body.appendChild(box);
    setTimeout(function() {
      box.style.transform = 'translate(-50%,-50%) rotateX(0)';
      box.style.opacity = 0.95;
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
      box.style.transform = 'translate(-50%,-50%) rotateX(90deg)';
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
  }) : window.showTipsState = exportObj;
})();
