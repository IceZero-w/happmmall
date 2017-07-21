webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(136);


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

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(137);
	__webpack_require__(95);
	__webpack_require__(104);
	var navSide = __webpack_require__(111);
	var _mm = __webpack_require__(98);
	var _user = __webpack_require__(102);
	var templateIndex = __webpack_require__(139);
	// page逻辑部分
	var page = {
	  init : function(){
	    this.onLoad();
	  },
	  onLoad : function(){
	    //初始化左侧菜单
	    navSide.init({
	      name : 'user-center'
	    });
	    // 加载用户信息
	    this.loadUserInfo();
	  },
	  // 加载用户信息
	  loadUserInfo : function(){
	    var userHtml = '';
	    _user.getUserInfo(function(res){
	      userHtml = _mm.renderHtml(templateIndex,res);
	      $('.panel-body').html(userHtml);
	    },function(errMsg){
	      _mm.errorTips(errMsg);
	    });
	  }
	}
	$(function(){
	  page.init();
	})

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

	module.exports = "<div class=\"user-info\">\r\n<div class=\"form-line\">\r\n  <span class=\"label\">用户名 :</span>\r\n  <span class=\"text\">{{username}}</span>\r\n</div>\r\n<div class=\"form-line\">\r\n  <span class=\"label\">电 话 :</span>\r\n  <span class=\"text\">{{phone}}</span>\r\n</div>\r\n<div class=\"form-line\">\r\n  <span class=\"label\">邮 箱 :</span>\r\n  <span class=\"text\">{{email}}</span>\r\n</div>\r\n<div class=\"form-line\">\r\n  <span class=\"label\">问 题 :</span>\r\n  <span class=\"text\">{{question}}</span>\r\n</div>\r\n<div class=\"form-line\">\r\n  <span class=\"label\">答 案 :</span>\r\n  <span class=\"text\">{{answer}}</span>\r\n</div>\r\n<a href=\"./user-center-update.html\" class=\"btn btn-submit\">编 辑</a>\r\n</div>";

/***/ })

});