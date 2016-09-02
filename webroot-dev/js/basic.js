/**
 * Created by 002167 on 2016/9/2.
 */

window.onload=function(){
    window.onresize = setHeight;
    setHeight();
};
/*设置高度*/
function setHeight(){
    var winHeight = $(window).height();
    var headerHeight = $('.header').height();
    var footerHeight = $('.footer').height();
    var conHeight = winHeight - headerHeight - footerHeight;
    $('#container').height(conHeight - 10);
    $('#picWrapper').height($('#container').height() - $('.con-left-bd-main-nav').outerHeight(true))
 }
$(function(){
    /*鼠标经过图片显示标题和编辑按钮*/
    $('#picWrapper .con-left-bd-main-box li').hover(function(){
        $(this).find('.img-mask').css('display','table');
    },function(){
        $(this).find('.img-mask').css('display','none');
    });
});