define(function (require, exports, module) {
  /**
   * @module modes
   * @requires
   */
  'use strict';
  var Modes = {
    /* 初始化 */
    init: function (params) {
      var _self = this;
      // 1、定义默认值
      var defaults = {
        cont_node: $('#defalutMode'),
        url_modes: "js/getModesData.json",
        url_htm: "js/getHtmData.json",
        url_html_mode:"js/getModeHtmData.json"
      };
      // 2、用入参扩展defaults
      var _params = $.extend(defaults, params);
      // 3、后台读取数据渲染出模块；
      $.ajax({
        type: "get",
        url: _params.url_modes,
        dataType: "json",
        success: function (data) {
          // 3.1、构建模块
          _self.buidModes(_params, data.modes);
          // 3.2、构建遮罩层
          _self.buidMask(_params, data.modes);
        }
      })
    },
    /* 构建模块 */
    buidModes: function (params, modes) {
      var _self = this;
      var li_html = _self.buidLisHtml(params, modes); // 构建多个li
      var ul_html = "<ul class=\"con-left-bd-main-box clearfix\">" + li_html + "</ul>";
      params.cont_node.html(ul_html);
    },
    /* 构建多个li */
    buidLisHtml: function (params, modes) {
      var _self = this;
      var lis_html = "";
      for (var i = 0; i < modes.length; i++) {
        lis_html += _self.getLiHtml(modes[i]);
      }
      return lis_html;
    },
    /* 构建单个li */
    getLiHtml: function (mode) {
      var _self = this;
      var li_html = "<li data-modeId=\"" + mode.mode_id + "\" data-modeName=\"" + mode.mode_name + "\"><div class=\"img-box\"><img src=\"" + mode.mode_img + "\" /></div></li>";
      return li_html;
    },
    /* 构建遮罩层 */
    buidMask: function (params, mode) {
      var _self = this;
      var mask = "<div class=\"img-mask\">" + "<div class=\"img-mask-box\">" + "<h3 class=\"img-mask-name\"></h3>" + "<i class=\"fa fa-file-text-o icon_edit\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"插入编辑器\"></i>" + "</div></div>";

      // 1、鼠标悬停移出效果
      $("#defalutMode>ul>li,#activityMode>ul>li").hover(function () {
        var mode_name = $(this).attr('data-modeName');
        var _this = $(this);
        _this.append(mask);
        _this.find(".img-mask-name").text(mode_name);
      }, function () {
        $(this).find(".img-mask").remove();
      });

      // 2、监听点击事件，用于点击后插入数据到uedit
      params.cont_node.find("ul.con-left-bd-main-box").on("click", ".icon_edit", function (e) {
        var mode_id = $(this).parents('li').attr('data-modeId');
        _self.insertToUedit(params, mode_id); // 插入数据到uedit
      });
    },
    /* 插入数据到uedit */
    insertToUedit: function (params, modeId) {
      // 1、ajax取出数据
      $.ajax({
        type: "get",
        // url: params.url_htm,
        url: params.url_html_mode,
        data: {"mode_id": modeId },
        dataType: "json",
        success: function (data) {
          // 2、插入uedit
          //var value = prompt('插入html代码', '');
            var iframeDom = document.getElementById("ueditor_0").contentWindow.document;
            var modes = data.modes;
            for(var i=0;i<modes.length;i++){
                var mode = modes[i];
                var mode_id = mode.mode_id;
                var code = mode.code;
                var src = mode.src;
                var css = mode.css;
                if(modeId == mode_id){
                 //加载reset css，放在整个项目的头部
                 UE.utils.loadFile(iframeDom, {
                     tag: "link",
                     rel: "stylesheet",
                     type: "text/css",
                     href: "http://feddd.me/yht/modes/mode1_header/css/reset.css"
                 });
                //加载css，放在整个项目的头部
                  UE.utils.loadFile(iframeDom, {
                    tag: "link",
                    rel: "stylesheet",
                    type: "text/css",
                    href: css
                  }, function () {
                    console.log('css,加载成功');
                  });
                    //加载js，放在整个项目的头部
                    UE.utils.loadFile(iframeDom, {
                        src: "http://feddd.me/yht/activity1/js/jquery.js",
                        tag: "script",
                        type: "text/javascript",
                        defer: "defer"
                    });
                  //加载js，放在整个项目的头部
                  UE.utils.loadFile(iframeDom, {
                    src: src,
                    tag: "script",
                    type: "text/javascript",
                    defer: "defer"
                  }, function () {
                    console.log('JS,加载成功');
                  });
                    // UE.getEditor('rightContent').execCommand('cleardoc');
                    UE.getEditor('rightContent').execCommand('insertHtml', code);
                }
            }
        }
      })
    }
  }
  module.exports = Modes;
});
