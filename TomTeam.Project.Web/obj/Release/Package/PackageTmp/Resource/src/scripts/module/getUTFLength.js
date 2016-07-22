/**
 * 在String原型上添加一个UTFlength属性，获取中文实际长度
 * @date  2016-06-06
 * @author  Zhao Liubin
 */

module.exports = (function() {
  // String.prototype.getUTFLength = function() {
  //   return this.replace(/[\u4E00-\u9FA5]/g, 'zz').length;
  // }

  Object.defineProperty(String.prototype, 'UTFlength', {
    get: function() {
      return this.replace(/[\u4E00-\u9FA5]/g, 'zz').length;
    }
  });
})();
