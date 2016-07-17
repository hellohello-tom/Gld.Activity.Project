/**
 * 获取目标类型
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {obj}
 * @return {[type]}
 */
module.exports = (target) => {
  try {
    return ({}).toString.call(target).match(/object\s*(\w*)/)[1].toLowerCase();
  } catch (e) {
    console.warn(e);
  }
};
