/**
 * 全部选中方法，对应一个顶层的class:chks,
 * 全选class:chks,子checkbox的class:chk
 * @author Zhao Liubin
 * @date   2016-05-19
 * @param  {[type]}
 * @return {[type]}
 */
module.exports = (function($) {
  if (!$) {
    console.warn('需要jQuery赞助哦');
    return;
  }
  $('.chks').on('change', '.chk-all', function() {
    $(this).closest('.chks').find('.chk').prop('checked', this.checked);
  }).on('change', '.chk:not(.chk-all)', function() {
    var $chks = $(this).closest('.chks');
    if (!this.checked) {
      $chks.find('.chk-all').prop('checked', false);
      return;
    }
    $chks.find('.chk-all').prop('checked', $chks.find('.chk:not(".chk-all")').length === $chks.find(':checked').length);
  });
})(jQuery);
