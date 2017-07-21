require('./index.css');
var _mm = require('util/mm.js');
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