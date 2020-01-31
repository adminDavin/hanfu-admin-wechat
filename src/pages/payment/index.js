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
    }, {
      checked: false,
      desc: '到店支付',
      name: 'shop'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.params);
    options.params = "%7B%22selectedGoods%22%3A%7B%22fileIds%22%3A%5B%5D%2C%22goodsDesc%22%3A%22%E7%89%9B%E8%82%89%22%2C%22goodsName%22%3A%22%E7%89%9B%E8%82%89%22%2C%22hfGoodsSpecs%22%3A%5B%7B%22goodsId%22%3A4%2C%22hfName%22%3A%22%E5%A4%A7%E5%B0%8F%22%2C%22hfValue%22%3A%225%E6%96%A4%22%2C%22id%22%3A4%7D%5D%2C%22id%22%3A4%2C%22isUsePriceMode%22%3A0%2C%22modifyTime%22%3A%222020-01-20T04%3A40%3A17%22%2C%22priceId%22%3A4%2C%22productId%22%3A2%2C%22quantity%22%3A40%2C%22respStatus%22%3A1%2C%22sellPrice%22%3A150%7D%2C%22paymentType%22%3A%22shopPayment%22%2C%22userId%22%3A965%7D";
    var params = JSON.parse(decodeURIComponent(options.params))
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
    let params = {
      amount: e.currentTarget.dataset,
      distribution: this.data.pickUp.wayOfPickUp,
      hfRemark: '',
      googsId: this.data.selectedGoods.id,
      userId: this.data.userId,
      payMethodName: this.data.paymentMethod[0].name,
      purchaseQuantity: this.data.selectedGoods.quantity,
      userAddressId: this.data.selectedAddress.id,
      purchasePrice: this.data.selectedGoods.sellPrice
    };

    for (let payment of this.data.paymentMethod) {
      if (e.detail.checked) {
        params.payMethodName = payment.name;
      }
    }
    
    orderApi.createOrder(params, (res) => {
      console.log(res);
    });
  }
})