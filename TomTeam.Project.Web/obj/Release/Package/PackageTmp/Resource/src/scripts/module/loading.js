/**
 * 右上角加载提示，loading.show('可选内容',可选回调方法)，结束时loading.hide();
 * @author Zhao Liubin
 * @date   2016-06-03
 * @return {[type]}
 */
;
(function(window, document) {
  function Constructor(content, callback) {
    var content1 = typeof content === 'string' ? content : '数据加载中，请稍等...';
    var box = document.createElement('div');
    box.innerHTML = content1;
    box.style.cssText = 'position:fixed;right:4px;top:0;padding:3px 4px;line-height:1;color:#fff;background-color:#fb6361;z-index:5;';
    document.body.appendChild(box);
    this.loadingBox = box;
    this.loadingEndCallback = typeof content === 'function' ? content : callback;
  }
  Constructor.prototype.hide = function() {
    document.body.removeChild(this.loadingBox);
    typeof this.loadingEndCallback === 'function' && this.loadingEndCallback();
  };

  var exportObj = {
    entity: '',
    show: function(content, callback) {
      this.entity = new Constructor(content, callback);
    },
    hide: function() {
      this.entity.hide();
    }
  };

  typeof module === 'object' && module.exports ? module.exports = exportObj : typeof define === 'function' && define.amd ? define(function() {
    return exportObj;
  }) : window.loading = exportObj;

})(window, document);
