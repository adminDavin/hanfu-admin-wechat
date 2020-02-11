// src/pages/myself/wallet/balance/payment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrshow: false,
    qrAdd: '',
    money:''
  },

  // 点击充值显示弹框
  onCreateCode: function () {
    // console.log(wx.getStorageSync('userId'))
    this.setData({
      qrshow: true
    })
    let qrUrl = app.endpoint.payment + '/balance/activity/payment/activity-code'
    this.setData({
      qrAdd: qrUrl + '?money=' + this.data.money + '&userld' + wx.getStorageSync('userId'),
      qrshow: true
    })
    console.log(this.data.qrshow)
  },
  /**
  * 组件的方法列表
  */
  // methods: {
    // onCreateCode() {
     
    // },
    // copy() {
    //   wx.setClipboardData({
    //     data: this.properties.hfOrder.orderCode,
    //     success: function (res) {
    //       wx.getClipboardData({
    //         success: function (res) {
    //           wx.showToast({
    //             title: '复制成功'
    //           })
    //         }
    //       })
    //     }
    //   })
    // },
    // refund() {
    //   paymentApi.refundOrder({
    //     userId: this.properties.hfOrder.userId,
    //     orderCode: this.properties.hfOrder.orderCode
    //   }, (res) => {
    //     let data = res.data;
    //     console.log(data)
    //   })
    // },
  bindKeyInput: function (e) {
    console.log(e);
      this.setData({
        money: e.detail.value
      })
    console.log(this.data.money);
  },
  // },
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

  }
})