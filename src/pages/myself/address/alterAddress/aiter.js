// src/pages/myself/address/alterAddress/aiter.js
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

  setshowbtn: function () {
    var that = this;
    that.setData({
      setshow: !that.data.setshow
    })
    console.log('23' + that.data.setshow)
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

  del() {
    var that = this;
    wx.request({
      url: app.endpoint.user + '/user/address/deleteAddress',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.id
      },
      success: function (res) {
        console.log('删除地址成功', res)
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  getAdressDetail() {
    var that = this;
    wx.request({
      url: app.endpoint.user + '/user/address/addressDetail',
      method: 'get',
      data: {
        id: that.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('获取地址详情', res)
        that.setData({
          contact: res.data.data.contact,
          phoneNumber: res.data.data.phoneNumber,
          hfProvince: res.data.data.hfProvince,
          hfCity: res.data.data.hfCity,
          hfAddressDetail: res.data.data.hfAddressDetail,
          isFaultAddress: res.data.data.isFaultAddress,
        })
        if (that.data.isFaultAddress == 0) {
          that.setData({
            setshow: true
          })
        } else {
          that.setData({
            setshow: false
          })
        }
      },
    })
  },

  submit() {
    var that = this;
    console.log('93' + that.data.setshow)
    if (that.data.setshow == true) {
      that.setData({
        isFaultAddress: 0
      })
    } else {
      that.setData({
        isFaultAddress: 1
      })
    }
    console.log(that.data.isFaultAddress)
    wx.request({
      url: app.endpoint.user + '/user/address/updateAddress',
      method: 'post',
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
        hfDesc: '备注',
        id: that.data.id
      },
      success: function (res) {
        wx.showToast({
          title: '地址修改成功',
        })
        wx.navigateTo({
          url: '/pages/myself/address/list'
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '地址修改失败',
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
    that.setData({
      id: options.id
    })
    that.getAdressDetail();
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