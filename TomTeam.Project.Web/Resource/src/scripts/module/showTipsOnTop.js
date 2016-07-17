/**
 * 顶部提示
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {提示信息}
 * @param  {作用目标}
 * @param  {可能需要自动删除倒计时间}
 * @return {[type]}
 */
var showTipsOnTop = function(content = '小提示', target, time) {
  var div = document.createElement('div'),
    tar = '';
  var cssText = 'position:absolute;left:25%;right:25%;top:0;padding:4px 30px;border:1px solid #ffd0c0;text-align:center;background:#fff6f3;color:#fb6362;line-height:2;z-index:5;';
  div.innerHTML = content;
  div.classList.add('tips-top');
  div.style.cssText = cssText;

  tar = getTarget(target) || document.body;
  tar.insertBefore(div, tar.firstChild);

  var t = parseInt(time);
  if (t) {
    setTimeout(function() {
      tar.removeChild(div);
    }, t);
  }
};
module.exports = showTipsOnTop;
