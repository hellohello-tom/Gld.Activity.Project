/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/htmls/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(18);

	var waiting = __webpack_require__(6);

	$('.js-slide').sliding();

/***/ },

/***/ 2:
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * 操作等待旋转提示，非全屏，可加参数
	 * 使用说明：require或webpack,单独使用时显示：waiting.show('可先容器字符串')，去除：waiting.hide();
	 * 若修改源码时去掉className :local，变为全屏遮罩
	 * @author Zhao Liubin
	 */
	(function (window, document) {
	  var Waiting = function Waiting(container) {
	    this.init(container);
	    return this;
	  };

	  Waiting.prototype.init = function (container) {
	    container = document.querySelector(container) || document.body;
	    var box = container.querySelector('.PCwaiting');
	    if (!box) {
	      var div = document.createElement('div');
	      div.className = 'PCwaiting local';
	      box = div;
	      if (!container) {
	        div.style.position = 'fixed';
	      }
	      box.innerHTML = '<style>.PCwaiting{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:8888}.PCwaiting.local{left:50%;top:40%;width:52px;height:50px;margin:-25px -26px;border-radius:3px;}.PCwaiting:after {content: ""; position: absolute; top: 50%; left: 50%; width: 3px; height: 3px; margin-top: -2px; margin-left: -2px; text-align: center; -webkit-border-radius: 100%; border-radius: 100%; box-shadow:0 0 3px; -webkit-transition: all, 0.3s, linear; transition: all, 0.3s, linear; -webkit-animation: am-wait 1.2s linear infinite; animation: am-wait 1.2s linear infinite;box-shadow:0 -10px 0 1px #eee, 10px 0px #eee, 0 10px #eee, -10px 0 #eee, -7px -7px 0 0.5px #eee, 7px -7px 0 0.5px #eee, 7px 7px #eee, -7px 7px #eee }@-webkit-keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}}@keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}</style>';
	    }
	    this.waitingContainer = container;
	    if (container.tagName === 'BODY') {
	      box.style.position = 'fixed';
	    }
	    this.waitingBox = box;
	  };
	  Waiting.prototype.show = function () {
	    this.waitingContainer.appendChild(this.waitingBox);
	    return this;
	  };
	  Waiting.prototype.hide = function () {
	    this.waitingBox.parentNode == this.waitingContainer && this.remove();
	    return this;
	  };
	  Waiting.prototype.remove = function () {
	    this.waitingContainer.removeChild(this.waitingBox);
	  };

	  // class Waiting {
	  //     constructor(container) {
	  //         var container = getTarget(container) || document.body;
	  //         var box = container.querySelector('.PCwaiting');
	  //         if (!box) {
	  //             var div = document.createElement('div');
	  //             div.className = 'PCwaiting local';
	  //             box = div;
	  //             if (!container) {
	  //                 div.style.position = 'fixed';
	  //             }
	  //             var style = document.createElement('style');
	  //             style.innerHTML = ".PCwaiting{position:absolute;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,.5);z-index:8888}.PCwaiting.local{left:50%;top:36%;width:52px;height:50px;margin-left:-25px;border-radius:3px;}.PCwaiting:after {content: ''; position: absolute; top: 50%; left: 50%; width: 3px; height: 3px; margin-top: -2px; margin-left: -2px; text-align: center; -webkit-border-radius: 100%; border-radius: 100%; box-shadow:0 0 3px; -webkit-transition: all, 0.3s, linear; transition: all, 0.3s, linear; -webkit-animation: am-wait 1.2s linear infinite; animation: am-wait 1.2s linear infinite;box-shadow:0 -10px 0 1px #eee, 10px 0px #eee, 0 10px #eee, -10px 0 #eee, -7px -7px 0 0.5px #eee, 7px -7px 0 0.5px #eee, 7px 7px #eee, -7px 7px #eee }@-webkit-keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}}@keyframes am-wait {100% {-webkit-transform: rotate(1turn);transform: rotate(1turn);}";
	  //             box.appendChild(style);
	  //             // container.appendChild(w);
	  //         }
	  //         this.waitingContainer = container;
	  //         if(container.tagName==='BODY'){
	  //              box.style.position='fixed';
	  //              }
	  //         this.waitingBox = box;
	  //     }

	  //     show() {
	  //         this.waitingContainer.appendChild(this.waitingBox);
	  //         return this;
	  //     }

	  //     hide() {
	  //         this.waitingBox.parentNode == this.waitingContainer && this.remove();
	  //         return this;
	  //     }
	  //     remove() {
	  //         this.waitingContainer.removeChild(this.waitingBox);
	  //     }
	  // }

	  var exportObj = {
	    entity: '',
	    select: function select(container) {
	      return new Waiting(container);
	    },
	    show: function show(container) {
	      this.entity = new Waiting(container).show();
	    },
	    hide: function hide() {
	      this.entity && this.entity.hide();
	    }
	  };

	  ( false ? 'undefined' : _typeof(module)) === 'object' && module.exports ? module.exports = exportObj :  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return exportObj;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.waiting = exportObj;
	})(window, document);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },

/***/ 18:
/***/ function(module, exports) {

	'use strict';

	$.fn.sliding = function () {
	  this.on('click', '.prev,.next', function () {
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
	        setTimeout(function () {
	          $list.animate({
	            left: l
	          }, 300, function () {
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
	        setTimeout(function () {
	          $list.animate({
	            left: 0
	          }, 300, function () {
	            $t.data('sliding', 0);
	          });
	        }, 300);
	        return;
	      }
	      l += w;
	    }
	    $list.animate({
	      left: l
	    }, function () {
	      $t.data('sliding', 0);
	    });
	  });
	  return this;
	};

/***/ }

/******/ });