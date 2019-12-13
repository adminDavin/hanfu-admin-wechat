// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },
  personalEvaluation: function () {
    // wx.navigateTo({
    //   url: '../personalEvaluation/personalEvaluation?id='',
    // })
  },
  jiang:function(){
    wx.navigateTo({
      url: '../huo/huo',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  canxun: function () {
    wx.navigateTo({
      url: '../choose/choose',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res)
        that.setData({
          userInfo: res.data,
        })
      }
    })
  },
  infor: function () {
    wx.navigateTo({
      url: '../information/information',
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
    wx.hideShareMenu()
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