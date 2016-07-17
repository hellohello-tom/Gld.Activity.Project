/**
 * 滑动删除
 * @author Zhao Liubin
 * @param { target} 删除目标
 * @param {function} 回调
 * @type {[type]}
 */
var getTargets = require('getTarget');

module.exports = (target = '', callback = '', direction = 'left', distance = 30) => {
  var target = getTarget(target);
  if (target) {
    var dir = '';
    switch (direction) {
      case 'up':
        dir = 'translateY(-' + distance + 'px)';
        break;
      case 'down':
        dir = 'translateY(' + distance + 'px)';
        break;
      case 'right':
        dir = 'translateX(' + distance + 'px)';
        break;
      default:
        dir = 'translateX(-' + distance + 'px)';
        break;
    }
    target.style.cssText = 'transition: .3s ease;z-index:-1;transform:' + dir + ';opacity:0';
    var _remove = function() {
      if (target.parentNode) {
        target.parentNode.removeChild(target);
        typeof callback === 'function' && (callback.bind(target))();
      }
    };
    // setTimeout(_remove, 300);
    target.addEventListener('transitionend', _remove, false);
  }
};
