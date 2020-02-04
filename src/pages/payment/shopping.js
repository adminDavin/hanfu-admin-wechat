// src/pages/payment/shopping.js
const app = getApp();

import orderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';

Page({

  /**
   * Page initial data
   */
  data: {
    amount: 0,
    pickUp: {
      wayOfPickUp: 'selfPickUp',
      wayOfPickUpDesc: '自提',
      freight: 0
    },
    paymentMethod: [{
      checked: true,
      desc: '微信支付',
      name: 'wechart'
    }, {
      checked: false,
      desc: '余额支付',
      name: 'balance'
    }]
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let params = JSON.parse(decodeURIComponent(options.params))
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      params.userId = userId;
    }
    this.setData(params);
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
    console.log(this.data);
  },

  onPaymentMethod: function (e) {
    let paymentMethod = this.data.paymentMethod;
    for (let payment of this.data.paymentMethod) {
      if (e.detail.value == payment.name) {
        payment.checked = true;
      } else {
        payment.checked = false;
      }
    }
    this.setData({ paymentMethod: paymentMethod });
  },
  onInputPaymentAmount: function(e) {
    if (util.isRealNum(e.detail.value)) {
      console.log(e.detail.value);
      this.setData({ amount: parseInt(e.detail.value)});
    } else {
    }
  }
})