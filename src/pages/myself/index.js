// pages/myself/index.js
const app = getApp();

import hfOrderApi from '../../services/hf-order.js';
import userAddressApi from '../../services/hf-user-address.js';
import paymentApi from '../../services/hf-payment.js';
import util from '../../utils/util.js';

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    onOff: true,
    showModalDlg: true,
    involveProducts: [{
      action: 'collection',
      desc: "商品收藏"
    }, {
      action: 'follow',
      desc: "店铺关注"
    }, {
      action: 'history',
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
    }, {
      action: 'privilege',
      quantity: 0,
      desc: "我的特权"
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
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(wx.getStorageSync('userId'))) {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    }

  
    this.setData({
      userId: userId
    });
  },
  onShow: function() {
    if (typeof this.getTabBar === 'function') {

      this.getTabBar().setData({
        selected: 4
      });
      hfOrderApi.queryOrderStatistics(this.data.userId, (res) => {
        let orderStatusMap = {};
        for (let orderStatus of res.data.data) {
          orderStatusMap[orderStatus.orderStatus] = orderStatus.quantity;
        }
        let orderStatuses = this.data.orderStatuses;
        for (let orderStatus of orderStatuses) {
          let status = orderStatusMap[orderStatus.action];
          if (typeof(status) != 'undefined') {
            orderStatus.quantity = status;
          }
        }
        this.setData({ orderStatuses: orderStatuses });
      });
    }
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
    this.handleSelected('/pages/myself/wallet/index', e.currentTarget.dataset.action);
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