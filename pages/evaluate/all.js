// pages/evaluate/all.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenName: true,
    listArr:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.information + "/order/queryOrder",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res)
        that.setData({
          listArr:res.data.data
        })
        
        
        
 
        
        
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

  },
  onbindfocus(e) {
    console.log(e)
    this.setData({
        bottom: e.detail.height,
    })
},
click:function(e){
  var that = this;
  that.setData({
      hiddenName: false
  })
  // console.log(123);
},
black:function() {
  // console.log(123);
  var that = this;
  that.setData({
      hiddenName: true
  })
}
// onClose() {
//   this.setData({ show: true });
// },
// 点击下拉显示框
// selectTap() {
//   this.setData({
//     show: !this.data.show
//   });
// },

})

