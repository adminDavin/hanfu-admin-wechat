// pages/activeList/activeList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeList:[]
  },
  goVote:function(e){
    console.log(e);
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../power/power?id=' + e.currentTarget.dataset.id,
    })
  },
// 活动列表
   list : function (even) {
     var main=this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url +'/activity/listActivity',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },     
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        main.setData({
          activeList: res.data.data
        })
      },
      fail: function (res) {
        console.log("查找失败：");
       
      }
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
    this.list()
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