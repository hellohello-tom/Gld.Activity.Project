$.fn.sliding = function() {
  this.on('click', '.prev,.next', function() {
    var $t = $(this),
      $p = $t.closest('.js-slide'),
      $list = $p.find('.lists'),
      children = $list.children(),
      wChild = $(children[0]).outerWidth(),
      w = $list.width(),
      ratio = Math.ceil(w / wChild),
      cpr = Math.floor(children.length / ratio) - (children.length % ratio == 0 ? 1 : 0),

      l = parseInt($list.css('left')) || 0,
      absL = Math.abs(l);
    cpr = cpr < 0 ? 0 : cpr;
    if ($t.data('sliding')) {
      return;
    }
    $t.data('sliding', 1);
    if ($t.hasClass('next')) {
      if (Math.abs(cpr * w - absL) < 30) {
        $list.animate({
          left: l - 15
        }, 300);
        setTimeout(function() {
          $list.animate({
            left: l
          }, 300, function() {
            $t.data('sliding', 0);
          });
        }, 300);
        return;
      }
      l -= w;
    } else {
      if (absL < 30) {
        $list.animate({
          left: l + 15
        }, 300);
        setTimeout(function() {
          $list.animate({
            left: 0
          }, 300, function() {
            $t.data('sliding', 0);
          });
        }, 300);
        return;
      }
      l += w;
    }
    $list.animate({
      left: l
    }, function() {
      $t.data('sliding', 0);
    });
  });
  return this;
};
