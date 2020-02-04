// src/pages/myself/address/newAddress/new.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    setshow: true,
    contact: '',
    phoneNumber: '',
    hfProvince: '',
    hfCity: '',
    hfAddressDetail: '',
    isFaultAddress: '',
  },

  // 定位
  getCityNameOFLocation: function () {
    wx.navigateTo({
      url: '/pages/myself/address/detail'
    })
  },


  setshowbtn: function () {
    var that = this;
    that.setData({
      setshow: !that.data.setshow
    })
  },
  contact(e) {
    var that = this;
    that.setData({
      contact: e.detail.value
    })
  },
  phoneNumber(e) {
    var that = this;
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  hfProvince(e) {
    var that = this;
    that.setData({
      hfProvince: e.detail.value
    })
  },
  hfCity(e) {
    var that = this;
    that.setData({
      hfCity: e.detail.value
    })
  },
  hfAddressDetail(e) {
    var that = this;
    that.setData({
      hfAddressDetail: e.detail.value
    })
  },
  submit() {
    var that = this;
    if (that.data.setshow == true) {
      that.setData({
        isFaultAddress: 0
      })
    } else {
      that.setData({
        isFaultAddress: 1
      })
    }

    if (wx.getStorageSync('userId') == null) {
      wx.showToast({
        title: '用户未登录',
      })
    }
    console.log(this.data);
    wx.request({
      url: app.endpoint.user +  '/user/address/addAddress',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        hfConty: '中国',
        contact: that.data.contact,
        phoneNumber: that.data.phoneNumber,
        hfProvince: that.data.hfProvince,
        hfCity: that.data.hfCity,
        hfAddressDetail: that.data.hfAddressDetail,
        userId: wx.getStorageSync('userId'),
        isFaultAddress: that.data.isFaultAddress,
        hfDesc: '备注'
      },
      success: function (res) {
        wx.showToast({
          title: '地址添加成功',
        }) 
        wx.navigateTo({
          url: '/pages/myself/address/list'
        })
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function (res) {
        console.log(res)
        wx.showToast({
          title: '地址添加失败',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId
        })
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

  }
})