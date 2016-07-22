/**
 * 加载等待小菊花，封装进一个对象，不用new 构造了
 * @author  Zhao Liubin
 * @type {[type]}
 */
var Spinner = require('spin');

var spinOpts = {
  defaultOpt: {
    lines: 10 // The number of lines to draw
      ,
    length: 3 // The length of each line
      ,
    width: 2 // The line thickness
      ,
    radius: 3 // The radius of the inner circle
      ,
    scale: 1 // Scales overall size of the spinner
      ,
    corners: 1 // Corner roundness (0..1)
      ,
    color: '#333' // #rgb or #rrggbb or array of colors
      ,
    opacity: 0.25 // Opacity of the lines
      ,
    rotate: 0 // The rotation offset
      ,
    direction: 1 // 1: clockwise, -1: counterclockwise
      ,
    speed: 1 // Rounds per second
      ,
    trail: 50 // Afterglow percentage
      ,
    fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
      ,
    zIndex: 2e9 // The z-index (defaults to 2000000000)
      ,
    className: 'spinner' // The CSS class to assign to the spinner
      ,
    top: '50%' // Top position relative to parent
      ,
    left: '50%' // Left position relative to parent
      ,
    shadow: false // Whether to render a shadow
      ,
    hwaccel: false // Whether to use hardware acceleration
      ,
    position: 'absolute' // Element positioning
  },
  _getLoadMore: function() {

  },
  loadMore: function() {
    var o = Object.create(this.defaultOpt);
    o.className = 'spinner-loadmore';
    return o;
  }
};

function SPIN(target, spinType) {
  if (typeof Spinner !== 'function') {
    console.warn('需要引入spin.js哦');
    return;
  }
  this.init(target, spinType);
  return this.spinner;
}
SPIN.prototype.init = function(target, spinType) {
  this.target = getTarget(target);
  if (!this.target) {
    return;
  }
  this.spinOpt = spinType ? spinOpts[spinType]() : spinOpts.defaultOpt;
  this.target.classList.add(this.spinOpt.className);
  this.spinner = new Spinner(this.spinOpt).spin(this.target);
};
SPIN.prototype.stop = function() {
  if (!this.target) {
    return;
  }
  this.target.classList.remove(this.spinOpt.className);
  this.spinner.stop();
};

module.exports = (target, spinType) => {
  return new SPIN(target, spinType);
};
