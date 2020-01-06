// pages/pay/payto/payto.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false, // 是否显示弹框
    affirm: false, // 不显示确认按钮
    money:null, // 用户输入的金额
    // money1:null // 用户输入的金额
  },
  // 点击充值显示弹框
  show:function() {
    var that = this
    that.setData({
      show: true
    })
  },
  onChange:function(e) {
    this.setData({
      [e.currentTarget.dataset.prop]: e.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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