// pages/information/information.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    statusBarHeight:'',
    user:'',
    wo:{}
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data.userId,

        })
        console.log(that.data.user)
        that.getinfor()
      },
      fail: function () {

        console.log(1111111111)
        that.setData({
          show: true
        })

      }

    })
    
  },
  clocetoast:function(){
    this.setData({
      show: false
    })
  },
  getinfor:function(){
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
          wo: res.data.data
        })

    }})
  },
  back:function(){
    wx.switchTab({
      url: '../person/person',
    })
    console.log(11)
  },
  gophone: function () {
    wx.navigateTo({
      url: '../updatePerson/updatePerson',
    })
  },
  showping:function(){
    // this.setData({
    //   show: true
    // })
    wx.navigateTo({
      url: '../pingjia/pingjia',
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