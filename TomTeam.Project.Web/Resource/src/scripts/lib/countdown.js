(function ($) {
    if (Object.prototype.toString($) != '[object Object]') return;
    $.fn.countdown = function (opt) {
        var def = {
            showDay: true,
            callBack: function () { }
        };
        var oHtml = '';
        var $this = $(this);
        var objTimes = [];
        var opts = $.extend(def, opt);
        var showDay = opts.showDay;
        if (typeof ($this.attr("show-day")) == "undefined") {
            showDay = false;
        }
        var t = setInterval(function () {
            console.log($this.length)
            for (var i = 0; i < $this.length; i++) {
                var time=parseInt($this.eq(i).data('time'));
                // if(!time){
                //     // clearInterval(t);
                //     continue;
                // }
                objTimes.push(time);
                if (objTimes[i] > 0) {
                    objTimes[i] = objTimes[i] - 1;
                }
                oHtml = oa(objTimes[i]);
                $this.eq(i).html(oHtml);
                if (objTimes[i] <= 0) {
                    clearInterval(t);
                    $this.eq(i).html('已结束');
                    typeof opts.callBack==='function' && opts.callBack();
                }
            }
        },
            1000);

        function oa(opt) {
            var minute = opt / 60 % 60;
            var second = opt % 60;
            hour = checkTime(parseInt(hour));
            minute = checkTime(parseInt(minute));
            second = checkTime(parseInt(second));
            if (showDay) {
                var day = opt / 3600 / 24;
                var hour = opt / 3600 % 24;
                day = checkTime(parseInt(day));
                hour = checkTime(parseInt(hour));
                return oHtml = '<span>' + day + '</span>天<span>' + hour + '</span>时<span>' + minute + '</span>分<span>' + second + '</span>秒';
            } else {
                var hour = opt / 3600;
                hour = checkTime(parseInt(hour));
                return oHtml = '<span>' + hour + '</span>时<span>' + minute + '</span>分<span>' + second + '</span>秒';
            }
        }

        function checkTime(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }
        return this;
    }
}(jQuery));