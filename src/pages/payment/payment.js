// src/pages/payment/payment.js
const app = getApp();

import paymentApi from '../../services/hf-payment.js';
import util from '../../utils/util.js';

Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    paymentApi.paymentOrder({
      userId: options.userId, outTradeNo: options.outTradeNo
    }, (res) => {
      let payment = res.data.data;
      if (options.paymentName == "wechart") {
        // 微信支付 待用户确认
        this.wechartPaymentConfirm(options, payment)
      } else {
        //余额支付 直接跳转到订单列表
        paymentApi.completeOrder(options.outTradeNo, options.userId, (res) => console.log(res));
        wx.navigateTo({
          url: '/pages/order/list?action=all',
        });
      }
    });
      
  },

  wechartPaymentConfirm: function (options, payment) {
    wx.requestPayment({
      timeStamp: payment.timeStamp,
      nonceStr: payment.nonce_str,
      package: payment.package,
      signType: payment.signType,
      paySign: payment.paySign,
      success: (response) => {
        // 微信确认支付成功后 
        paymentApi.completeOrder(options.outTradeNo, options.userId, (res) => console.log(res));
        wx.showModal({
          title: '订单支付',
          content: '支付成功',
        });
        wx.navigateTo({
          url: '/pages/order/list?action=all',
        });
      },
      fail: (response) => {
        console.log(response);
        wx.showModal({
          title: '订单支付',
          content: '支付失敗',
        });
        wx.navigateTo({
          url: '/pages/order/list?action=payment',
        });
      }
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  }
})