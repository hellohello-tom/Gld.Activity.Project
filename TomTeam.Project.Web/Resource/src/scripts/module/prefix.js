/**
 * 加兼容性前缀如 webkit等，未完成
 * @type {Object}
 */
module.exports = {
  prefix: ['webkit'],
  event(opts = {
    target: '',
    handle: '',
    capture: false
  }) {

  },
  style(opts = {
    target: '',
    key: '',
    value: ''
  }) {
    var target = getTarget(opts.target),
      key = opts.key,
      value = opts.value;
    if (target && key && value) {
      this.prefix.forEach(function(t) {
        target.style[t + key] = value;
      });
      target.style[key] = value;
    }
  }
};
