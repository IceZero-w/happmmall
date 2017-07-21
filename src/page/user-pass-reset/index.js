require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
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