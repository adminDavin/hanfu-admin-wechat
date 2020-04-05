// src/pages/payment/index.js

const app = getApp();

import userAddressApi from '../../services/hf-user-address.js';
import orderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';
import discount from '../../services/discount.js';

Page({
  data: {
    competitive:false,
    CouponId:'',
    showModalCreateOrder: false,
    tequan:[],//可用优惠
    mistake: [],// 不可用优惠
    useLimit: { full: "", minus: "" },//选中的优惠
    quantity:'',
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
   * 生命周期函数--监听页面加载 quantity
   */
  onLoad: function (options) {
    let params = JSON.parse(decodeURIComponent(options.params))
    console.log(params)
    let userId = wx.getStorageSync('userId');
    this.data.competitive = params.competitive
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    } else {
      params.userId = userId;
    }
    this.setData(params);
    userAddressApi.query(this.data.userId, (res) => {
      console.log(res.data.data, res.data.data.length);
      if (res.data.data.length > 0) {
        this.setData({
          selectedAddress: res.data.data[0]
        });
      }
    });
    let obj = {
      state: 0,
      userId: params.userId,
      GoodsNum: params.quantity,
      goodsId: params.selectedGoods.id
    }
    console.log(obj);
    let idDeleted =0
    discount.myCoupon(obj, (res) => {
       let tequan = res.data.data
      console.log(tequan)
      let tequans = []
      let mistake = []
      for (var i = 0; i < tequan.length; i++) {
        tequan[i].useLimit = JSON.parse(tequan[i].useLimit);
        if (tequan[i].idDeleted == idDeleted) {
         tequans.push(tequan[i])
        } else {
          mistake.push(tequan[i])
        }
      } 
      this.setData({
        tequan: tequans,
        mistake: mistake
      })
      console.log(this.data.tequan);
    });
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
    console.log(this.data);

  },
  // 选择地址 跳到地址栏
  selectLocation(){
    wx.navigateTo({
      url: '/pages/myself/address/list?action=Gotoaddress',
    })
  },

  onAddUserAddress(e) {
    console.log(this.data.userId);
    wx.navigateTo({
      url: '/pages/myself/address/detail?action=addAddress&userId=' + this.data.userId,
    })
  },
  changeMethod: function (e) {
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
  changeCoupon(e) {
      this.setData({
        showModalCreateOrder: true
      });
  },
  changeCoupons(e) {
    console.log(e.currentTarget.dataset.item)
    this.setData({
      CouponId: e.currentTarget.dataset.item.id,
      ['useLimit.full']: e.currentTarget.dataset.item.useLimit.full,
      ['useLimit.minus']: e.currentTarget.dataset.item.useLimit.minus
    });
    console.log(this.data)
    console.log(this.data.selectedGoods.id)
    console.log(this.data.quantity)
    let thta = this
    wx.request({
      url: app.endpoint.product + '/hf-goods/checkResp',
      method: 'POST',
      data: {
        GoodsNum: this.data.quantity,
        goodsId: this.data.selectedGoods.id,
        discountCouponId:e.currentTarget.dataset.item.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log(res)
        console.log(res.data.data, 'dfddsfsafd');
        if (res.data.data == 'understock') {
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          });
        }
        thta.data.selectedGoods.sellPrices= res.data.data.money
      }
    })
  },
  onCloseGoodsSpec: function (e) {
    // 隐藏遮罩层
    if (e.currentTarget.dataset.type == "createOrder") {
      this.setData({
        showModalCreateOrder: false
      });
    }
  },
  onConfirmSelectedGoods: function (e) {
    this.setData({
      showModalCreateOrder: false
    });
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

  onCreateOrder: function (e) {
    console.log(e.currentTarget.dataset);
    console.log(this.data.groupActivity);
    console.log(this.data.selectedGoods);
    let params = {
      userId: this.data.userId,
      amount: e.currentTarget.dataset.payment,
      orderType: 'nomalOrder',
      paymentName: this.data.paymentMethod[0].name,
      hfRemark: "订单备注",
      //物品属性配置
      goodsId: this.data.selectedGoods.id,
      sellPrice: this.data.selectedGoods.sellPrice,
      actualPrice: this.data.selectedGoods.sellPrices,
      freight: this.data.pickUp.freight,
      takingType: this.data.pickUp.wayOfPickUp,
      quantity: this.data.quantity,
      sellPrice: this.data.selectedGoods.sellPrice,
      hfDesc: JSON.stringify(this.data.selectedGoods),
      stoneId: this.data.stoneId
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
      console.log(res)
      console.log(params);
      wx.navigateTo({
        url: '/pages/payment/payment?userId=' + this.data.userId + '&outTradeNo=' + res.data.data.orderCode + '&paymentName=' + params.paymentName + '&groupActivity=' + this.data.groupActivity + '&activityId=' + this.data.activityId + '&goodsId=' + this.data.selectedGoods.id + '&userId=' + this.data.userId + '&orderId=' + res.data.data.id + '&groupid=' + this.data.groupid,
      })
      // if (this.data.groupActivity) {
      //   let param={
      //     activityId:this.data.activityId,
      //     goodsId: this.data.selectedGoods.id,
      //     userId: this.data.userId,
      //   }
      //   orderApi.addGroup(param, (res) => {
      //     console.log('开团成功')
      //   })
      // }
    });
  }
})