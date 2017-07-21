webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(153);


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

/***/ 153:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(154);
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
	  init : function(){
	    this.bindEvent();
	  },
	  bindEvent : function(){
	    var _this = this;
	    //验证username
	    $('#username').blur(function(){
	      var username = $.trim($(this).val());
	      // 如果用户名为空
	      if(!username){
	        return;
	      }
	      //异步验证用户是否存在
	      _user.checkUsername(username,function(res){
	        formError.hide();
	      },function(errMsg){
	        formError.show(errMsg);
	      });
	    });
	    //注册按钮的点击
	    $('#submit').click(function(){
	      _this.submit();
	    });
	    // 如果按下回车，也进行提交
	    $('.user-content').keyup(function(e){
	      if(e.keyCode === 13){
	        _this.submit();
	      }
	    })
	  },
	  submit : function(){
	    var formData = {
	      username        : $.trim($('#username').val()),
	      password        : $.trim($('#password').val()),
	      passwordConfirm : $.trim($('#password-confirm').val()),
	      phone           : $.trim($('#phone').val()),
	      email           : $.trim($('#email').val()),
	      question        : $.trim($('#question').val()),
	      answer          : $.trim($('#answer').val())
	    };
	    //表单验证
	    var validateResult = this.formValidate(formData);
	    // 验证成功
	    if(validateResult.status){
	      //提交
	      _user.register(formData,function(res){
	        window.location.href = './result.html?type=register';
	      },function(errMsg){
	        formError.show(errMsg);
	      });
	    }
	    // 验证失败
	    else{
	      //错误提示
	      formError.show(validateResult.msg);
	    }
	  },
	  //表单字段验证
	  formValidate : function(formData){
	    var result = {
	      status : false,
	      msg : ''
	    };
	    //验证用户名是否为空
	    if(!_mm.validate(formData.username,'require')){
	      result.msg = '用户名不能为空';
	      return result;
	    }
	    // 验证密码是否为空
	    if(!_mm.validate(formData.password,'require')){
	      result.msg = '密码不能为空';
	      return result;
	    }
	    // 验证密码长度
	    if(formData.password.length < 6){
	      result.msg = '密码不能少于6位数';
	      return result;
	    }
	    // 验证两次密码输入是否一致
	    if(formData.password !== formData.passwordConfirm){
	      result.msg = '密码输入密码不一致';
	      return result;
	    }
	    // 验证手机号格式
	    if(!_mm.validate(formData.phone,'phone')){
	      result.msg = '手机号格式不正确';
	      return result;
	    }
	    // 验证邮箱格式    
	    if(!_mm.validate(formData.email,'email')){
	      result.msg = '邮箱格式不正确';
	      return result;
	    }
	    // 验证密码提示问题不能为空
	    if(!_mm.validate(formData.question,'require')){
	      result.msg = '密码提示问题不能为空';
	      return result;
	    }
	    // 验证密码提示问题答案不能为空
	    if(!_mm.validate(formData.answer,'require')){
	      result.msg = '密码提示问题答案不能为空';
	      return result;
	    }
	    //通过验证
	    result.status = true;
	    result.msg = '验证通过';
	    return result;
	  }
	};
	$(function(){
	  page.init();
	})

/***/ }),

/***/ 154:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});