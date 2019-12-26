// pages/seckill/seckill.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      arr:[],
      name:[],
      id:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 拼团标题
  onLoad: function (options) {
    this.requestData();

  },
  requestData: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlseckill + '/group/selectCategoryName',
      method: 'Get',
      success: function (res) {
        that.setData({
          arr:res.data
        })
      },
    })
  },
  // 拼团内容
  requestcontent: function (e) {
    // console.log(e)
    var that = this;
    wx.showToast({
          title: e.detail.title,
          icon: 'none'
        });
    wx.request({
      url: app.globalData.urlseckill + '/group/selectCategory',
      method: 'Get',
      success: function (res) {
          console.log(res)
          that.setData({
            name:res.data,
          })
      },
      data:{
          name:e.detail.title
      }
    })
  },
  // 跳转携带id
  particulars :function(e){
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `../classify/puzzle-particulars/puzzle-particulars?id=${id}`, 
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