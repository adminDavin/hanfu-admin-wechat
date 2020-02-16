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
      this.setData({ amount: e.detail.value });
    }
  },
  onCreateOrder: function (e) {
    if (!util.isRealNum(this.data.amount)) {
      wx.showModal({
        title: '输入的金额不合法',
        content: '您输入的是' + this.data.amount,
      });
    }  else {
      let amount = parseInt(this.data.amount);
      if (amount == 0) {
        wx.showModal({
          title: '输入的金额不合法',
          content: '支付金额不可以为0',
        });
      } else {
        this.createOrder(amount);
      }
    }    
  },
  createOrder(amount) {
    let params = {
      userId: this.data.userId,
      amount: this.data.amount,
      orderType: 'shoppingOrder',
      paymentName: this.data.paymentMethod[0].name,
      hfRemark: "到店支付订单",
      stoneId: this.data.stoneId
    };
    for (let payment of this.data.paymentMethod) {
      if (payment.checked) {
        params.paymentName = payment.name;
      }
    }
    orderApi.createOrder(params, (res) => {
      wx.navigateTo({
        url: '/pages/payment/payment?userId=' + this.data.userId + '&outTradeNo=' + res.data.data.orderCode + '&paymentName=' + params.paymentName,
      })
    });
  }
})