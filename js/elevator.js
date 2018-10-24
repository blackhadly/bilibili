var elevator = {
  FHEIGHT1: 387,//保存楼层高度
  UPLEVEL: 0,//保存亮灯区域的上限
  DOWNLEVEL: 0,//保存亮灯区域的下限
  $div: null,
  $elevator: null,//保存电梯按钮的div
  init: function () {
    var me = this;
    this.UPLEVEL = (innerHeight - this.FHEIGHT1) / 2;
    this.DOWNLEVEL = this.UPLEVEL + this.FHEIGHT1;
    this.$div = $(".eleva");
    this.$elevator = $("#nav-list");
    $(window).scroll(function () {
      this.check();
    }.bind(this));
    this.$elevator.children("ul").on("click","li",function(){
      var i=$(this).index("#nav-list>ul>li");
      var offsetTop=me.$div.eq(i).offset().top;
      var scroll=offsetTop-me.DOWNLEVEL;
      $(document.documentElement).stop(true).animate({scrollTop:scroll},1000);
    });
  },
  check: function () {
    var me = this;
    this.$div.each(function (i) {
      var offsetTop = $(this).offset().top;
      var scrollTop = $(document.documentElement).scrollTop();
        if (offsetTop > (scrollTop +me.UPLEVEL) && offsetTop <= (scrollTop + me.DOWNLEVEL)) {
          $(this).addClass("src");
          me.$elevator.find("ul li").eq(i).addClass("bg-src");
        } else {
          $(this).removeClass("src");
          me.$elevator.find("ul li").eq(i).removeClass("bg-src");
        }
    });
  },
};
elevator.init();

