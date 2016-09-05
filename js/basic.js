/**
 * Created by 002167 on 2016/9/2.
 */
$(window).resize(function(){
    setHeight();
});

$(function(){
    /*控制内容高度*/
    setHeight();
   /* tooltip*/
    $("[data-toggle='tooltip']").tooltip();
    /*鼠标经过图片显示标题和编辑按钮*/
    $('#picWrapper .con-left-bd-main-box li').hover(function(){
        $(this).find('.img-mask').css('display','table');
    },function(){
        $(this).find('.img-mask').css('display','none');
    });

    var ue = UE.getEditor('rightContent', {
        autoHeight: false
    });

});

/*设置高度*/
function setHeight(){
    var winHeight = $(window).height();
    var headerHeight = $('.header').height();
    var footerHeight = $('.footer').height();
    var conHeight = winHeight - headerHeight - footerHeight;
    $('#container').height(conHeight - 10);
    $('#picWrapper').height($('#container').height() - $('.con-left-bd-main-nav').outerHeight(true));
    $('#pane1').height($('#container').height());
    $('#edui1').height($('#container').height());
    $('#edui1_iframeholder').height($('#container').height() - $('#edui1_toolbarbox').height() - $('#edui1_bottombar').height());

}