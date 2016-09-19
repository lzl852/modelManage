var lottery = {
    index: -1,	//当前转动到哪个位置，起点位置
    speed: 20,	//初始转动速度
    times: 0,	//转动次数
    timer: 0,	//setTimeout的ID，用clearTimeout清除
    cycle: 50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1,	//中奖位置
    count: 0,	//总共有多少个位置

    // 初始化
    init: function (id) {
        if ($("#" + id).find(".lottery_unit").length > 0) {
            $lottery = $("#" + id);
            $units = $lottery.find(".lottery_unit");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".lottery_unit" + this.index).addClass("lottery_unit_active");
        };
    },
    // 滚动
    roll: function () {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery_unit" + index).removeClass("lottery_unit_active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        }
        $(lottery).find(".lottery_unit" + index).addClass("lottery_unit_active");
        this.index = index;
    },
    // 弹出中奖提示层
    openPrizeBox: function (){
      //  $('.turntable_box .turntable_reslut').addClass("hid");// 先不现实所有提示层
        $('.turntable_box .prize'+lottery.prize).removeClass("hid");// 弹出中奖提示层
    }
    // 获取谁中奖
   /* getPrizeData: function (obj){
        $.get("data.json", function(data){
            obj.prize = data.level;
        });
    }*/
};
function roll() {
    lottery.times += 1;
    lottery.roll();
    // 转动了的次数 > 转动基本次数 + 10  且  中奖位置 == 目前转动到的位置
    if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer); // 终止循环
        lottery.openPrizeBox(); // 弹出中奖提示层
       // setTimeout('lottery.openPrizeBox()',5000);
        lottery.prize = -1; // 中奖位置还原，等待下次点击抽奖
        lottery.times = 0; // 循环此次还原，等待下次点击抽奖
        click = false; // 按钮可以点击，等待下次点击抽奖
    } else {
        // 转动了的次数 < 转动基本次数；（前面的无用功转动）
        if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
        }
        // 转动了的次数 == 转动基本次数；（刚刚进去入抽奖环节）
        else if (lottery.times == lottery.cycle) {
            // js随机数中奖
            var index = Math.random() * (lottery.count) | 0;
            lottery.prize = index;
            // ajax读取中奖数据
           // lottery.getPrizeData(lottery);
        }
        // 进去入抽奖环节
        else {
            if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                lottery.speed += 110;
            } else {
                lottery.speed += 20;
            }
        }
        if (lottery.speed < 40) {
            lottery.speed = 40;
        }
        lottery.timer = setTimeout(roll, lottery.speed);
    }
}

var click = false;

window.onload = function () {
    lottery.init('lottery');
    $("#activitybeiginbutton").click(function () {
        if (click) {
            return false;
        } else {
            lottery.speed = 100;
            roll();
            click = true;
        }
    });

    $('.turntable_reslut_close').click(function(){
        $(this).parent('.turntable_reslut').addClass("hid");
    })
};