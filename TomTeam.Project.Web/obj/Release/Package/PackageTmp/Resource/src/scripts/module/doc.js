module.exports = (function() {

  //对话框
  // var dialog = require('dialog');

  // dialog({
  //     skin:'mini',
  //     content:"你好",
  //     ok:function(){}
  // }).showModal();

  //请求等待动画，show的参数为容器，此时作为构造方法
  var waiting = require('waiting');

  waiting.show();

  setTimeout(function() {
    waiting.hide();
  }, 5000);

  // var w2= waiting.show($('.wrapper'));
  // setTimeout(function(){
  //     w2.remove();
  // },6000)


  //各类校验
  var validator = require('validator');

  console.log(validator.isEmpty(3, '3434afdf', '    '))
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
  require('tabSwitcher.js');

  //全选功能
  require('checkAll.js');

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
  var showTipsOnTop = require('showTipsOnTop.js');

  showTipsOnTop('未授权，请重试', '.wrapper', 3333);

  //加载数据的操作小菊花
  var spin = require('spinZ.js');

  var s1 = spin($('.wrapper'));
  setTimeout(function() {
    s1.stop()
  }, 2000);

  //操作提示，第二个参数为成功与失败，可传'error','false','warning'
  var showTips = require('showTipsState');

  showTips('网络错误', 'error');

  //侧滑删除、arg1=对象,arg2=回调,arg3=方向(right,up,down),arg4=偏移距离
  var slideDel = require('slideDelete');

  $('.js-slide-del').on('click', function() {
    var dir = $(this).data('delDirection');
    slideDel(this, function() {
      console.log('del')
    }, dir);
    return false;
  });

  var obj1 = {
      'name': 'JOBS',
      'job': 'CEO'
    },
    obj2 = {
      'name': 'Bill',
      sex: 'Man'
    }

  console.log(merge(obj1, obj2));

})()
