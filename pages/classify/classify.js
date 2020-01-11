const app = getApp();
const classifyUtils = require('./classify-utils.js');
Page({
  data: {
    activeKey: 0,
    arr:[],
    arrs:[],
    products: [],
    parentCategoryId:"",
    images:'',
    firstId:'',
  },
  sousuo: function () {
    wx.navigateTo({
      url: '../seckill/seek/seek',
    });
  },
  //点击类目
  onChange:function(e) {
    var id = e.currentTarget.dataset.id;
    this.setData({id:id});
    classifyUtils.morecategorys(this);
  },
 
  onShow: function () {
    classifyUtils.morecategory(this);
    classifyUtils.getClassifyImage(this);
    classifyUtils.firstGetSec(this);
  } 
})