(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  var $body = $('body');
  var $document = $(document);
  var Mustache = window.Mustache;
  var NAMESPACE = 'qor.selectone';
  var EVENT_CLICK = 'click.' + NAMESPACE;
  var EVENT_ENABLE = 'enable.' + NAMESPACE;
  var EVENT_DISABLE = 'disable.' + NAMESPACE;
  var CLASS_CLEAR_SELECT = '.qor-selected-many__remove';
  var CLASS_DELETED_ITEM = 'qor-selected-many__deleted';
  var CLASS_SELECT_ICON = '.qor-select__select-icon';
  var CLASS_SELECT_HINT = '.qor-selectmany__hint';
  var CLASS_PARENT = '.qor-field__mediabox';
  var CLASS_BOTTOMSHEETS = '.qor-bottomsheets';
  var CLASS_SELECTED = 'is_selected';


  function QorMediaBox(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, QorMediaBox.DEFAULTS, $.isPlainObject(options) && options);
    this.init();
  }

  QorMediaBox.prototype = {
    constructor: QorMediaBox,

    init: function () {
      this.bind();
    },

    bind: function () {
      $document.on(EVENT_CLICK, '[data-mediabox-url]', this.openBottomSheets.bind(this));
      this.$element.on(EVENT_CLICK, CLASS_CLEAR_SELECT, this.clearSelect.bind(this));
    },

    clearSelect: function (e) {
      var $target = $(e.target),
          $selectFeild = $target.closest(CLASS_PARENT);

      $target.closest('[data-primary-key]').addClass(CLASS_DELETED_ITEM);
      this.updateSelectInputData($selectFeild);

      return false;
    },

    undoDelete: function (e) {
      var $target = $(e.target),
          $selectFeild = $target.closest(CLASS_PARENT);

      $target.closest('[data-primary-key]').removeClass(CLASS_DELETED_ITEM);
      this.updateSelectInputData($selectFeild);

      return false;
    },

    openBottomSheets: function (e) {
      var $ele = $(e.target).closest('[data-mediabox-url]'),
          data = $ele.data();

      this.BottomSheets = $body.data('qor.bottomsheets');
      this.bottomsheetsData = data;

      this.$selector = $(data.selectId);
      this.$selectFeild = $ele.closest(CLASS_PARENT);

      // select many templates
      this.SELECT_MANY_SELECTED_ICON = $('[name="select-many-selected-icon"]').html();
      this.SELECT_MANY_UNSELECTED_ICON = $('[name="select-many-unselected-icon"]').html();
      this.SELECT_MANY_HINT = $('[name="select-many-hint"]').html();
      this.SELECT_MEDIABOX_TEMPLATE = $('[name="media-box-template"]').html();

      data.url = data.mediaboxUrl;

      this.BottomSheets.open(data, this.handleSelectMany.bind(this));

    },

    renderSelectMany: function (data) {
      return Mustache.render(this.SELECT_MEDIABOX_TEMPLATE, data);
    },

    renderHint: function (data) {
      return Mustache.render(this.SELECT_MANY_HINT, data);
    },

    getSelectedItemData: function() {
      var selecedItems = $(CLASS_BOTTOMSHEETS).find('.is_selected');
      return {
        selectedNum: selecedItems.size()
      };
    },

    updateHint: function (data) {
      var template;

      $.extend(data, this.bottomsheetsData);
      template = this.renderHint(data);

      $(CLASS_SELECT_HINT).remove();
      $(CLASS_BOTTOMSHEETS).find('.qor-bottomsheets__body').prepend(template);
    },

    updateSelectInputData: function ($selectFeild) {
      var $selectList = $selectFeild ?  $selectFeild : this.$selectFeild,
          $selectedItems = $selectList.find('[data-primary-key]').not('.' + CLASS_DELETED_ITEM),
          $selector = $selectFeild ? $selectFeild.find('select') : this.$selector,
          options = $selector.find('option');

      options.prop('selected', false);

      $selectedItems.each(function () {
        options.filter('[value="' + $(this).data().primaryKey + '"]').prop('selected', true);
      });
    },

    changeIcon: function ($ele, isAdd) {
      $ele.find(CLASS_SELECT_ICON).remove();

      if (isAdd) {
        $ele.find('.qor-table--medialibrary-item').prepend(this.SELECT_MANY_SELECTED_ICON);
      }

    },

    removeItem: function (data) {
      var primaryKey = data.primaryKey;

      this.$selectFeild.find('[data-primary-key="' + primaryKey + '"]').remove();
      this.changeIcon(data.$clickElement);
    },

    addItem: function (data, isNewData) {
      var $template = $(this.renderSelectMany(data)),
          $option,
          $list = this.$selectFeild.find('[data-primary-key="' + data.primaryKey + '"]');


      $template.appendTo(this.$selectFeild.find('ul'));

      this.$element.find('.qor-file__options').val(JSON.stringify(data.File));

      $template.trigger('enable');

      if (isNewData) {
        $option = $(Mustache.render(QorMediaBox.SELECT_MANY_OPTION_TEMPLATE, data));
        this.$selector.append($option);
        $option.prop('selected', true);
        this.BottomSheets.hide();
        return;
      }

      this.changeIcon(data.$clickElement, true);
    },

    handleSelectMany: function () {
      var $bottomsheets = $(CLASS_BOTTOMSHEETS),
          options = {
            formatOnSelect: this.formatSelectResults.bind(this),  // render selected item after click item lists
            formatOnSubmit: this.formatSubmitResults.bind(this)   // render new items after new item form submitted
          };

      $bottomsheets.qorSelectCore(options);
      // this.$selectFeild.append('');
    },

    formatSelectResults: function (data) {
      this.formatResults(data);
    },

    formatSubmitResults: function (data) {
      this.formatResults(data, true);
    },

    formatResults: function (data, isNewData) {
      var url = '/admin/media_libraries/' + data.primaryKey,
          $element = data.$clickElement,
          _this = this,
          formatData = data;

      if (!data.File) {
        $.getJSON(url,function(data){
          data.File = JSON.parse(data.File);
          $element.data(data);
          $.extend(formatData, data);
          _this.handleFormat(formatData, isNewData);
        });
      } else {
        _this.handleFormat(formatData, isNewData);
      }

    },

    handleFormat: function (data, isNewData) {
      var $element = data.$clickElement,
          isSelected;

      if (isNewData) {
        this.addItem(data, true);
        return;
      }

      $element.toggleClass(CLASS_SELECTED);
      isSelected = $element.hasClass(CLASS_SELECTED);

      if (isSelected) {
        this.addItem(data);
      } else {
        this.removeItem(data);
      }

      this.updateHint(this.getSelectedItemData());
      this.updateSelectInputData();

    }

  };

  QorMediaBox.SELECT_MANY_OPTION_TEMPLATE = '<option value="[[ primaryKey ]]" >[[ Name ]]</option>';

  QorMediaBox.plugin = function (options) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var fn;

      if (!data) {
        if (/destroy/.test(options)) {
          return;
        }

        $this.data(NAMESPACE, (data = new QorMediaBox(this, options)));
      }

      if (typeof options === 'string' && $.isFunction(fn = data[options])) {
        fn.apply(data);
      }
    });
  };

  $(function () {
    var selector = '[data-toggle="qor.mediabox"]';
    $(document).
      on(EVENT_DISABLE, function (e) {
        QorMediaBox.plugin.call($(selector, e.target), 'destroy');
      }).
      on(EVENT_ENABLE, function (e) {
        QorMediaBox.plugin.call($(selector, e.target));
      }).
      triggerHandler(EVENT_ENABLE);
  });

  return QorMediaBox;

});
