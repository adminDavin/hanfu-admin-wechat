// pages/myself/index.js
const app = getApp();
import projectUtils from '../../utils/project-utils.js';
import hfOrderApi from '../../services/hf-order.js';
import userAddressApi from '../../services/hf-user-address.js';
import paymentApi from '../../services/hf-payment.js';
import util from '../../utils/util.js';
import tequan from '../../services/hf-tequan.js';

Page({
  data: {
    hui: '普通会员',
    add: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    onOff: true,
    showModalDlg: true,
    involveProducts: [{
      action: 'collection',
      quantity: 0,
      desc: "商品收藏"
    }, {
      action: 'Concern',
      quantity: 0,
      desc: "店铺关注"
    }, {
      action: 'history',
      quantity: 0,
      desc: "浏览历史"
    }],
    orderStatuses: [{
      img: '../../img/daifukuan.png',
      action: "payment",
      quantity: 0,
      desc: "待付款"
    }, {
      img: '../../img/chulizhong.png',
      action: "process",
      quantity: 0,
      desc: "处理中"
    },
    {
      img: '../../img/shouhuo.png',
      action: "transport",
      quantity: 0,
      desc: "运送中"
    },
    {
      img: '../../img/ziyuan.png',
      action: "evaluate",
      quantity: 0,
      desc: "待评价"
    },
    {
      img: '../../img/daifukuan.png',
      action: "controversial",
      quantity: 0,
      desc: "交易纠纷"
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

  preventTouchMove: function () {
    //阻止触摸
  },

  modelCancel: function () {
    this.setData({
      showModalDlg: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    projectUtils.activeTabBar(this, 4);

    wx.setNavigationBarColor({
      frontColor: '#ffffff', // 必写项
      backgroundColor: '#FF3333', // 传递的颜色值

    })
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
      let arr = this.data.myWalletResoures;
      arr[0].quantity = (res.data.data.surplus / 100).toFixed(2);
      arr[1].quantity = res.data.data.integral;
      arr[2].quantity = res.data.data.couponCount;
      let arr1 = this.data.involveProducts;
      arr1[0].quantity = res.data.data.collectCount;
      arr1[1].quantity = res.data.data.concernCount;
      arr1[2].quantity = res.data.data.browseCount;
      let arr2 = this.data.orderStatuses;
      console.log(res.data.data.order[0].orderCount)
      arr2[2].quantity = res.data.data.order[2].orderCount;
      arr2[1].quantity = res.data.data.order[1].orderCount;
      arr2[0].quantity = res.data.data.order[0].orderCount;
      arr2[3].quantity = res.data.data.order[3].orderCount;
      console.log(arr2[2]);
      this.setData({
        involveProducts: arr1,
        myWalletResoures: arr,
        hui: res.data.data.prerogative,
        orderStatuses: arr2,
      });
      console.log(this.data.orderStatuses)
    });
  },

  recharge: function (e) {
    console.log(123, this.data.hui)
    wx.navigateTo({
      url: '/pages/myself/tequan/tequan',
    })
  },
  onSelectedOrder1: function (e) {
    console.log(this.data.orderStatuses);
    console.log(e);
    this.handleSelected('/pages/order/list', e.currentTarget.dataset.action);
  },
  onSelectedOrder: function (e) {
    console.log(this.data.orderStatuses);
    console.log(e);
    this.handleSelected('/pages/order/list', e.currentTarget.dataset.action);
  },
  onSelectedToolAndService: function (e) {
    console.log('/pages/myself' + e.currentTarget.dataset.uri);
    this.handleSelected('/pages/myself' + e.currentTarget.dataset.uri, e.currentTarget.dataset.action);

  },
  onSelectedwallet: function (e) {
    console.log(e);
    if (e.currentTarget.dataset.action == 'coupon') {
      this.handleSelected('/pages/myself/coupons/coupons', e.currentTarget.dataset.action);
    }
    else if (e.currentTarget.dataset.action == 'integral') {
      this.handleSelected('/pages/myself/jifen/jifen', e.currentTarget.dataset.action);
    }
    else {
      this.handleSelected('/pages/myself/wallet/index', e.currentTarget.dataset.action);
    }
  },
  onSelectedProduct: function (e) {
    console.log(e);
    let item = e.currentTarget.dataset;
    if (e.currentTarget.dataset.action == 'collection') {
      this.handleSelected('/pages/myself/cang/cang', item.action);
    }
    if (e.currentTarget.dataset.action == 'history') {
      this.handleSelected('/pages/myself/history/history', item.action);
    }
    if (e.currentTarget.dataset.action == 'Concern') {
      this.handleSelected('/pages/myself/Concern/Concern', item.action);
    }
  },
  handleSelected(uri, action) {
    wx.navigateTo({
      url: uri + '?action=' + action,
    })
  }

})