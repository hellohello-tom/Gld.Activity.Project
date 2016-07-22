/**
 * 判断目标类型，方法集合
 * @author Zhao Liubin
 * @type {Object}
 */
module.exports = {
  isFunction(obj) {
    return getType(obj) === 'function';
  },
  isString(obj) {
    return getType(obj) === 'string';
  },
  isArray(obj) {
    return Array.isArray ? Array.isArray(obj) : getType(obj) === 'array';
  },
  isObject(obj) {
    return getType(obj) === 'object';
  }
};
