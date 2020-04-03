// pages/myself/index.js
const app = getApp();

import hfOrderApi from '../../services/hf-order.js';
import userAddressApi from '../../services/hf-user-address.js';
import paymentApi from '../../services/hf-payment.js';
import util from '../../utils/util.js';
import tequan from '../../services/hf-tequan.js';

Page({
  data: {
    add:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    onOff: true,
    showModalDlg: true,
    involveProducts: [{
      action: 'collection',
      quantity: 0,
      desc: "商品收藏"
    },{
        action: 'Concern',
        quantity: 0,
        desc: "店铺关注"
      },{
      action: 'history',
        quantity: 0,
      desc: "浏览历史"
    }],
    orderStatuses: [{
      action: "payment",
      quantity: 0,
      desc: "待付款"
    }, {
      action: "process",
      quantity: 0,
      desc: "待处理"
    }, {
      action: "transport",
      quantity: 0,
      desc: "待收货"
    }, {
      action: "evaluate",
      quantity: 0,
      desc: "待评价"
    }, {
      action: "controversial",
      quantity: 0,
      desc: "退换/售后"
    }],
    myWalletResoures: [{
      action: 'balance',
      quantity: 0,
      desc: "余额"
    }, {
      action: 'integral',
      quantity: 0,
      desc: "积分"
    }, {
      action: 'coupon',
      quantity: 0,
      desc: "优惠券"
    }],
    toolAndService: [{
      action: 'address',
      image: '/images/dizhi.png',
      uri: "/address/list",
      desc: "地址管理"
    }, {
      action: 'evaluated',
      image: '/images/pinglun.png',
      uri: "/evaluated/list",
      desc: "我的评论"
    }, {
      action: 'qRCode',
      image: '/images/erweima.png',
      uri: "/qr-code/index",
      desc: "二维码"
    }, {
      action: 'balancePayment',
      image: '/images/yue.png',
        uri: "/wallet/balance/payment",
      desc: "余额支付"
    }]
  },

  preventTouchMove: function() {
    //阻止触摸
  },

  modelCancel: function() {
    this.setData({
      showModalDlg: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   
  },
  onShow: function() {
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(wx.getStorageSync('userId'))) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    }

  
    this.setData({
      userId: userId
    });
    
    tequan.findInfoByUserId(this.data.userId, (res) => {
     console.log(res);
     let arr=this.data.myWalletResoures;
     arr[0].quantity=res.data.data.surplus;
     arr[1].quantity=res.data.data.integral;
     arr[2].quantity=res.data.data.couponCount;
     this.setData({
      myWalletResoures:arr
    });
    });
  },
  te:function(){
  wx.navigateTo({
    url: '/pages/myself/tequan/tequan',
  })
  },
  recharge: function (e) {
    console.log(123)
    this.handleSelected('pages/myself/vipRecharge/vip', e.currentTarget.dataset.action);
  },
  onSelectedOrder: function(e) {
    this.handleSelected('/pages/order/list', e.currentTarget.dataset.action);
  },
  onSelectedToolAndService: function(e) {
    console.log('/pages/myself' + e.currentTarget.dataset.uri);
    this.handleSelected('/pages/myself' + e.currentTarget.dataset.uri, e.currentTarget.dataset.action);

  },
  onSelectedwallet: function(e) {
    console.log(e);
    if (e.currentTarget.dataset.action =='coupon') {
      this.handleSelected('/pages/myself/coupons/coupons', e.currentTarget.dataset.action);
    }
    else if (e.currentTarget.dataset.action == 'integral'){
      this.handleSelected('/pages/myself/jifen/jifen', e.currentTarget.dataset.action);
    }
    else {
      this.handleSelected('/pages/myself/wallet/index', e.currentTarget.dataset.action);
    }
  },
  onSelectedProduct: function(e) {
    let item = e.currentTarget.dataset;
    this.handleSelected('/pages/product/list', item.action);
  },
  handleSelected(uri, action) {
    wx.navigateTo({
      url: uri + '?action=' + action,
    })
  }

})