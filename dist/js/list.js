webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(121);


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

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(122);
	__webpack_require__(95);
	__webpack_require__(104);
	var navSide = __webpack_require__(111);
	var _mm = __webpack_require__(98);
	var _product = __webpack_require__(124);
	var Pagination = __webpack_require__(125);
	var templateIndex = __webpack_require__(129);

	var page = {
	  data : {
	    // orderBy排序方法
	    listParam : {
	      keyword : _mm.getUrlParam('keyword') || '',
	      categoryId : _mm.getUrlParam('categoryId') || '',
	      orderBy : _mm.getUrlParam('orderBy') || '' || 'default',
	      pageNum : _mm.getUrlParam('pageNum') || '' || 1,
	      pageSize : _mm.getUrlParam('pageSize') || '' || 20
	    }
	  },
	  init : function(){
	    this.onLoad();
	    this.bindEvent();
	  },
	  onLoad : function(){
	    this.loadList();
	  },
	  bindEvent : function(){
	    var _this = this;
	    // 价格排序的点击事件
	    $('.sort-item').click(function(){
	      var $this = $(this);
	      _this.data.listParam.pageNum = 1;      
	      if($this.data('type') === 'default'){
	        if($this.hasClass('active')){
	          return;
	        }else{
	          $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
	          _this.data.listParam.orderBy = 'default';
	        }
	      }else if($this.data('type') === 'price'){
	        $this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
	        if(!$this.hasClass('asc')){
	          $this.addClass('asc').removeClass('desc');
	          _this.data.listParam.orderBy = 'price_asc';          
	        }else{
	          $this.addClass('desc').removeClass('asc'); 
	          _this.data.listParam.orderBy = 'price_desc';                   
	        }
	      }
	      _this.loadList();
	    });
	  },
	  // 加载list数据
	  loadList : function(){
	    var _this = this;
	    var listHtml = '';
	    var listParam = this.data.listParam;
	    var $pListCon = $('.p-list-con');
	    $pListCon.html('<div class="loading"></div>');
	    // 删除参数中不必要的字段
	    listParam.categoryId
	      ?(delete listParam.keyword) : (delete listParam.categoryId);
	    //请求接口
	    _product.getProductList(listParam,function(res){
	      listHtml = _mm.renderHtml(templateIndex,{
	        list : res.list
	      });
	      $pListCon.html(listHtml);
	      // pageNum当前页数，pages总页数
	      _this.loadPagination({
	        hasPreviousPage : res.hasPreviousPage,
	        prePage         : res.prePage,
	        hasNextPage     : res.hasNextPage,
	        nextPage        : res.nextPage,
	        pageNum         : res.pageNum,
	        pages           : res.pages
	      });
	    },function(errMsg){
	      _mm.errorTips(errMsg);
	    });
	  },
	  // 加载分页信息
	  loadPagination : function(pageinfo){
	    this.pagination ? '' : (this.pagination = new Pagination());
	    this.pagination.render($.extend({},pageInfo,{
	      container : $('.pagination')
	    }));
	  }
	};
	$(function(){
	  page.init();
	})

/***/ }),

/***/ 122:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

	var _mm = __webpack_require__(98);
	var _product = {
	  //
	  getProductList : function(listParam,resolve,reject){
	    _mm.request({
	      url : _mm.getServerUrl('/product/list.do'),
	      data : listParam,
	      success : resolve,
	      error : reject
	    });
	  }
	}
	module.exports = _product;

/***/ }),

/***/ 125:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(126);
	var _mm = __webpack_require__(98);
	var templatePagination = __webpack_require__(128);

	var Pagination = function(){
	  this.defaultOption = {
	    container    : null,
	    pageNum      : 1,
	    pageRange    : 3,
	    onSelectPage : null
	  }
	};
	// 渲染分页组件
	Pagination.prototype.render = function(){
	  // 合并选项
	  this.option = $.extend({},this.defaultOption,userOption);
	  // 判断容器是否为合法的jquery对象
	  if(!(this.option.container instanceof JQuery)){
	    return;
	  }
	  // 判断时候只有一页
	  if(this.option.pages <=1){
	    return;
	  }
	  // 渲染分页内容
	  this.option.container.html(this.getPaginationHtml());
	};
	// 获取分页的html，|上一页|  2 3 4 =5= 6 7 8 |下一页| 5/9
	Pagination.prototype.getPaginationHtml = function(){
	  var html      = '',
	      pageArray = [],
	      option    = this.option,
	      start     = option.pageNum - option.pageRange > 0
	        ? option.pageNum - option.pageRange : 1,
	      end       = option.pageNum + option.pageRange < option.pages
	        ? option.pageNum + option.pageRange : option.pages;
	  // 上一页按钮数据
	  pageArray.push({
	    name     : '上一页',
	    value     : this.option.prePage,
	    disabled : !this.option.hasPreviousPage
	  });
	  // 数字按钮的处理
	  for(var i = start;i<=end;i++){
	    pageArray.push({
	      name   : i,
	      value  : i,
	      active : (i === option.pageNum)
	    });
	  }
	  // 下一页按钮的数据
	  pageArray.push({
	    name     : '下一页',
	    value    : this.option.nextPage,
	    disabled : !this.option.hasNextPage
	  });
	  html = _mm.renderHtml(templatePagination,{
	    pageArray : pageArray,
	    pageNum   : option.pageNum,
	    pages     : option.pages
	  });
	  return html
	};
	module.exports = Pagination;

/***/ }),

/***/ 126:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

	module.exports = "";

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n  <li class=\"p-item\">\r\n    <div class=\"p-img-con\">\r\n      <a href=\"./detail.html?productId={{id}}\" class=\"link\" targrt=\"_blank\">\r\n        <img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\">\r\n      </a>\r\n    </div>\r\n    <div class=\"p-price-con\">\r\n      <span class=\"p-price\">￥{{price}}</span>\r\n    </div>\r\n    <div class=\"p-name-con\">\r\n      <a class=\"p-name link\" href=\"./detail.html?productId={{id}}\" targrt=\"_blank\">{{name}}</a>\r\n    </div>\r\n  </li>\r\n{{/list}}";

/***/ })

});