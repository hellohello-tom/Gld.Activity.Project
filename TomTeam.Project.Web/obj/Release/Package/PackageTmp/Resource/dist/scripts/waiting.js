(function() {
    var justWaiting = {
        _getDiv: function(theme) {      //theme:half,不是全屏遮罩
            var w = document.querySelector('.justWaiting');
            var theme=theme||'fullScreen';
            if (!w) {
                var div = document.createElement('div');
                div.className = 'justWaiting '+theme;
                w = div;
                var style = document.createElement('style');
                style.innerHTML = ".justWaiting{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:1000}.justWaiting.half{background:transparent}.justWaiting.half:before{content:'';position:absolute;left:50%;top:50%;width:50px;height:50px;margin-left:-25px;margin-top:-25px;background:rgba(0,0,0,.5);border-radius:4px;}.justWaiting:after {content: ''; position: absolute; top: 50%; left: 50%; width: 3px; height: 3px; margin-top: -2px; margin-left: -2px; text-align: center; -webkit-border-radius: 100%; border-radius: 100%; box-shadow:0 0 3px; -webkit-transition: all, 0.3s, linear; transition: all, 0.3s, linear; -webkit-animation: am-wait 1.2s linear infinite; animation: am-wait 1.2s linear infinite;box-shadow:0 -10px 0 1px #fff, 10px 0px #fff, 0 10px #fff, -10px 0 #fff, -7px -7px 0 0.5px #fff, 7px -7px 0 0.5px #fff, 7px 7px #fff, -7px 7px #fff }@-webkit-keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}}@keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}";
                w.appendChild(style);
                document.body.appendChild(w);
            }
            return w;
        },
        show: function(theme) {
            this._getDiv(theme).style.display = 'block';
        },
        hide: function() {
            this._getDiv().style.display = 'none';
        },
        remove: function() {
            document.body.removeChild(this._getDiv());
        }
    };
    var textWaiting = {
        _getDiv: function(arg) {
            var w = document.querySelector('.textWaiting'),
                content = arg || '数据加载中，请稍等';
            if (!w) {
                var div = document.createElement('div');
                div.className = 'textWaiting';
                w = div;
                var style = document.createElement('style');
                style.innerText = '.textWaiting {position: fixed;top: 0;bottom: 0;left: 0;right: 0;color:#fff;background-color: rgba(0, 0, 0, 0.5);z-index: 100;}.textWaiting .content {padding: 10px 0;position: absolute;top: 50%;left: 50%; margin-top: -30px; font-size: 16px; color: #eee; text-shadow: 1px 1px 1px #333; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);}.textWaiting .elipsis {position: absolute; width: .25em; overflow: hidden; white-space: nowrap; -webkit-transition: all 0.3s; transition: all 0.3s; -webkit-animation: loading 1.5s steps(3) infinite; animation: loading 1.5s steps(3) infinite; }@-webkit-keyframes loading {  100% {width: 1em; } } @keyframes loading {100% {width: 1em; } }}';
                w.appendChild(style);
                w.innerHTML += '<span class=content><span class="body"></span><span class="elipsis">...</span></span>';
                document.body.appendChild(w);
            }
            w.querySelector('.body').innerHTML = content;
            return w;
        },
        show: function(arg) {
            this._getDiv(arg).style.display = 'block';
        },
        hide: function() {
            this._getDiv().style.display = 'none';
        },
        remove: function() {
            document.body.removeChild(this._getDiv());
        }
    };

    //textWaiting.show();

    if(typeof define == 'function') {
         define(function() {
            return {
                justWaiting: justWaiting,
                textWaiting: textWaiting
            }
        })
     } 
     else{
        window.justWaiting=justWaiting;
        window.textWaiting=textWaiting;
        // export default {
        //     justWaiting:justWaiting,
        //     textWaiting:textWaiting,
        // }
     }
})();
