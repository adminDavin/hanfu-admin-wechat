// src/pages/order/list.js
const app = getApp();

import hfOrderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatuses: [{
        action: "all",
        selectedSytle: 'hengxian',
        desc: "全部"
      }, {
        action: "payment",
        selectedSytle: '',
        desc: "待付款"
      }, {
        action: "process",
        selectedSytle: '',
        desc: "待处理"
      }, {
        action: "shipped",
        selectedSytle: '',
        desc: "待发货"
      }, 
       {
        action: "transport",
        selectedSytle: '',
        desc: "待收货"
      },{
        action: "pickup",
        selectedSytle: '',
        desc: "待提货"
      }, {
        action: "evaluate",
        selectedSytle: '',
        desc: "待评价"
      }, {
        action: "controversial",
        selectedSytle: '',
        desc: "退换/售后"
      }, {
        action: "cancel",
        selectedSytle: '',
        desc: "已取消"
      }
    ],
    hfOrders: [],
    hfOrdersAll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userId = wx.getStorageSync('userId');
    console.log(options);
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index?orderStatus=payment',
      });
    } else {
      options.userId = userId;
      if (typeof (options.action) == 'undefined' || options.action == 'finished') {
        options.action = "all";
      } else {
        let orderStatuses = this.data.orderStatuses;
        for (let selected of orderStatuses) {
          if (selected.action == options.action) {
            selected.selectedSytle = 'hengxian'
          } else {
            selected.selectedSytle = ""
          }
          this.setData({
            orderStatuses: orderStatuses
          })
        }
      }
      this.setData(options);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log(this.data);
    hfOrderApi.queryOrder(this.data.userId, this.data.action, (res) => {
      console.log(res);
      let status = {}
      for (let orderStatus of this.data.orderStatuses) {
        status[orderStatus.action] = orderStatus.desc;
      }
      let hfOrders = res.data.data;

      for (let hfOrder of hfOrders) {
        hfOrder.orderStatusDesc = status[hfOrder.orderStatus];
        if (typeof(hfOrder.fileId) != 'undefined') {
          hfOrder.image = app.endpoint.file + '/goods/getFile?fileId=' + hfOrder.fileId;
        }
        if (typeof(hfOrder.hfDesc) != 'undefined') {
          hfOrder.gooodsDesc = JSON.parse(hfOrder.hfDesc);
        }
      }
      this.setData({
        hfOrders: res.data.data,
        hfOrdersAll: res.data.data
      });
      console.log(hfOrders)
    });
  },
  onSelectedNav: function(e) {
    let orderStatuses = this.data.orderStatuses;
    let action = e.currentTarget.dataset.action;
    let hfOrders = this.data.hfOrdersAll
    for (let selected of orderStatuses) {
      if (selected.action == action) {
        selected.selectedSytle = 'hengxian'
      } else {
        selected.selectedSytle = ""
      }
      this.setData({
        orderStatuses: orderStatuses
      })
    }
    if (action == 'all') {
      this.setData({
        hfOrders: this.data.hfOrdersAll
      })
    } else {
      let hf = hfOrders.filter((hfOrder, index) => {
        console.log(hfOrder)
        return hfOrder.orderStatus == action
      })
      this.setData({
        hfOrders: hf
      })
    }
  },
  onSelectedOrder: function(e) {
    wx.navigateTo({
      url: '/pages/order/detail?hfOrder=' + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.hfOrder)),
    })
  }
})