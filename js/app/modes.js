define(function (require, exports, module){
    /**
     * @module modes
     * @requires
     */
    'use strict';

    var Modes = {
        init : function(params){
            var _self = this;
            var defaults = {
                cont_node: $('#style1')
            };
            var params = $.extend(defaults, params);
           /* $.get("js/data.json",function(data){
                _self.buidModes(params,data.modes);
                _self.buidMask(data.modes);
            })*/
            $.ajax({
                type:"get",
                url:"js/data.json",
                dataType: "json",
                success : function(data){
                    _self.buidModes(params,data.modes);
                    _self.buidMask(data.modes);
                }
            })
        },
        /*构建模块*/
        buidModes : function(params,modes){
            var _self = this;
            var li_html = _self.buidLisHtml(params,modes);
            var ul_html = "<ul class=\"con-left-bd-main-box clearfix\">" + li_html + "</ul>";
            params.cont_node.html(ul_html);
        },
        /*构建多个li*/
        buidLisHtml : function(params,modes){
           var _self = this;
           var lis_html = "";
           for(var i=0; i<modes.length; i++){
            lis_html +=  _self.getLiHtml(modes[i]);
           }
            return lis_html;
        },
        /*构建单个li*/
        getLiHtml: function(mode){
            var _self = this;
            var li_html = "<li><div class=\"img-box\" data-modeName=\""+ mode.mode_name +"\"><img src=\""+ mode.mode_img +"\" /></div></li>";
            return li_html;
        },
        /*构建遮罩层*/
        buidMask : function(mode){
            var _self = this;
            var _name = "";
            var mask = "<div class=\"img-mask\">"
                         +"<div class=\"img-mask-box\">"
                         +"<h3 class=\"img-mask-name\">"+ _name +"</h3>"
                         +"<i class=\"fa fa-file-text-o icon_edit\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"插入编辑器\"></i>"
                         +"</div></div>";

            $("#style1>ul>li").hover(function(){
              var mode_name =  $(this).find(".img-box").attr('data-modeName');
              var _this = $(this);
                _this.append(mask);
                _this.find(".img-mask-name").text(mode_name);
            },function(){
                $(this).find(".img-mask").remove();
            });
            $("ul.con-left-bd-main-box").on("click",".icon_edit",function(e){
              console.log($(this).parents('li').html());
              //  console.log(e.target.tagName);
            });
        }
    };
    module.exports = Modes;
});