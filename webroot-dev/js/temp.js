/**
 * Created by 002167 on 2016/9/11.
 */
define(function (require, exports, module) {

    /**
     * @module temp
     * @requires
     */
    'use strict';
    var Temp = {
        /* 初始化 */
        init: function (params) {
            var _self = this;
            // 1、定义默认值
            var defaults = {
                cont_node: $('#style1'),
                url_modes: "js/getModesData.json",
                url_htm: "js/getHtmData.json"
            };
            // 2、用入参扩展defaults
            var _params = $.extend(defaults, params);

            // 3、自己方法
            _self.our_method(_params);
        },
        /* 自己方法 */
        our_method:function(params){
            // 自己的业务逻辑
        }
    };
    module.exports = Temp;
});