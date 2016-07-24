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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(loading) {'use strict';

	var _cutstring = __webpack_require__(3);

	var _cutstring2 = _interopRequireDefault(_cutstring);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//对话框
	// var dialog = require('dialog');

	// dialog({
	//     skin:'mini',
	//     content:"你好",
	//     ok:function(){}
	// }).showModal();

	var pb = __webpack_require__(5);
	pb.show();
	setTimeout(function () {
		pb.hide();
	}, 1000);

	//1、请求等待动画，show的参数为容器，默认body节点
	var waiting = __webpack_require__(6);
	waiting.show();

	setTimeout(function () {
		waiting.hide();
	}, 2500);

	//情形2，实例化一个新class，使用select方法
	var w2 = waiting.select('.main');
	w2.show();
	setTimeout(function () {
		w2.hide();
	}, 5000);

	console.log((0, _cutstring2.default)('df夺夺dfd', 16));

	// var w2= waiting.show('.wrapper');
	// setTimeout(function(){
	//     w2.hide();
	// },6000)

	//各类校验
	var validator = __webpack_require__(7);

	console.log(validator.isEmpty(3, '3434afdf', '    '));
	//手机端弹窗
	// var popup=require('popupMobile');
	// popup({
	//  title:'提示',
	//  content:'你好啊',
	//  ok:function(){
	//      alert('ok')
	//  }

	// })

	//标签切换
	__webpack_require__(8);

	//全选功能
	__webpack_require__(9);

	// import al from 'alert.js';
	// al(3)

	//小标签选择弹窗
	// $('[data-dialog-content]').on('click', function() {
	//     var $t = $(this),
	//         dialog_content = $t.data('dialogContent'),
	//         dialog_title = $t.data('dialogTitle');
	//     var d = dialog({
	//         title: dialog_title,
	//         onshow: function() {
	//             //分页，后台来时删除库及本段代码
	//             $('.user-selected-pagination').twbsPagination({
	//                 totalPages: 15,
	//                 visiblePages: 5,
	//                 prev: '<',
	//                 next: '>',
	//                 onPageClick: function(event, page) {
	//                     $('#page-content').text('Page ' + page);
	//                 }
	//             });
	//         },
	//         cancel: function() {
	//             // alert('h')
	//         },
	//         cancelDisplay: false
	//     });
	//     d.content($('.popup-html').find('.' + dialog_content).html()).showModal();
	// });

	//顶部提示的，目前只有红色框
	var showTipsOnTop = __webpack_require__(10);

	showTipsOnTop('未授权，请重试', '.main');

	//加载数据的操作小菊花
	var spin = __webpack_require__(12);

	var s1 = spin($('.wrapper'));
	setTimeout(function () {
		s1.stop();
	}, 2000);

	//操作提示，第二个参数为成功与失败，可传'error','false','warning'
	var showTips = __webpack_require__(14);

	// showTips('操作成功',function(){
	// 	alert('OK');
	// })

	showTips('网络错误', 'error');

	var showTipsO = __webpack_require__(15);

	showTipsO('你好，网络有点问题', 'false');

	//侧滑删除、arg1=对象,arg2=回调,arg3=方向(right,up,down),arg4=偏移距离
	var slideDel = __webpack_require__(16);

	$('.js-slide-del').on('click', function () {
		var dir = $(this).data('delDirection');
		slideDel(this, function () {
			console.log('del');
		}, dir);
		return false;
	});

	//合并对象，未深度操作
	var obj1 = {
		'name': 'JOBS',
		'job': 'CEO'
	},
	    obj2 = {
		'name': 'Bill',
		sex: 'Man'
	},
	    obj3 = {
		'age': 60,
		'eyeColor': 'Blue'
	};

	// console.log(merge(obj1, obj2, 'sss', obj3));

	//分页
	__webpack_require__(17);
	$('#pagination').twbsPagination({
		totalPages: 15,
		visiblePages: 7
	});

	//加载数据时右上角提示，可在show中加回调方法
	loading.show();
	setTimeout(function () {
		loading.hide();
	}, 3000);

	var tmpl = function tmpl(addrs) {
		return '\n<ul>\n' + addrs.map(function (addr) {
			return '<li><span>' + addr.first + '\n\t' + addr.last + '</span></li>';
		}).join('');
	};

	var a1 = [{
		first: 'Jone',
		last: 'Smith'
	}, {
		first: 'Zoe',
		last: 'Cook'
	}];

	//上传文件等操作
	var regExpFilter = /image\/(?:(?:jpe?g)|(?:gif)|(?:png))$/;

	var upload = document.querySelector('#upload');
	document.querySelector('.btn-upload').addEventListener('click', function () {
		upload.click();
	}, false);
	upload.addEventListener('change', function () {
		var files = this.files;
		if (files.length < 1) {
			return;
		}
		var imgList = '';
		Array.from(files).forEach(function (el, index) {
			if (!regExpFilter.test(el.type)) {
				console.warn(el.name + '的格式不对，请重新上传');
				return;
			}
			var oFReader = new FileReader();
			oFReader.onload = function (oFREvent) {
				// document.querySelector('.preview').src=oFREvent.target.result;
				imgList += '<img src="' + oFREvent.target.result + '">';
				document.querySelector('#output').innerHTML = imgList;
			};
			oFReader.readAsDataURL(el);
		});
	}, false);

	function handleFileSelect(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		var files = evt.dataTransfer.files;
		var output = [];
		for (var i = 0, f; f = files[i]; i++) {
			output.push('<div>' + f.name + '.' + f.type + '-' + f.size + '</div>');
		}
		document.querySelector('#output').innerHTML = output.join('');
	}
	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy';
	}
	var dropZone = document.querySelector('#dragZone');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);

	document.querySelector('#iptSelect').addEventListener('select', function (e) {
		console.log(e);
	});

	//预览
	(function ($) {
		$.fn.jsPreview = function (container) {
			container = document.querySelector(container) || document.body;
			var imgUrl = this.data('src'),
			    alt = this.data('imgAlt');
			var mask = document.createElement('div');
			mask.style = 'position:fixed;left:0;right:0;top:0;bottom:0;text-align:center;padding:20px;background:rgba(0,0,0,.5);z-index:5';
			mask.innerHTML = '<img style="position:absolute;left:50%;top:50%;max-height:100%;max-width: 90%;transform:translate(-50%,-50%);" src="' + imgUrl + '" alt="' + alt + '" title="' + alt + '">';
			container.appendChild(mask);
			mask.addEventListener('click', function () {
				container.removeChild(mask);
			}, false);
			return this;
		};
		$('body').on('click', '.js-preview-img', function () {
			$(this).jsPreview();
		});
	})(jQuery);

	//通用计数
	$('body').on('input', '.js-count .js-count-for', function () {
		var $t = $(this);
		$t.closest('.js-count').find('.count').text($t.val().length);
	});

	//拖动部分事件处理写法
	var colsDrag = document.querySelector('#drag').querySelectorAll('.item');
	var dragSrcEl = '';
	var Drag = {
		evtList: ['dragstart', 'dragover', 'dragleave', 'dragenter', 'dragend', 'dragexit', 'drop'],
		handle: {
			dragstart: function dragstart(e) {
				this.style.opacity = 0.5;
				dragSrcEl = this;
				e.dataTransfer.effectAllowed = 'move';
				e.dataTransfer.setData('text/html', this.innerHTML);
			},
			dragenter: function dragenter(e) {
				this.classList.add('over');
			},
			dragleave: function dragleave(e) {
				this.classList.remove('over');
			},
			dragover: function dragover(e) {
				if (e.preventDefault) {
					e.preventDefault();
				}
				e.dataTransfer.dropEffect = 'move';
				return false;
			},
			dragend: function dragend(e) {
				this.style.opacity = 1;
				[].forEach.call(colsDrag, function (el) {
					el.classList.remove('over');
				});
			},
			drop: function drop(e) {
				if (e.stopPropagation) {
					e.stopPropagation();
				}
				if (dragSrcEl != this) {
					dragSrcEl.innerHTML = this.innerHTML;
					this.innerHTML = e.dataTransfer.getData('text/html');
				}
				return false;
			}
		}
	};

	[].forEach.call(colsDrag, function (el) {
		Drag.evtList.forEach(function (evt) {
			el.addEventListener(evt, Drag.handle[evt], false);
		});
	});

	var superPow = function superPow(a, b) {
		if (a && b) {
			var base = parseInt(a);
			if (base > 0) {
				if (base == 1) {
					console.log(1);
					return 1;
				}
				if (Array.isArray(b)) {
					var power = parseInt(b.join(''));
					if (power >= 0) {
						while (--power > 0) {
							a *= base;
						}
					} else {
						consle.warn('Arg b is not an array of pure number');
					}
					console.log(a);
					return a;
				} else {
					console.warn('Args b is required an array');
				}
			} else {
				console.warn('The first arg is required a number');
			}
		} else {
			console.warn('Two args required');
		}
	};
	superPow(2, [1, 0]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * 右上角加载提示，loading.show('可选内容',可选回调方法)，结束时loading.hide();
	 * @author Zhao Liubin
	 * @date   2016-06-03
	 * @return {[type]}
	 */
	;
	(function (window, document) {
	  function Constructor(content, callback) {
	    var content1 = typeof content === 'string' ? content : '数据加载中，请稍等...';
	    var box = document.createElement('div');
	    box.innerHTML = content1;
	    box.style.cssText = 'position:fixed;right:4px;top:0;padding:3px 4px;line-height:1;color:#fff;background-color:#fb6361;z-index:5;';
	    document.body.appendChild(box);
	    this.loadingBox = box;
	    this.loadingEndCallback = typeof content === 'function' ? content : callback;
	  }
	  Constructor.prototype.hide = function () {
	    document.body.removeChild(this.loadingBox);
	    typeof this.loadingEndCallback === 'function' && this.loadingEndCallback();
	  };

	  var exportObj = {
	    entity: '',
	    show: function show(content, callback) {
	      this.entity = new Constructor(content, callback);
	    },
	    hide: function hide() {
	      this.entity.hide();
	    }
	  };

	  ( false ? 'undefined' : _typeof(module)) === 'object' && module.exports ? module.exports = exportObj :  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return exportObj;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.loading = exportObj;
	})(window, document);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);

	module.exports = function (string, len) {
	  if (!len || string.UTFlength < len) {
	    return string;
	  }
	  var arrStr = string.split('');
	  var i = 0,
	      count = 0;
	  for (i; i < arrStr.length; i++) {
	    if (arrStr[i].UTFlength > 1) {
	      count += 2;
	    } else count++;
	    if (count > len) {
	      return arrStr.slice(0, i).join('');
	    } else if (count === len) {
	      return arrStr.slice(0, i + 1).join('');
	    }
	  }
	}; /**
	    * 截取字符串长度，包括中文
	    * @author Zhao Liubin
	    * @date   2016-06-13
	    */

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 在String原型上添加一个UTFlength属性，获取中文实际长度
	 * @date  2016-06-06
	 * @author  Zhao Liubin
	 */

	module.exports = function () {
	  // String.prototype.getUTFLength = function() {
	  //   return this.replace(/[\u4E00-\u9FA5]/g, 'zz').length;
	  // }

	  Object.defineProperty(String.prototype, 'UTFlength', {
	    get: function get() {
	      return this.replace(/[\u4E00-\u9FA5]/g, 'zz').length;
	    }
	  });
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 加载数据进度条，前进度是模拟，用法 progressBar.show(color,initWidth(%));
	 * @date   2016-07-08
	 * @return {[type]}
	 */
	(function () {
	  function P(color, initWidth) {
	    this.color = color;
	    this.width = initWidth;
	  }
	  P.prototype.show = function () {
	    var progress = document.createElement('div');
	    progress.style = 'position:fixed;left:0;top:0;height:2px;width:0;color:#999;background:#FB6362;transition:.5s;transform:top;box-shadow:0 0 5px;will-change:transform;z-index:8888;';
	    if (this.color) {
	      progress.style.background = this.color;
	    }
	    progress.innerHTML = '<style>@keyframes pBlink{0{box-shadow:none;}100%{box-shadow:0 0 3px}}</style><span style="position:absolute;right:0;top:0;bottom:0;width:50px;background: inherit;animation: pBlink 1s infinite alternate;"></span>';
	    document.body.appendChild(progress);
	    var width = this.width || '30%';
	    setTimeout(function () {
	      progress.style.width = width;
	    }, 4);
	    this.bar = progress;
	    return this;
	  };
	  P.prototype.hide = function () {
	    this.bar.style.width = '100%';
	    var that = this;
	    setTimeout(function () {
	      that.bar.style.boxShadow = 'none';
	      that.bar.style.transform = 'scaleY(1.2)';
	      setTimeout(function () {
	        that.bar.style.transform = 'scaleY(0)';
	      }, 300);
	    }, 10);
	    setTimeout(function () {
	      document.body.removeChild(that.bar);
	    }, 1000);
	  };
	  var objExports = {
	    entity: '',
	    show: function show(color, initWidth) {
	      this.entity = new P(color, initWidth).show();
	      return this.entity;
	    },
	    hide: function hide() {
	      this.entity.hide();
	    }
	  };
	  module.exports = objExports;
	})();

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * 一些校验数据的方法集合
	 * @author Zhao Liubin
	 * @type {Object}
	 */
	module.exports = function () {
	  var _regExp = {
	    empty: /^\s*$/,
	    phone: /^1\d{10}$/,
	    email: /^\w+[\w-+.]*@[\w-]+(\.[\w-])+$/,
	    moneyFormat: /^\d+(\.\d{1,2})?$/,
	    integer: /^\d+$/,
	    illegal: /[<>]/,
	    percent: /^0$|^[1-9]\d?$|^100$/
	  };

	  function _check(pattern) {
	    return function (arg) {
	      return pattern.test(arg);
	    };
	  }
	  return {
	    isEmpty: function isEmpty() {
	      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
	        arg[_key] = arguments[_key];
	      }

	      return arg.some(function (el) {
	        return _check(_regExp.empty)(el);
	      });
	    },
	    isNotPhone: function isNotPhone(arg) {
	      return !_check(_regExp.phone)(arg);
	    },
	    isNotEmail: function isNotEmail(arg) {
	      return !_check(_regExp.email)(arg);
	    },
	    isNotMoneyFormat: function isNotMoneyFormat(arg) {
	      return !_check(_regExp.moneyFormat)(arg);
	    },
	    isNotInteger: function isNotInteger(arg) {
	      return !_check(_regExp.integer)(arg);
	    },
	    isIllegal: function isIllegal(arg) {
	      return _check(_regExp.illegal)(arg);
	    },
	    isNotPercent: function isNotPercent() {
	      for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        arg[_key2] = arguments[_key2];
	      }

	      return !arg.every(function (el) {
	        return _check(_regExp.percent)(el);
	      });
	    },
	    mySelf: function mySelf(arg, regExp) {
	      return _check(regExp)(arg);
	    }
	  };
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 标签及单选之类切换，需要对应DOM结构
	 * @author Zhao Liubin
	 * @date   2016-05-19
	 * @param  {[type]}
	 * @return {[type]}
	 */
	module.exports = function ($) {
	  if (!$) {
	    console.warn('需要jQuery赞助哦');
	    return;
	  }

	  $('.js-switcher').children('.title').children('.item').on('click', function () {
	    var $t = $(this),
	        index = $t.closest('.title').children('.item').index(this);
	    $t.addClass('on').siblings('.item').removeClass('on').closest('.js-switcher').children('.content').children('.item').removeClass('on').eq(index).addClass('on');
	  });
	}(jQuery);

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 全部选中方法，对应一个顶层的class:chks,
	 * 全选class:chks,子checkbox的class:chk
	 * @author Zhao Liubin
	 * @date   2016-05-19
	 * @param  {[type]}
	 * @return {[type]}
	 */
	module.exports = function ($) {
	  if (!$) {
	    console.warn('需要jQuery赞助哦');
	    return;
	  }
	  $('.chks').on('change', '.chk-all', function () {
	    $(this).closest('.chks').find('.chk').prop('checked', this.checked);
	  }).on('change', '.chk:not(.chk-all)', function () {
	    var $chks = $(this).closest('.chks');
	    if (!this.checked) {
	      $chks.find('.chk-all').prop('checked', false);
	      return;
	    }
	    $chks.find('.chk-all').prop('checked', $chks.find('.chk:not(".chk-all")').length === $chks.find(':checked').length);
	  });
	}(jQuery);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(getTarget) {'use strict';

	/**
	 * 顶部提示
	 * @author Zhao Liubin
	 * @date   2016-05-19
	 * @param  {提示信息}
	 * @param  {作用目标}
	 * @param  {可能需要自动删除倒计时间}
	 * @return {[type]}
	 */
	var showTipsOnTop = function showTipsOnTop() {
	  var content = arguments.length <= 0 || arguments[0] === undefined ? '小提示' : arguments[0];
	  var target = arguments[1];
	  var time = arguments[2];

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
	    setTimeout(function () {
	      tar.removeChild(div);
	    }, t);
	  }
	};
	module.exports = showTipsOnTop;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * 获取目标节点，真实的，非jQuery
	 * @author Zhao Liubin
	 * @date   2016-05-19
	 * @param  {jQuery obj || DOM || String}
	 * @return {[type]}
	 */
	module.exports = function (target) {
	  if (target) {
	    if (typeof target == 'string') {
	      return document.querySelector(target);
	    } else if (target.nodeName) {
	      return target;
	    } else {
	      return target[0];
	    }
	  } else {
	    return '';
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(getTarget) {'use strict';

	/**
	 * 加载等待小菊花，封装进一个对象，不用new 构造了
	 * @author  Zhao Liubin
	 * @type {[type]}
	 */
	var Spinner = __webpack_require__(13);

	var spinOpts = {
	  defaultOpt: {
	    lines: 10 // The number of lines to draw

	    , length: 3 // The length of each line

	    , width: 2 // The line thickness

	    , radius: 3 // The radius of the inner circle

	    , scale: 1 // Scales overall size of the spinner

	    , corners: 1 // Corner roundness (0..1)

	    , color: '#333' // #rgb or #rrggbb or array of colors

	    , opacity: 0.25 // Opacity of the lines

	    , rotate: 0 // The rotation offset

	    , direction: 1 // 1: clockwise, -1: counterclockwise

	    , speed: 1 // Rounds per second

	    , trail: 50 // Afterglow percentage

	    , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS

	    , zIndex: 2e9 // The z-index (defaults to 2000000000)

	    , className: 'spinner' // The CSS class to assign to the spinner

	    , top: '50%' // Top position relative to parent

	    , left: '50%' // Left position relative to parent

	    , shadow: false // Whether to render a shadow

	    , hwaccel: false // Whether to use hardware acceleration

	    , position: 'absolute' // Element positioning
	  },
	  _getLoadMore: function _getLoadMore() {},
	  loadMore: function loadMore() {
	    var o = Object.create(this.defaultOpt);
	    o.className = 'spinner-loadmore';
	    return o;
	  }
	};

	function SPIN(target, spinType) {
	  if (typeof Spinner !== 'function') {
	    console.warn('需要引入spin.js哦');
	    return;
	  }
	  this.init(target, spinType);
	  return this.spinner;
	}
	SPIN.prototype.init = function (target, spinType) {
	  this.target = getTarget(target);
	  if (!this.target) {
	    return;
	  }
	  this.spinOpt = spinType ? spinOpts[spinType]() : spinOpts.defaultOpt;
	  this.target.classList.add(this.spinOpt.className);
	  this.spinner = new Spinner(this.spinOpt).spin(this.target);
	};
	SPIN.prototype.stop = function () {
	  if (!this.target) {
	    return;
	  }
	  this.target.classList.remove(this.spinOpt.className);
	  this.spinner.stop();
	};

	module.exports = function (target, spinType) {
	  return new SPIN(target, spinType);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// http://spin.js.org/#v2.3.2
	!function(a,b){"object"==typeof module&&module.exports?module.exports=b(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):a.Spinner=b()}(this,function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(k.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",k.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;if(b=b.charAt(0).toUpperCase()+b.slice(1),void 0!==e[b])return b;for(d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}k.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.scale*d.width,left:d.scale*d.radius,top:-d.scale*d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.scale*(d.length+d.width),k=2*d.scale*j,l=-(d.width+d.length)*d.scale*2+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k,l=["webkit","Moz","ms","O"],m={},n={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"};if(h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c=this,d=c.opts,f=c.el=a(null,{className:d.className});if(e(f,{position:d.position,width:0,zIndex:d.zIndex,left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.scale*(f.length+f.width)+"px",height:f.scale*f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.scale*f.radius+"px,0)",borderRadius:(f.corners*f.scale*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.scale*f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),"undefined"!=typeof document){k=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}();var o=e(a("group"),{behavior:"url(#default#VML)"});!d(o,"transform")&&o.adj?i():j=d(o,"animation")}return h});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * 操作提示，需要进一步封装为成功或失败方法，模块化
	 * 使用方法：require或Webpack，单独使用时：showTipsState('操作成功',function(){}),showTipsState('操作失败','error',function(){})
	 * @author  Zhao Liubin
	 * @type {[type]}
	 */

	(function () {
	  var showTips = function showTips(content, state, callback, time) {
	    content = content || '操作成功';
	    time = parseInt(time) || 2500;
	    var box = document.createElement('div');
	    var styleBox = 'position: fixed;top: 40%;left: 50%;min-width:150px;max-width:300px;padding: 1em 2em;border: 1px solid;font-size:12px;line-height: 1.5;text-align: center;color: #1fb5ac;background: #fff;-webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;z-index: 1028;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%) rotateX(90deg);transition:.35s;opacity:0;will-change:transform;';
	    box.style.cssText = styleBox;
	    box.classList.add('tips-state');

	    var htmlIcon = '<span style="display: inline-block;width: 28px;margin-top: 4px;margin-bottom: 8px;border: 1px solid;font-size: 24px;line-height: 26px;font-family:sans-serif;-webkit-border-radius: 100%;border-radius: 100%;">';
	    if (state === 'cancel' || state === 'error') {
	      box.style.color = '#fb6363';
	      htmlIcon += '!</span>';
	    } else {
	      htmlIcon += '&#x2713</span>';
	    }

	    box.innerHTML = htmlIcon + '<div>' + content + '</div>';
	    document.body.appendChild(box);
	    setTimeout(function () {
	      box.style.transform = 'translate(-50%,-50%) rotateX(0)';
	      box.style.opacity = 0.95;
	    }, 30);

	    // var opDef=0,deg=95;
	    // var rotateShow=function(){
	    //     opDef+=0.05,deg-=5;
	    //     box.style.transform='translate(-50%,-50%) rotateX('+deg+'deg)';
	    //     box.style.opacity=opDef;
	    //     if(opDef<0.95){
	    //         requestAnimationFrame(rotateShow);
	    //     }
	    // }
	    // requestAnimationFrame(rotateShow);

	    var _close = function _close() {
	      document.body.removeChild(box);
	    };

	    setTimeout(function () {
	      box.style.transform = 'translate(-50%,-50%) rotateX(90deg)';
	      box.style.opacity = 0.05;
	    }, parseInt(time) - 500);
	    setTimeout(function () {
	      _close();
	      typeof state === 'function' ? state() : typeof callback === 'function' && callback();
	    }, parseInt(time));
	  };

	  var exportObj = showTips;
	  ( false ? 'undefined' : _typeof(module)) === 'object' && module.exports ? module.exports = exportObj :  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return exportObj;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.showTipsState = exportObj;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * 操作提示，需要进一步封装为成功或失败方法，模块化
	 * 使用方法：require或Webpack，单独使用时：showTipsState('操作成功',function(){}),showTipsState('操作失败','error',function(){})
	 * @author  Zhao Liubin
	 * @type {[type]}
	 */

	(function () {
	  var showTips = function showTips(content, state, callback, time) {
	    content = content || '你好';
	    time = parseInt(time) || 2500;
	    var box = document.createElement('div');
	    var styleBox = 'position: fixed;bottom: 30%;left: 50%;min-width:100px;max-width:300px;padding: 0.5em 1em;font-size:12px;line-height: 1.5;text-align: center;color: #fff;background:#777;background: rgba(0,0,0,0.5);border-radius: 1px;z-index: 1028;-webkit-transform: translate(-50%,-50%);transform: translate(-50%,-50%);transition:.35s;opacity:0;will-change:transform;';
	    box.style.cssText = styleBox;
	    box.classList.add('tips-state');

	    if (state === 'cancel' || state === 'error' || state === 'false') {
	      box.style.background = '#e77777';
	      box.style.background = 'rgba(200,0,0,0.5)';
	    }
	    box.innerHTML = '<div>' + content + '</div>';
	    document.body.appendChild(box);
	    setTimeout(function () {
	      box.style.bottom = '31%';
	      box.style.opacity = 1;
	    }, 30);

	    // var opDef=0,deg=95;
	    // var rotateShow=function(){
	    //     opDef+=0.05,deg-=5;
	    //     box.style.transform='translate(-50%,-50%) rotateX('+deg+'deg)';
	    //     box.style.opacity=opDef;
	    //     if(opDef<0.95){
	    //         requestAnimationFrame(rotateShow);
	    //     }
	    // }
	    // requestAnimationFrame(rotateShow);

	    var _close = function _close() {
	      document.body.removeChild(box);
	    };

	    setTimeout(function () {
	      box.style.opacity = 0.05;
	    }, parseInt(time) - 500);
	    setTimeout(function () {
	      _close();
	      typeof state === 'function' ? state() : typeof callback === 'function' && callback();
	    }, parseInt(time));
	  };

	  var exportObj = showTips;
	  ( false ? 'undefined' : _typeof(module)) === 'object' && module.exports ? module.exports = exportObj :  true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return exportObj;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : window.showTipsState = exportObj;
	})();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(getTarget) {'use strict';

	/**
	 * 滑动删除
	 * @author Zhao Liubin
	 * @param { target} 删除目标
	 * @param {function} 回调
	 * @type {[type]}
	 */
	var getTargets = __webpack_require__(11);

	module.exports = function () {
	  var target = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	  var callback = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	  var direction = arguments.length <= 2 || arguments[2] === undefined ? 'left' : arguments[2];
	  var distance = arguments.length <= 3 || arguments[3] === undefined ? 30 : arguments[3];

	  var target = getTarget(target);
	  if (target) {
	    var dir = '';
	    switch (direction) {
	      case 'up':
	        dir = 'translateY(-' + distance + 'px)';
	        break;
	      case 'down':
	        dir = 'translateY(' + distance + 'px)';
	        break;
	      case 'right':
	        dir = 'translateX(' + distance + 'px)';
	        break;
	      default:
	        dir = 'translateX(-' + distance + 'px)';
	        break;
	    }
	    target.style.cssText = 'transition: .3s ease;z-index:-1;transform:' + dir + ';opacity:0';
	    var _remove = function _remove() {
	      if (target.parentNode) {
	        target.parentNode.removeChild(target);
	        typeof callback === 'function' && callback.bind(target)();
	      }
	    };
	    // setTimeout(_remove, 300);
	    target.addEventListener('transitionend', _remove, false);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	var pagination=function(t,s,i,e){"use strict";var a=t.fn.twbsPagination,o=function(i,e){if(this.$element=t(i),this.options=t.extend({},t.fn.twbsPagination.defaults,e),this.options.startPage<1||this.options.startPage>this.options.totalPages)throw new Error("Start page option is incorrect");if(this.options.totalPages=parseInt(this.options.totalPages),isNaN(this.options.totalPages))throw new Error("Total pages option is not correct!");if(this.options.visiblePages=parseInt(this.options.visiblePages),isNaN(this.options.visiblePages))throw new Error("Visible pages option is not correct!");if(this.options.totalPages<this.options.visiblePages&&(this.options.visiblePages=this.options.totalPages),this.options.onPageClick instanceof Function&&this.$element.first().on("page",this.options.onPageClick),this.options.href){var a,o=this.options.href.replace(/[-\/\\^$*+?.|[\]]/g,"\\$&");o=o.replace(this.options.hrefVariable,"(\\d+)"),null!=(a=new RegExp(o,"i").exec(s.location.href))&&(this.options.startPage=parseInt(a[1],10))}var n="function"==typeof this.$element.prop?this.$element.prop("tagName"):this.$element.attr("tagName");return"UL"===n?this.$listContainer=this.$element:this.$listContainer=t("<ul></ul>"),this.$listContainer.addClass(this.options.paginationClass),this.$go=t('<ul class="page-go" style="position:absolute;margin-left:30px;"/>'),"UL"!==n&&(this.$element.append(this.$listContainer),this.options.goVal&&(this.$go.addClass(this.options.paginationClass).html('<li><input type="number" style="width:4em"/><a class="btn" style="float:none;">'+this.options.goVal+"</a></li>"),this.$element.append(this.$go))),this.render(this.getPages(this.options.startPage)),this.setupEvents(),this.options.initiateStartPageClick&&this.$element.trigger("page",this.options.startPage),this};o.prototype={constructor:o,destroy:function(){return this.$element.empty(),this.$element.removeData("twbs-pagination"),this.$element.off("page"),this.$element.find("input,.btn,select").each(function(){t(this).off()}),this},show:function(t){if(t<1||t>this.options.totalPages)throw new Error("Page is incorrect.");return this.render(this.getPages(t)),this.setupEvents(),this.$element.trigger("page",t),this},buildListItems:function(t){var s=[],i=this.options.totalPages>this.options.visiblePages;if(this.options.prev){var e=t.currentPage>1?t.currentPage-1:this.options.loop?this.options.totalPages:1;s.push(this.buildItem("prev",e))}s.push(this.buildItem("page",1)),i&&t.numeric[0]>1&&s.push(this.buildItem("split"),"");for(var a=1;a<t.numeric.length-1;a++)s.push(this.buildItem("page",t.numeric[a]));if(i&&t.numeric[a]<this.options.totalPages&&s.push(this.buildItem("split"),""),this.options.totalPages>1&&s.push(this.buildItem("page",this.options.totalPages)),this.options.next){var o=t.currentPage<this.options.totalPages?t.currentPage+1:this.options.loop?1:this.options.totalPages;s.push(this.buildItem("next",o))}return s},buildItem:function(s,i){var e=t("<li></li>"),a=t("<a></a>"),o=null;switch(s){case"split":o=this.options.split,e.addClass(this.options.splitClass);break;case"page":o=i,e.addClass(this.options.pageClass);break;case"first":o=this.options.first,e.addClass(this.options.firstClass);break;case"prev":o=this.options.prev,e.addClass(this.options.prevClass);break;case"next":o=this.options.next,e.addClass(this.options.nextClass);break;case"last":o=this.options.last,e.addClass(this.options.lastClass)}return e.data("page",i),e.data("page-type",s),"split"!==s?e.append(a.attr("href",this.makeHref(i)).html(o)):e=t('<li class="split" style="padding:0;vertical-align:middle;"><span style="min-width:auto;padding:10px 0 0;border:0;margin:0 8px;line-height:1;color:#333;">...</span></li>'),e},getPages:function(t){var s=[],i=Math.floor(this.options.visiblePages/2),e=t-i+1-this.options.visiblePages%2,a=t+i;e<=0&&(e=1,a=this.options.visiblePages),a>this.options.totalPages&&(e=this.options.totalPages-this.options.visiblePages+1,a=this.options.totalPages);for(var o=e;o<=a;)s.push(o),o++;return{currentPage:t,numeric:s}},render:function(s){var i=this;this.$listContainer.children().remove(),this.$listContainer.append(this.buildListItems(s)),this.$listContainer.children().each(function(){var e=t(this),a=e.data("page-type");switch(a){case"page":e.data("page")===s.currentPage&&e.addClass(i.options.activeClass);break;case"first":e.toggleClass(i.options.disabledClass,1===s.currentPage);break;case"last":e.toggleClass(i.options.disabledClass,s.currentPage===i.options.totalPages);break;case"prev":e.toggleClass(i.options.disabledClass,!i.options.loop&&1===s.currentPage);break;case"next":e.toggleClass(i.options.disabledClass,!i.options.loop&&s.currentPage===i.options.totalPages);break;case"split":}})},setupEvents:function(){var s=this;this.$listContainer.find("li").each(function(){var i=t(this);return i.off(),i.hasClass(s.options.disabledClass)||i.hasClass(s.options.activeClass)?void i.on("click",!1):void i.click(function(t){!s.options.href&&t.preventDefault(),parseInt(i.data("page"))&&s.show(parseInt(i.data("page")))})}),this.options.goVal&&(s.$go.find("input,.btn").each(function(){t(this).off()}),this.$go.find(".btn").click(function(){var i=(t(this),parseInt(s.$go.find("input").val()));i>0&&i<=s.options.totalPages?(s.show(i),s.$go.find("input").val(i)):s.$go.find("input").addClass("error").focus()}),this.$go.find("input").keydown(function(i){var e=t(this);e.removeClass("error"),13==i.keyCode&&s.$go.find(".btn").click()}).blur(function(){t(this).removeClass("error")}))},makeHref:function(t){return this.options.href?this.options.href.replace(this.options.hrefVariable,t):"javascript:;"}},t.fn.twbsPagination=function(s){var i,a=Array.prototype.slice.call(arguments,1),n=t(this),r=n.data("twbs-pagination"),l="object"==typeof s&&s;if(r){r.destroy();var p=t.extend({},r.options,l);n.data("twbs-pagination",r=new o(this,p))}else n.data("twbs-pagination",r=new o(this,l));return"string"==typeof s&&(i=r[s].apply(r,a)),i===e?n:i},t.fn.twbsPagination.defaults={totalPages:0,startPage:1,visiblePages:5,initiateStartPageClick:!0,href:!1,hrefVariable:"{{number}}",first:!1,prev:"Prev",next:"Next",last:!1,goVal:"Go",loop:!1,onPageClick:null,paginationClass:"pagination",nextClass:"next",prevClass:"prev",lastClass:"last",firstClass:"first",pageClass:"page",pageSize:10,activeClass:"active",disabledClass:"disabled",split:"...",splitClass:"split"},t.fn.twbsPagination.Constructor=o,t.fn.twbsPagination.noConflict=function(){return t.fn.twbsPagination=a,this}};pagination(window.jQuery,window,document),"object"==typeof module&&module.exports?module.exports=pagination(window.jQuery,window,document):"";

/***/ }
/******/ ]);