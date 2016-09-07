  define(function (require, exports, module) {
    /**
     * @module basic
     * @requires
     */
    'use strict';
    var Basic = {
      initialize: function () {
        var _self = this;
        window.onresize = _self._setHeight();
        console.info(_self);
        _self._beautify();
        _self._setHeight();
        _self._uEditor();
      },
      _beautify: function () {
        /* tooltip*/
        $("[data-toggle='tooltip']").tooltip();
        /*鼠标经过图片显示标题和编辑按钮*/
        $('#picWrapper .con-left-bd-main-box li').hover(function () {
          $(this).find('.img-mask').css('display', 'table');
        }, function () {
          $(this).find('.img-mask').css('display', 'none');
        });
        /* 美化滚动条*/
        $('#pane1').niceScroll({
          cursorcolor: "#ccc", //#CC0071 光标颜色
          cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
          touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
          cursorwidth: "5px", //像素光标的宽度
          cursorborder: "0", //   游标边框css定义
          cursorborderradius: "5px", //以像素为光标边界半径
          autohidemode: false //是否隐藏滚动条
        });
        /*颜色选择器*/
        $("#pickaColor").pickAColor({
          showSpectrum: true,
          showSavedColors: true,
          saveColorsPerElement: true,
          fadeMenuToggle: true,
          showAdvanced: true,
          showBasicColors: true,
          showHexInput: true,
          allowBlank: true,
          inlineDropdown: true
        });
      },
      /*动态设置高度*/
      _setHeight: function () {
        var winHeight = $(window).height();
        var headerHeight = $('.header').height();
        var footerHeight = $('.footer').height();
        var conHeight = winHeight - headerHeight - footerHeight;
        $('#container').height(conHeight - 10);
        $('.con-left-nav').height($('#container').height() - 20);
        $('#picWrapper').height($('#container').height() - $('.con-left-bd-main-nav').outerHeight(true));
        $('#pane1').height($('#container').height());
        $('.con-right').height($('#container').height());
        /*   $('#edui1_iframeholder').height($('#container').height() - $('#edui1_toolbarbox').height() - $('#edui1_bottombar').height());*/
      },
      /*实例化编辑器*/
      _uEditor: function () {
        var ue = UE.getEditor('rightContent', {
          toolbars: [
            ['undo', 'redo']
          ],
          autoHeightEnabled: true,
          autoFloatEnabled: true
        });
      }
    }

    module.exports = Basic;
  });
