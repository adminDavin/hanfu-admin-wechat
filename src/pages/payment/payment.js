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
      console.log(res);
      wx.requestPayment({
        timeStamp: payment.timeStamp,
        nonceStr: payment.nonce_str,
        package: payment.package,
        signType: payment.signType,
        paySign: payment.paySign,
        success: (response) => {
          console.log(response);
          paymentApi.completeOrder(options.outTradeNo, options.userId, (res) => console.log(res));

          wx.showModal({
            title: '訂單支付',
            content: '支付成功',
          });
        },
        fail: (response) => {
          console.log(response);
          wx.showModal({
            title: '訂單支付',
            content: '支付失敗',
          });
        }
      });
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