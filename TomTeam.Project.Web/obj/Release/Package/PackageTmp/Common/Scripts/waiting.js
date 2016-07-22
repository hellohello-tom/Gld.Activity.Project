
var PCwaiting = {
    _getDiv: function (arg) {
        var w = document.querySelector('.PCwaiting');

        if (!w) {
            var div = document.createElement('div');
            div.className = 'PCwaiting';
            w = div;
            var style = document.createElement('style');
            style.innerHTML = ".PCwaiting{position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:1000}.PCwaiting:after {content: ''; position: absolute; top: 50%; left: 50%; width: 3px; height: 3px; margin-top: -2px; margin-left: -2px; text-align: center; -webkit-border-radius: 100%; border-radius: 100%; box-shadow:0 0 3px; -webkit-transition: all, 0.3s, linear; transition: all, 0.3s, linear; -webkit-animation: am-wait 1.2s linear infinite; animation: am-wait 1.2s linear infinite;box-shadow:0 -10px 0 1px #eee, 10px 0px #eee, 0 10px #eee, -10px 0 #eee, -7px -7px 0 0.5px #eee, 7px -7px 0 0.5px #eee, 7px 7px #eee, -7px 7px #eee }@-webkit-keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}}@keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}";
            w.appendChild(style);
            document.body.appendChild(w);
        }
        return w;
    },
    show: function (arg) {
        this._getDiv(arg).style.display = 'block';
    },
    hide: function () {
        this._getDiv().style.display = 'none';
    },
    remove: function () {
        document.body.removeChild(this._getDiv());
    }
};
