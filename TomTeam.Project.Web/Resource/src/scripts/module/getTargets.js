/**
 * 获取节点数组
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {jQuery Obj||DOMS||String}
 * @return {[type]}
 */
module.exports = (target) => {
  var arrTemp = [];
  if (target) {
    if (typeof target == 'string') {
      arrTemp = document.querySelectorAll(target);
    } else if (target.nodeName) {
      arrTemp.push(target);
    } else if (typeof target.each == 'function') {
      arrTemp = Array.from(target);
    } else {
      arrTemp = target;
    }
    return arrTemp;
  } else {
    return '';
  }
};
