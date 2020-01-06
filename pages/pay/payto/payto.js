// pages/pay/payto/payto.js
const app = getApp();
var util = require('../../../utils/util.js')
const apiCart = require('../../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 1,
    show: false, // 是否显示弹框
    affirm: false, // 不显示确认按钮
    hfBalance: '',
    userId: '',
    orderid: '',
    qrAdd: '',
    qrshow: false
  },
  //获取用户余额
  getYue() {
    var that = this;
    apiCart.toSettle(app.globalData.urlpay, '/user/balance/query', {
      userId: that.data.userId
    }, (res) => {
      if (res.data.status == 200) {
        let yue = res.data.data[0].hfBalance
        that.setData({
          hfBalance: yue
        })
      }
    });
  },
  // 点击充值显示弹框
  show: function() {
    var that = this
    if (that.data.orderid != '') {
      that.setData({
        show: true,
        qrAdd: app.globalData.urlpay + '/user/balance/setCode?hfBalance=' + that.data.hfBalance + '&total=' + that.data.total + '&userId=' + that.data.userId
      })
    } else {
      
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let price = options.price;
    if (options.orderid) {
      let orderid = options.orderid;
      that.setData({
        orderid: orderid
      })
    }
    var that = this;
    that.setData({
      total: price
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId: res.data.userId
        })
        that.getYue();
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})