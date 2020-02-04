// src/pages/payment/index.js

const app = getApp();

import userAddressApi from '../../services/hf-user-address.js';
import orderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';

Page({
  data: {
    selectedAddress: {},
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let params = JSON.parse(decodeURIComponent(options.params))
    let userId = wx.getStorageSync('userId');
    console.log(options);
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index?orderStatus=payment',
      });
    } else {
      params.userId = userId;
    }
    this.setData(params);
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
    console.log(this.data);
    userAddressApi.query(this.data.userId, (res) => {
      console.log(res.data.data, res.data.data.length);
      if (res.data.data.length > 0) {
        this.setData({
          selectedAddress: res.data.data[0]
        });
      }
    });
  },

  onAddUserAddress(e) {
    console.log(this.data.userId);
    wx.navigateTo({
      url: '/pages/myself/address/detail?action=addAddress&userId=' + this.data.userId,
    })
  },
  changeMethod: function(e) {
    if (this.data.pickUp.wayOfPickUp == 'selfPickUp') {
      this.setData({
        pickUp: {
          wayOfPickUp: 'delivery',
          wayOfPickUpDesc: '邮寄',
          freight: 10
        }
      });
    } else if (this.data.pickUp.wayOfPickUp == 'delivery') {
      this.setData({
        pickUp: {
          wayOfPickUp: 'selfPickUp',
          wayOfPickUpDesc: '自提',
          freight: 0
        }
      });
    }
  },
  onPaymentMethod: function(e) {
    let paymentMethod = this.data.paymentMethod;
    for (let payment of this.data.paymentMethod) {
      if (e.detail.value == payment.name) {
        payment.checked = true;
      } else {
        payment.checked = false;
      }
    }
    this.setData({paymentMethod: paymentMethod});
  },
  onCreateOrder: function(e) {
    console.log(e.currentTarget.dataset);
    let params = {
      userId: this.data.userId,
      amount: e.currentTarget.dataset.payment,
      orderType: 'nomalOrder',
      paymentName: this.data.paymentMethod[0].name,
      hfRemark: "订单备注",
      //物品属性配置
      goodsId: this.data.selectedGoods.id,
      sellPrice: this.data.selectedGoods.sellPrice,
      actualPrice: this.data.selectedGoods.sellPrice,
      freight: this.data.pickUp.freight,
      takingType: this.data.pickUp.wayOfPickUp,
      quantity: this.data.selectedGoods.quantity,
      sellPrice: this.data.selectedGoods.sellPrice,
      hfDesc: JSON.stringify(this.data.selectedGoods)
    };
    if (typeof (this.data.selectedAddress.id) != 'undefined') {
      params.userAddressId = this.data.selectedAddress.id;
    }
    for (let payment of this.data.paymentMethod) {
      if (payment.checked) {
        params.paymentName = payment.name;
      }
    }
    orderApi.createOrder(params, (res) => {
      console.log(res);
      wx.navigateTo({
        url: '/pages/payment/payment?userId=' + this.data.userId + '&outTradeNo=' + res.data.data.orderCode,
      })
    });
  }
})