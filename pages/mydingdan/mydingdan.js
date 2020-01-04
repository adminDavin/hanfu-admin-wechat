// pages/mydingdan/mydingdan.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:'',
    navid:1,
    productlist:{}
  },

  toggle:function(e){
    var that=this;
    that.setData({
      navid:e.currentTarget.dataset.id
    })
  },

  hexiao:function(){
    wx.navigateTo({
      url: '../hexiao/hexiao',
    })
  },
  getOrder(){
    var that=this;
    wx.request({
      url: app.globalData.url + '/order/query',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId
      },
      success: function (res) {
        console.log('查询订单', res);
        
        that.setData({
          productlist: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    that.setData({
      userId:options.userId
    })
    that.getOrder();
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