const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    arr:[],
    arrs:[],
    parentCategoryId:"",
    images:'',
    firstId:'',
  },
  sousuo: function () {
    wx.navigateTo({
      url: '../seckill/seek/seek',
    })
  },
  // 去到三级类目
  goThreeLevel(){
    var that=this;
    wx.request({
      url: '',
    })
  },
  //查询类目页面图片
  images: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urlmorecategory + '/product/findCategoryPagePicture',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data.data;
        console.log(list)
        for (var index in list) {
          list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].id;
        }
        that.setData({
          images:list
        })
      },
    })
  },
  // 首次加载二级类目
  firstGetSec(){
    var that = this;
    wx.request({
      url: app.globalData.urlmorecategory + '/product/category',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        console.log(list)
        for (var index in list) {
          for (var j in list[index].categories) {
            list[index].categories[j].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
          }
        }
        that.setData({
          arrs: list
        })
      },
      data: {
        parentCategoryId: that.data.firstId,
        type: 1
      }
    })
  },
  //一级类目
  morecategory: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urlmorecategory + '/product/category',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let firstId=res.data.data[0].id
        that.setData({
           arr:res.data.data,
           firstId:firstId
        })
      },
    })
  },
  //二级类目
  morecategorys: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlmorecategory + '/product/category',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        console.log(list)
        for (var index in list) {
          for(var j in list[index].categories){
            list[index].categories[j].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
          }
        }
        that.setData({
          arrs: list
        })
        console.log(list)
      },
      data:{
        parentCategoryId: that.data.id,
        type: 1
      }
    })
  },
  //点击类目
  onChange:function(e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
      id:id
    })
    that.morecategorys();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.morecategory()
    this.images()
    this.firstGetSec()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})