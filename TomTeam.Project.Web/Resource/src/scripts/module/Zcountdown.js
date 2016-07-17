var getTargets = require('getTargets.js');

module.exports = (opts = {
  target: '',
  callback: '',
  endTips: '已结束'
}) => {
  var target = opts.target,
    callback = opts.callback,
    endTips = opts.endTips;

  if (target) {
    var filltHTML = function(container) {

    }

    var targets = getTargets(target),
      tl = targets.length;
  }

}
