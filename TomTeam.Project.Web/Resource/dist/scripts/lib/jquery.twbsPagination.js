/*
 * jQuery Bootstrap Pagination v1.3.1
 * https://github.com/esimakin/twbs-pagination
 *
 * Copyright 2014-2015 Eugene Simakin <eugenesimakin@mail.ru>
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 * Modified by zlb 2016-04-20
 * Add goto page function and split the page
 */
var pagination = function($, window, document, undefined) {

  'use strict';

  var old = $.fn.twbsPagination;

  // PROTOTYPE AND CONSTRUCTOR

  var TwbsPagination = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

    if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
      throw new Error('Start page option is incorrect');
    }

    this.options.totalPages = parseInt(this.options.totalPages);
    if (isNaN(this.options.totalPages)) {
      throw new Error('Total pages option is not correct!');
    }

    this.options.visiblePages = parseInt(this.options.visiblePages);
    if (isNaN(this.options.visiblePages)) {
      throw new Error('Visible pages option is not correct!');
    }

    if (this.options.totalPages < this.options.visiblePages) {
      this.options.visiblePages = this.options.totalPages;
    }

    if (this.options.onPageClick instanceof Function) {
      this.$element.first().on('page', this.options.onPageClick);
    }

    if (this.options.href) {
      var match, regexp = this.options.href.replace(/[-\/\\^$*+?.|[\]]/g, '\\$&');
      regexp = regexp.replace(this.options.hrefVariable, '(\\d+)');
      if ((match = new RegExp(regexp, 'i').exec(window.location.href)) != null) {
        this.options.startPage = parseInt(match[1], 10);
      }
    }

    var tagName = (typeof this.$element.prop === 'function') ?
      this.$element.prop('tagName') : this.$element.attr('tagName');

    if (tagName === 'UL') {
      this.$listContainer = this.$element;
    } else {
      this.$listContainer = $('<ul></ul>');
    }

    this.$listContainer.addClass(this.options.paginationClass);

    this.$go = $('<ul class="page-go" style="position:absolute;margin-left:30px;"/>');


    if (tagName !== 'UL') {
      this.$element.append(this.$listContainer);
      if (this.options.goVal) {
        this.$go.addClass(this.options.paginationClass).html('<li><input type="number" style="width:4em"/><a class="btn" style="float:none;">' + this.options.goVal + '</a></li>');
        this.$element.append(this.$go);
      }
    }

    this.render(this.getPages(this.options.startPage));
    this.setupEvents();

    if (this.options.initiateStartPageClick) {
      this.$element.trigger('page', this.options.startPage);
    }

    return this;
  };

  TwbsPagination.prototype = {

    constructor: TwbsPagination,

    destroy: function() {
      this.$element.empty();
      this.$element.removeData('twbs-pagination');
      this.$element.off('page');

      this.$element.find('input,.btn,select').each(function() {
        $(this).off();
      });
      return this;
    },

    show: function(page) {
      if (page < 1 || page > this.options.totalPages) {
        throw new Error('Page is incorrect.');
      }
      this.render(this.getPages(page));
      this.setupEvents();

      this.$element.trigger('page', page);

      return this;
    },

    buildListItems: function(pages) {
      var listItems = [];
      var isSplitShow = this.options.totalPages > this.options.visiblePages;
      // if (this.options.first) {
      //     listItems.push(this.buildItem('first', 1));
      // }

      if (this.options.prev) {
        var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages : 1;
        listItems.push(this.buildItem('prev', prev));
      }

      listItems.push(this.buildItem('page', 1));

      if (isSplitShow && pages.numeric[0] > 1) {
        listItems.push(this.buildItem('split'), '');
      }

      for (var i = 1; i < pages.numeric.length - 1; i++) {
        listItems.push(this.buildItem('page', pages.numeric[i]));
      }

      if (isSplitShow && pages.numeric[i] < this.options.totalPages) {
        listItems.push(this.buildItem('split'), '');
      }

      this.options.totalPages > 1 && listItems.push(this.buildItem('page', this.options.totalPages));

      if (this.options.next) {
        var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
        listItems.push(this.buildItem('next', next));
      }

      //项目规范，注释掉首尾页显示了，
      // if (this.options.last) {
      //     listItems.push(this.buildItem('last', this.options.totalPages));
      // }

      return listItems;
    },

    buildItem: function(type, page) {
      var $itemContainer = $('<li></li>'),
        $itemContent = $('<a></a>'),
        itemText = null;

      switch (type) {
        case 'split':
          itemText = this.options.split;
          $itemContainer.addClass(this.options.splitClass);
          break;
        case 'page':
          itemText = page;
          $itemContainer.addClass(this.options.pageClass);
          break;
        case 'first':
          itemText = this.options.first;
          $itemContainer.addClass(this.options.firstClass);
          break;
        case 'prev':
          itemText = this.options.prev;
          $itemContainer.addClass(this.options.prevClass);
          break;
        case 'next':
          itemText = this.options.next;
          $itemContainer.addClass(this.options.nextClass);
          break;
        case 'last':
          itemText = this.options.last;
          $itemContainer.addClass(this.options.lastClass);
          break;
        default:
          break;
      }

      $itemContainer.data('page', page);
      $itemContainer.data('page-type', type);
      if (type !== 'split') {
        $itemContainer.append($itemContent.attr('href', this.makeHref(page)).html(itemText));
      } else {
        $itemContainer = $('<li class="split" style="padding:0;vertical-align:middle;"><a style="min-width:auto;padding:10px 0 0;border:0;margin:0 8px;line-height:1;color:#333;background:#fff">...</a></li>');
        // $itemContainer.append(itemText);
      }

      return $itemContainer;
    },

    getPages: function(currentPage) {
      var pages = [];

      var half = Math.floor(this.options.visiblePages / 2);
      var start = currentPage - half + 1 - this.options.visiblePages % 2;
      var end = currentPage + half;

      // handle boundary case
      if (start <= 0) {
        start = 1;
        end = this.options.visiblePages;
      }
      if (end > this.options.totalPages) {
        start = this.options.totalPages - this.options.visiblePages + 1;
        end = this.options.totalPages;
      }

      var itPage = start;
      while (itPage <= end) {
        pages.push(itPage);
        itPage++;
      }

      return { 'currentPage': currentPage, 'numeric': pages };
    },

    render: function(pages) {
      var _this = this;
      this.$listContainer.children().remove();
      this.$listContainer.append(this.buildListItems(pages));

      this.$listContainer.children().each(function() {
        var $this = $(this),
          pageType = $this.data('page-type');

        switch (pageType) {
          case 'page':
            if ($this.data('page') === pages.currentPage) {
              $this.addClass(_this.options.activeClass);
            }
            break;
          case 'first':
            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
            break;
          case 'last':
            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
            break;
          case 'prev':
            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
            break;
          case 'next':
            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === _this.options.totalPages);
            break;
          case 'split':
            break;
          default:
            break;
        }

      });
    },

    setupEvents: function() {
      var _this = this;

      this.$listContainer.find('li').each(function() {
        var $this = $(this);
        $this.off();
        if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
          $this.on('click', false);
          return;
        }
        $this.click(function(evt) {
          // Prevent click event if href is not set.
          !_this.options.href && evt.preventDefault();

          parseInt($this.data('page')) && _this.show(parseInt($this.data('page')));
        });
      });

      //Add jump method
      if (this.options.goVal) {
        _this.$go.find('input,.btn').each(function() {
          $(this).off();
        });
        this.$go.find('.btn').click(function() {
          var $this = $(this);
          var pageGo = parseInt(_this.$go.find('input').val());
          if (pageGo > 0 && pageGo <= _this.options.totalPages) {
            _this.show(pageGo);
            _this.$go.find('input').val(pageGo);
          } else {
            _this.$go.find('input').addClass('error').focus();
          }
        });
        this.$go.find('input').keydown(function(e) {
          var $this = $(this);
          $this.removeClass('error');
          if (13 == e.keyCode) {
            _this.$go.find('.btn').click();
          }
        }).blur(function() {
          $(this).removeClass('error');
        });
      }
    },

    makeHref: function(c) {
      return this.options.href ? this.options.href.replace(this.options.hrefVariable, c) : 'javascript:;';
    }

  };

  // PLUGIN DEFINITION

  $.fn.twbsPagination = function(option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var methodReturn;

    var $this = $(this);
    var data = $this.data('twbs-pagination');
    var options = typeof option === 'object' && option;

    if (!data) {
      $this.data('twbs-pagination', (data = new TwbsPagination(this, options)));
    } else {
      data.destroy();
      var newOpts = $.extend({}, data.options, options)
      $this.data('twbs-pagination', (data = new TwbsPagination(this, newOpts)));
    }
    if (typeof option === 'string') methodReturn = data[option].apply(data, args);

    return (methodReturn === undefined) ? $this : methodReturn;
  };

  $.fn.twbsPagination.defaults = {
    totalPages: 0,
    startPage: 1,
    visiblePages: 5,
    initiateStartPageClick: true,
    href: false,
    hrefVariable: '{{number}}',
    first: false,
    prev: 'Prev',
    next: 'Next',
    last: false,
    goVal: 'Go',
    loop: false,
    onPageClick: null,
    paginationClass: 'pagination',
    nextClass: 'next',
    prevClass: 'prev',
    lastClass: 'last',
    firstClass: 'first',
    pageClass: 'page',
    pageSize: 10,
    activeClass: 'active',
    disabledClass: 'disabled',
    split: '...',
    splitClass: 'split'
  };

  $.fn.twbsPagination.Constructor = TwbsPagination;

  $.fn.twbsPagination.noConflict = function() {
    $.fn.twbsPagination = old;
    return this;
  };
};
pagination(window.jQuery, window, document);
typeof module == 'object' && module.exports ? module.exports = pagination(window.jQuery, window, document) : '';
