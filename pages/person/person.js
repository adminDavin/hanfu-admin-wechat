// pages/person/person.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    userId:'',
    user:'',
    avator:''
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
  contact: function () {
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  record: function () {
    wx.navigateTo({
      url: '../record/record',
    })
  },
  inforava:function(){
    wx.navigateTo({
      url: '../updatePerson/updatePerson',
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
        that.setData({
          avator: res.data.avatarUrl,
        })
        console.log(that.data.userInfo)
        that.getinfor()
      }
    })
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,
        })
        console.log(that.data.userInfo)
        that.getinfor()
      }
    })
  },
  getinfor: function () {
    var main = this;
    // main.todaypraise();

    wx.request({
      url: app.globalData.url + '/wareHouse/findUserFormInfo',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

        userId: main.data.user
      },
      success: function (res) {

        console.log(res);
        main.setData({
          userInfo: res.data.data
        })
        console.log(main.data.userInfo)
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