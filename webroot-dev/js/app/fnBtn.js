  define(function (require, exports, module) {
    /**
     * @module basic
     * @requires
     */
    'use strict';
    var FnBtn = {
      initialize: function () {
        var _self = this;
        _self._btn();
      },
      _btn: function () {
        $('#preview-btn').click(function () {
          console.info("test");
          console.info(UE.getEditor('rightContent').getAllHtml());
        })
      },
    }

    module.exports = FnBtn;
  });
