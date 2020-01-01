// pages/hexiao/hexiao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 3,
    orderId: 3,
    qrAdd: '',
    qrshow: false
  },

  tiHuo: function(e) {
    var that = this;
    that.setData({
      qrshow: true,
      qrAdd: app.globalData.urlHexiao + '/test/activity/create/activity-code?goodsId=' + that.data.goodsId + '&orderId=' + that.data.orderId
    })

  },

  guanbi: function() {
    var that = this;
    that.setData({
      qrshow: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})