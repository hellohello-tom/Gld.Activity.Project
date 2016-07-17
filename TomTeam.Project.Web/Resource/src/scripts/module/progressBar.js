/**
 * 加载数据进度条，前进度是模拟，用法 progressBar.show(color,initWidth(%));
 * @date   2016-07-08
 * @return {[type]}
 */
(function() {
  function P(color, initWidth) {
    this.color = color;
    this.width = initWidth;
  }
  P.prototype.show = function() {
    var progress = document.createElement('div');
    progress.style = 'position:fixed;left:0;top:0;height:2px;width:0;color:#999;background:#FB6362;transition:.5s;transform:top;box-shadow:0 0 5px;will-change:transform;z-index:8888;';
    if (this.color) {
      progress.style.background = this.color;
    }
    progress.innerHTML = '<style>@keyframes pBlink{0{box-shadow:none;}100%{box-shadow:0 0 3px}}</style><span style="position:absolute;right:0;top:0;bottom:0;width:50px;background: inherit;animation: pBlink 1s infinite alternate;"></span>';
    document.body.appendChild(progress);
    var width = this.width || '30%';
    setTimeout(function() { progress.style.width = width; }, 4);
    this.bar = progress;
    return this;
  };
  P.prototype.hide = function() {
    this.bar.style.width = '100%';
    var that = this;
    setTimeout(function() {
      that.bar.style.boxShadow = 'none';
      that.bar.style.transform = 'scaleY(1.2)';
      setTimeout(function() {
        that.bar.style.transform = 'scaleY(0)';
      }, 300);
    }, 10);
    setTimeout(function() {
      document.body.removeChild(that.bar);
    }, 1000);
  };
  var objExports = {
    entity: '',
    show(color, initWidth) {
      this.entity = new P(color, initWidth).show();
      return this.entity;
    },
    hide() {
      this.entity.hide();
    }

  };
  module.exports = objExports;
})();
