webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(147);


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

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(134);

/***/ }),

/***/ 134:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 147:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(148);
	__webpack_require__(133);
	var _user = __webpack_require__(102);
	var _mm = __webpack_require__(98);
	var formError = {
	  show : function(errMsg){
	    $('.error-item').show().find('.err-msg').text(errMsg);
	  },
	  hide : function(errMsg){
	    $('.error-item').hide().find('.err-msg').text('');
	  }
	}
	var page = {
	  data : {
	    username : '',
	    question : '',
	    answer   : '',
	    token    : ''
	  },
	  init : function(){
	    this.onLoad();
	    this.bindEvent();
	  },
	  onLoad : function(){
	    this.loadStepUsername();
	  },
	  bindEvent : function(){
	    var _this = this;
	    //用户名按钮的点击
	    $('#submit-username').click(function(){
	      var username = $.trim($('#username').val());
	      if(username){
	        _user.getQuestion(username,function(res){
	          _this.data.username = username;
	          _this.data.question = res;
	          _this.loadStepQuestion();
	        },function(errMsg){
	          formError.show(errMsg);           
	        });
	      }else{
	        formError.show('请输入用户名');
	      }
	    });
	    //密码提示问题答案的按钮
	    $('#submit-question').click(function(){
	      var answer = $.trim($('#answer').val());
	      if(answer){
	        _user.checkAnswer({
	          username : _this.data.username,
	          question : _this.data.question,
	          answer   : answer          
	        },function(res){
	          _this.data.answer = answer;
	          _this.data.token = res;
	          _this.loadStepPassword();
	        },function(errMsg){
	          formError.show(errMsg);
	        });
	      }else{
	        formError.show('请输入密码提示答案');
	      }
	    });
	    //输入新密码后的按钮
	    $('#submit-password').click(function(){
	      var password = $.trim($('#password').val());
	      if(password && password.length >= 6){
	        _user.resetPassword({
	          username : _this.data.username,
	          passwordNew : password,
	          forgetToken   : _this.data.token          
	        },function(res){
	          window.location.href = './result.html?type=pass-reset';
	        },function(errMsg){
	          formError.show(errMsg);
	        });
	      }else{
	        formError.show('请输入不少于6位数的密码');
	      }
	    });
	    
	  },
	  //加载输入用户名第一步
	  loadStepUsername : function(){
	    $('.step-username').show();
	  },
	  // 加载输入密码提示问题答案的一步
	  loadStepQuestion : function(){
	    formError.hide();
	    $('.step-username').hide()
	    .siblings('.step-question')
	    .show().find('.question').text(this.data.question);
	  },
	  // 加载输入新密码的一步
	  loadStepPassword : function(){
	    formError.hide();
	    $('.step-question').hide()
	      .siblings('.step-password').show();
	  }
	};
	$(function(){
	  page.init();
	})

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});