window.onload = function () {
    window.onresize = setHeight;
    setHeight();
};

$(function(){
   /* tooltip*/
    $("[data-toggle='tooltip']").tooltip();
    /*鼠标经过图片显示标题和编辑按钮*/
    $('#picWrapper .con-left-bd-main-box li').hover(function(){
        $(this).find('.img-mask').css('display','table');
    },function(){
        $(this).find('.img-mask').css('display','none');
    });
   /* 美化滚动条*/
    $('#pane1').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });
    /*颜色选择器*/
    $("#pickaColor").pickAColor({
        showSpectrum : true,
        showSavedColors : true,
        saveColorsPerElement : true,
        fadeMenuToggle : true,
        showAdvanced : true,
        showBasicColors : true,
        showHexInput : true,
        allowBlank	 : true,
        inlineDropdown : true
    });
    var current_editor = UE.getEditor('rightContent', {
        autoHeightEnabled:false
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

   /* $('#edui1').height($('#container').height());
    $('#edui1_iframeholder').height($('#container').height() - $('#edui1_toolbarbox').height() - $('#edui1_bottombar').height());*/

/*    console.log("#container:"+$('#container').height()
     + "; #picWrapper:"+$('#picWrapper').height()
     +"; #pane1:"+$('#pane1').height()
     +"; #edui1:"+$('#edui1').height()
     +"; #edui1_iframeholder:"+$('#edui1_iframeholder').height());*/

}