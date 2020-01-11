// pages/evaluate/remark/remark.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用户的id
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
        })
        console.log(that.data.userId)
      },
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

  },
  see:function(){
    var that=this;
    wx.request({
      url: app.globalData.information + "/message/SeekReply",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        orderId:that.data.data,
        userId:that.data.userId
      },
      success: function(res) {
        console.log("成功",res)
 
        
        
      }
    })
 
   }
})