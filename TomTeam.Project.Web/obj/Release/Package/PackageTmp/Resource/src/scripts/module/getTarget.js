/**
 * 获取目标节点，真实的，非jQuery
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {jQuery obj || DOM || String}
 * @return {[type]}
 */
module.exports = (target) => {
  if (target) {
    if (typeof target == 'string') {
      return document.querySelector(target);
    } else if (target.nodeName) {
      return target;
    } else {
      return target[0];
    }
  } else {
    return '';
  }
};
