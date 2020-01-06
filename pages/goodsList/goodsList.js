// pages/goods/goodsList/goodsList.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio: '1',
    edit: false
    
  },
  off:function(e){
    console.log(e);
    
    this.setData({
      radio: ''
    });
    console.log(123);
    
  },
  onChange:function(event) {
    // console.log(event);
    
    this.setData({
      radio: event.detail
    });
  },
  onEdit:function() {
    this.setData({
      edit: true
    })
  },
  onEditdone:function() {
    this.setData({
      edit: false
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

  },
  comment:function(){
    wx.request({
      url: app.globalData.urlparticulars + "/goods/delConcern",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        openId:2
      },
      success: function(res) {
        console.log("成功",res)
      }
    })
 
   },
})