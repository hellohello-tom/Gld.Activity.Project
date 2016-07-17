(function ($) {
    if (Object.prototype.toString($) != '[object Object]') return;
    $.fn.countdown = function (opt) {
        var def = {
            callBack: function () { }
        };
        var oHtml = '';
        var showDay = true;
        var $this = $(this);
        var objTimes = [];
        var opts = $.extend(def, opt);
        if (typeof ($this.attr("show-day")) == "undefined") {
            showDay = false;
        }
        setInterval(function () {
            for (var i = 0; i < $this.length; i++) {
                objTimes.push($this.eq(i).data("time"));
                if (objTimes[i] > 0) {
                    objTimes[i] = objTimes[i] - 1;
                }
                oHtml = oa(objTimes[i]);
                $this.eq(i).html(oHtml);
                if (objTimes[i] === 0) {
                    opts.callBack();
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
                return oHtml = day + '天' + hour + '时' + minute + '分' + second + '秒';
            } else {
                var hour = opt / 3600;
                hour = checkTime(parseInt(hour));
                return oHtml = '<span class="cbBg cbHour radius">' + hour + '</span>&nbsp;：<span class="cbBg cbMinute radius">' + minute + '</span>&nbsp;：<span class="cbBg cbSecond radius">' + second + '</span>';
            }
        }
        function checkTime(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }
    }
}(Zepto))