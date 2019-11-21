// pages/power/power.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeId:'',
    code:'xk5V'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      activeId: options.id,
    })
  },
  
  // 根据邀请码进入投票页面
  ma : function () {
    var main=this;
    wx.showLoading({
      title: '请稍后',
    })
    wx.request({
      url: app.globalData.url +'/activity/listActivityCode',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        code:'xk5V'
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        wx.hideLoading();
        wx.navigateTo({
          url: '../vote/vote?id=' + main.data.activeId
        })
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
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