require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var Pagination = require('util/pagination/index.js');
var templateIndex = require('./index.string');

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
  loadPagination : function(pageInfo){
    this.pagination ? '' : (this.pagination = new Pagination());
    this.pagination.render($.extend({},pageInfo,{
      container : $('.pagination')
    }));
  }
};
$(function(){
  page.init();
})