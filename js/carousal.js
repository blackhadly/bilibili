var imgs = [
  {"img": "img/b8cb9052a6fc0bf3558d543741ee27807c00f9cd.jpg"},
  {"img": "img/f256404cdf15ca3f12fb855bd2396266.jpg"},
  {"img": "img/13bc3924d2652d0485b3ca783cbc0f9e.jpg"},
  {"img": "img/1231bc623007ca1c6f34004296efeb54eafa76ca.jpg"},
  {"img": "img/faeb119dd047c42cbf2a4f4573aced916a12acb5.jpg"},
];
var slider = {
  LIWIDTH: 440,
  $ulImgs: null,
  $ulIdxs: null,
  DURATION: 500,//保存单次移动的时间
  WAIT: 3000,
  moved: 0,//保存已经左移的li个数
  timer: null,
  init: function () {
    this.$ulImgs = $('#imgs');
    this.$ulIdxs = $('#indexs');
    this.initView();
    this.autoMove();
    $('#slider').hover(function(){
      this.$ulImgs.stop(true);
    }.bind(this),function () {
      this.autoMove();
    }.bind(this));
    this.$ulImgs.on('mouseover',"li>img",function(e){
      this.$ulImgs.stop(true);
      var $tar=$(e.target);
      var i=$tar.index("#imgs img");
      this.moved=i;
      this.moved==imgs.length&&(this.moved=0);
      this.$ulImgs.css("left",-this.moved*this.LIWIDTH);
      this.changeHover();
    }.bind(this));
    this.$ulIdxs.on("mouseover","li",function (e) {
      var $tar=$(e.target);
      if(!$tar.is("hover")){
        var endi=$tar.index("#indexs>li");
        var starti=$(".hover").index("#indexs>li");
        this.moved+=(endi-starti);
        this.changeHover();
        this.$ulImgs.stop(true).animate({
          left:-this.moved*this.LIWIDTH}
          ,this.DURATION);
      }
    }.bind(this));
  },
  initView: function () {
    //初始化页面
    for (var i = 0, htmlImgs = "", htmlIdxs = ""; i < imgs.length; i++) {
      htmlImgs += `<li><img src="${imgs[i].img}"></li>`;
      htmlIdxs += `<li></li>`;
    }
    this.$ulImgs.html(htmlImgs).css("width", (imgs.length + 1) * this.LIWIDTH);
    this.$ulImgs.append(this.$ulImgs.children(":first").clone());
    this.$ulIdxs.html(htmlIdxs);
    this.$ulIdxs.children(':first').addClass("hover");

  },
  autoMove: function () {
    //自动轮播
    this.moved++;
    clearInterval(this.timer);
    this.timer=setInterval(function(){
      this.$ulImgs.animate({left: -this.moved * this.LIWIDTH}, this.DURATION, function () {
        if (this.moved == imgs.length) {
          this.$ulImgs.css('left', 0);
          this.moved = 0;
        }
        this.changeHover();
        this.autoMove();
      }.bind(this));
    }.bind(this), 3000);
  },
  changeHover:function () {
    this.$ulIdxs.children().eq(this.moved).addClass("hover").siblings().removeClass("hover");
  }
};
slider.init();