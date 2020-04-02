// src/pages/myself/address/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:'',
    userId: '',
    addressList: [],
    tipshow: false
  },

  editadd: function (e) {
    console.log(e.currentTarget)
    wx.navigateTo({
      url: '/pages/myself/address/alterAddress/aiter?id=' + e.currentTarget.dataset.addid,
    })
  },

  addaddress() {
    wx.navigateTo({
      url: '/pages/myself/address/newAddress/new',
    })
  },

  getAddress() {
    var that = this;
    wx.request({
      url: app.endpoint.user + '/user/address/queryAddress',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: wx.getStorageSync('userId'),
        token: 2
      },
      success: function (res) {
        console.log('获取地址', res);
        if (res.data.data=='用户没有添加地址') {
         return
        }
        that.setData({
          addressList: res.data.data
        })

      }
    })
  },
  GetNextPageData: function (e) {
    if (this.data.action == 'Gotoaddress'){
    console.log(e)
    let i = e.currentTarget.dataset.index
    let fruit = e.currentTarget.dataset.addresslist;
    console.log(fruit[i])
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    var newtitle = 'It is new title';
    // prevPage.data.selectedAddress = fruit[i]; //不需要页面更新
    prevPage.setData({
      selectedAddress: fruit[i]
    })
    wx.navigateBack()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.action)
    that.getAddress()
    that.setData({
      action: options.action
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
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId
        })
        that.getAddress()
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
  onShareAppMessage: function () {

  }
})