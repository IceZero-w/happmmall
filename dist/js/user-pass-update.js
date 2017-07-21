webpackJsonp([8],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(150);


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

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(151);
	__webpack_require__(104);
	var navSide = __webpack_require__(111);
	var _mm = __webpack_require__(98);
	var _user = __webpack_require__(102);
	// page逻辑部分
	var page = {
	  init : function(){
	    this.bindEvent();
	    this.onLoad();
	  },
	  onLoad : function(){
	    //初始化左侧菜单
	    navSide.init({
	      name : 'user-pass-update'
	    });
	  },
	  bindEvent : function(){
	    var _this = this;
	    $(document).on('click','.btn-submit',function(){
	      var userInfo = {
	        password : $.trim($('#password').val()),
	        passwordNew : $.trim($('#password-new').val()),
	        passwordConfirm : $.trim($('#password-confirm').val())
	      },
	      validateResult = _this.validateForm(userInfo);
	      if(validateResult.status){
	        _user.updatePassword({
	          passwordOld : userInfo.password,
	          passwordNew : userInfo.passwordNew
	        },function(res,msg){
	          _mm.successTips(msg);
	          window.location.href = './user-login.html';
	        },function(errMsg){
	          _mm.errorTips(errMsg);          
	        });
	      }else{
	        _mm.errorTips(validateResult.msg);
	      }
	    });
	  },
	  validateForm : function(formData){
	    var result = {
	      status : false,
	      msg : ''
	    };
	    // 验证原密码
	    if(!_mm.validate(formData.password,'require')){
	      result.msg = '原密码不能为空';
	      return result;
	    }
	    // 验证新密码长度    
	    if(!formData.passwordNew || formData.passwordNew.length < 6){
	      result.msg = '密码长度不得少于6位';
	      return result;
	    }
	    // 验证密码提示问题不能为空
	    if(formData.passwordConfirm !== formData.passwordNew){
	      result.msg = '两次输入的密码不一致';
	      return result;
	    }
	    //通过验证
	    result.status = true;
	    result.msg = '验证通过';
	    return result;
	  }
	}
	$(function(){
	  page.init();
	})

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});