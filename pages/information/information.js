// pages/information/information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    statusBarHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  clocetoast:function(){
    this.setData({
      show: false
    })
  },
  back:function(){
    wx.switchTab({
      url: '../person/person',
    })
    console.log(11)
  },
  showping:function(){
    this.setData({
      show: true
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
    var main=this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res) ;
        main.setData({
          statusBarHeight: res.statusBarHeight
        })
      },
    })
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
  // onShareAppMessage: function () {

  // }
})