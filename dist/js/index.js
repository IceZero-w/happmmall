webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(92);


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	__webpack_require__(95);
	__webpack_require__(104);
	__webpack_require__(107);
	var navSide = __webpack_require__(111);
	var templateBanner = __webpack_require__(115);
	var _mm = __webpack_require__(98);
	navSide.init({
	  name : 'user-center'
	});

	$(function() {
	  // 渲染banner的html
	  var bannerHtml = _mm.renderHtml(templateBanner);
	  $('.banner-con').html(bannerHtml);
	  // 初始化banner
	  var $slider = $('.banner').unslider({
	    dots : true
	  });
	  //前一张和后一张操作的事件绑定
	  $('.banner-con .banner-arrow').click(function(){
	    var forward = $(this).hasClass('prev') ? 'prev' : 'next';
	    $slider.data('unslider')[forward]();
	  })
	});


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	var _mm = __webpack_require__(98);
	var _user = __webpack_require__(102);
	var _cart = __webpack_require__(103);
	//导航栏
	var nav = {
	  init : function(){
	    this.bindEvent();
	    this.loadUserInfo();
	    this.loadCartCount();
	    return this;
	  },
	  bindEvent : function(){
	    //登录点击事件
	    $('.js-login').click(function(){
	      _mm.doLogin();
	    });
	    //注册点击事件
	    $('.js-register').click(function(){
	      window.location.href = './user-register.html';
	    });
	    //退出事件
	    $('.js-logout').click(function(){
	      _user.logout(function(res){
	        window.location.reload();
	      }),function(errMsg){
	        _mm.errorTips(errMsg);
	      }
	    })
	  },
	  //加载用户信息
	  loadUserInfo : function(){
	    _user.checkLogin(function(res){
	      $('.user.not-login').hide().siblings('.user.login').show()
	        .find('.username').text(res.username);
	    }),function(errMsg){
	      // _mm.errTips(errMsg);
	    }
	  },
	  //加载购物车数量
	  loadCartCount : function(){
	    _cart.getCartCount(function(res){
	      $('.nav .cart-count').text(res || 0);
	    }),function(errMsg){
	      $('.nav .cart-count').text(0);
	    }
	  }
	}
	module.exports = nav.init();

/***/ }),

/***/ 96:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(98);
	var _user = {
	  //登录
	  login : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/login.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //检查用户名是否存在
	  checkUsername : function(username,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/check_valid.do'),
	      data : {
	        type : 'username',
	        str  : username
	      },
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //用户注册
	  register : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/register.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //检查用户登录状态
	  checkLogin : function(resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/get_user_info.do'),
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //获取用户密码提示问题
	  getQuestion : function(username,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/forget_get_question.do'),
	      data : {
	        username : username
	      },
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //检查密码提示问题答案
	  checkAnswer : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/forget_check_answer.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  // 重置密码
	  resetPassword : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/forget_reset_password.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //获取个人信息
	  getUserInfo : function(resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/get_information.do'),
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  // 更改个人信息
	  updateUserInfo : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/update_information.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //登录状态下更新密码
	  updatePassword : function(userInfo,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/reset_password.do'),
	      data : userInfo,
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  },
	  //退出登录
	  logout : function(resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/user/logout.do'),
	      method : 'POST',
	      success : resolve,
	      error : reject
	    });
	  }
	}
	module.exports = _user;

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(98);
	var _cart = {
	  //获取购物车数量
	  getCartCount : function(resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
	      success : resolve,
	      error : reject
	    });
	  }
	}
	module.exports = _cart;

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(105);
	var _mm = __webpack_require__(98);
	//导航栏
	var header = {
	  init : function(){
	    this.onLoad();
	    this.bindEvent();
	  },
	  onLoad : function(){
	    var keyword = _mm.getUrlParam('keyword');
	    //keyword存在，则回填输入框
	    if(keyword){
	      $('#search-input').val(keyword);
	    }
	  },
	  bindEvent : function(){
	    var _this = this;
	    //点击搜索按钮以后，做搜索提交
	    $('#search-btn').click(function(){
	      _this.searchSubmit();
	    });
	    //输入回车后，做搜索提交
	    $('#search-input').keyup(function(e){
	      // 13是回车键
	      if(e.keyCode === 13){
	        _this.searchSubmit();
	      }
	    })
	  },
	  searchSubmit : function(){
	    var keyword = $.trim($('#search-input').val());
	    //如果提交时候有keyword，正常跳转list页面
	    if(keyword){
	      window.location.href = './list.html?keyword='+keyword;
	    }else{
	      _mm.goHome();
	    }
	  }
	}
	header.init();

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(108);
	__webpack_require__(110);

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 110:
/***/ (function(module, exports) {

	(function(e,t){if(!e)return t;var n=function(){this.el=t;this.items=t;this.sizes=[];this.max=[0,0];this.current=0;this.interval=t;this.opts={speed:500,delay:3e3,complete:t,keys:!t,dots:t,fluid:t};var n=this;this.init=function(t,n){this.el=t;this.ul=t.children("ul");this.max=[t.outerWidth(),t.outerHeight()];this.items=this.ul.children("li").each(this.calculate);this.opts=e.extend(this.opts,n);this.setup();return this};this.calculate=function(t){var r=e(this),i=r.outerWidth(),s=r.outerHeight();n.sizes[t]=[i,s];if(i>n.max[0])n.max[0]=i;if(s>n.max[1])n.max[1]=s};this.setup=function(){this.el.css({overflow:"hidden",width:n.max[0],height:this.items.first().outerHeight()});this.ul.css({width:this.items.length*100+"%",position:"relative"});this.items.css("width",100/this.items.length+"%");if(this.opts.delay!==t){this.start();this.el.hover(this.stop,this.start)}this.opts.keys&&e(document).keydown(this.keys);this.opts.dots&&this.dots();if(this.opts.fluid){var r=function(){n.el.css("width",Math.min(Math.round(n.el.outerWidth()/n.el.parent().outerWidth()*100),100)+"%")};r();e(window).resize(r)}if(this.opts.arrows){this.el.parent().append('<p class="arrows"><span class="prev">←</span><span class="next">→</span></p>').find(".arrows span").click(function(){e.isFunction(n[this.className])&&n[this.className]()})}if(e.event.swipe){this.el.on("swipeleft",n.prev).on("swiperight",n.next)}};this.move=function(t,r){if(!this.items.eq(t).length)t=0;if(t<0)t=this.items.length-1;var i=this.items.eq(t);var s={height:i.outerHeight()};var o=r?5:this.opts.speed;if(!this.ul.is(":animated")){n.el.find(".dot:eq("+t+")").addClass("active").siblings().removeClass("active");this.el.animate(s,o)&&this.ul.animate(e.extend({left:"-"+t+"00%"},s),o,function(i){n.current=t;e.isFunction(n.opts.complete)&&!r&&n.opts.complete(n.el)})}};this.start=function(){n.interval=setInterval(function(){n.move(n.current+1)},n.opts.delay)};this.stop=function(){n.interval=clearInterval(n.interval);return n};this.keys=function(t){var r=t.which;var i={37:n.prev,39:n.next,27:n.stop};if(e.isFunction(i[r])){i[r]()}};this.next=function(){return n.stop().move(n.current+1)};this.prev=function(){return n.stop().move(n.current-1)};this.dots=function(){var t='<ol class="dots">';e.each(this.items,function(e){t+='<li class="dot'+(e<1?" active":"")+'">'+(e+1)+"</li>"});t+="</ol>";this.el.addClass("has-dots").append(t).find(".dot").click(function(){n.move(e(this).index())})}};e.fn.unslider=function(t){var r=this.length;return this.each(function(i){var s=e(this);var u=(new n).init(s,t);s.data("unslider"+(r>1?"-"+(i+1):""),u)})}})(window.jQuery,false)

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(112);
	var _mm = __webpack_require__(98);
	var templateIndex = __webpack_require__(114);
	//侧边导航
	var navSide = {
	  option : {
	    name : '',
	    navList : [
	      {name : 'user-center', desc: '个人中心',href: './user-center.html'},
	      {name : 'order-list', desc: '我的订单',href: './order-list.html'},
	      {name : 'user-pass-update', desc: '修改密码',href: './user-pass-update.html'},
	      {name : 'about', desc: '关于MMall',href: './about.html'}      
	    ]
	  },
	  init : function(option){
	    //合并选项
	    $.extend(this.option, option);
	    this.renderNav();
	  },
	  //渲染导航菜单
	  renderNav : function(){
	    //计算active数据
	    for(var i = 0,iLength = this.option.navList.length;i<iLength;i++){
	      if(this.option.navList[i].name === this.option.name){
	        this.option.navList[i].isActive = true;
	      }
	    }
	    //渲染list数据
	    var navHtml = _mm.renderHtml(templateIndex,{
	      navList : this.option.navList
	    });
	    //把html放入容器
	    $('.nav-side').html(navHtml);
	  }
	};
	module.exports = navSide;

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 114:
/***/ (function(module, exports) {

	module.exports = "{{#navList}}\r\n{{#isActive}}\r\n<li class=\"nav-item active\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<li class=\"nav-item\">\r\n{{/isActive}}\r\n    <a href=\"{{href}}\" class=\"link\">{{desc}}</a>\r\n</li>\r\n{{/navList}}\r\n";

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"banner\">\r\n    <ul>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100021\" target=\"_blank\">\r\n            <img src=\"" + __webpack_require__(116) + "\" alt=\"\" class=\"banner-img\"></a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100030\" target=\"_blank\">\r\n            <img src=\"" + __webpack_require__(117) + "\" alt=\"\" class=\"banner-img\"></a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100016\" target=\"_blank\">\r\n            <img src=\"" + __webpack_require__(118) + "\" alt=\"\" class=\"banner-img\"></a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=100001\" target=\"_blank\">\r\n            <img src=\"" + __webpack_require__(119) + "\" alt=\"\" class=\"banner-img\"></a>\r\n        </li>\r\n        <li>\r\n            <a href=\"./list.html?categoryId=1000021\" target=\"_blank\">\r\n            <img src=\"" + __webpack_require__(120) + "\" alt=\"\" class=\"banner-img\"></a>\r\n        </li>\r\n    </ul>\r\n    <div class=\"banner-arrow prev\">\r\n        <i class=\"fa fa-angle-left\"></i>\r\n    </div>\r\n    <div class=\"banner-arrow next\">\r\n        <i class=\"fa fa-angle-right\"></i>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 116:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner1.jpg";

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner2.jpg";

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner3.jpg";

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner4.jpg";

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "resource/banner5.jpg";

/***/ })

});