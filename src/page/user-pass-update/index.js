require('./index.css');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
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