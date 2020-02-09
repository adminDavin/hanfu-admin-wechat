// src/pages/myself/wallet/balance/payment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 点击充值显示弹框
  onCreateCode: function () {
    wx.navigateTo({
      // url: '/pages/login/index',
    });
  },
  /**
  * 组件的方法列表
  */
  methods: {
    hiddenQr() {
      this.setData({
        qrshow: false
      })
    },
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
    pickup() {
      let qrUrl = app.endpoint.order + '/cancel/activity/create/activity-code'
      this.setData({
        qrAdd: qrUrl + '?goodsId=' + this.properties.hfOrder.goodsId + '&orderId' + this.properties.hfOrder.orderCode,
        qrshow: true
      })
      console.log(this.data.qrshow)
    }
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