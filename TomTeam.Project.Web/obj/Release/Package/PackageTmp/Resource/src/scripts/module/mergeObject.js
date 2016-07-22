/**
 * 合并对象，非深度
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {Object}
 * @param  {object,object}
 * @return {[type]}
 */
module.exports = (objTo = {}, ...objFrom) => {
  objTo = typeOf.isObject(objTo) ? objTo : {};
  objFrom.forEach(function(el, index) {
    if (!typeOf.isObject(el)) {
      return;
    }
    Object.keys(el).forEach(function(item) {
      objTo[item] = el[item];
    });
  });
  return objTo;
}
