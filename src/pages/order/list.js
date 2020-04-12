// src/pages/order/list.js
const app = getApp();

import hfOrderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    action:'all',
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
        desc: "处理中"
      }, {
        action: "transport",
        selectedSytle: '',
        desc: "运送中"
      }, 
       {
        action: "complete",
        selectedSytle: '',
        desc: "已完成"
      },{
        action: "cancel",
        selectedSytle: '',
        desc: "已取消"
      }, {
        action: "evaluate",
        selectedSytle: '',
        desc: "待评价"
      }, {
        action: "controversial",
        selectedSytle: '',
        desc: "交易纠纷"
      }
    ],
    hfOrders: [],
    hfOrdersAll: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let userId = wx.getStorageSync('userId');
    // console.log(options);
    // if (util.isEmpty(userId)) {
    //   wx.navigateTo({
    //     url: '/pages/login/index?orderStatus=payment',
    //   });
    // } else {
    //   options.userId = userId;
    //   if (typeof (options.action) == 'undefined' || options.action == 'finished') {
    //     options.action = "all";
    //   } else {
    //     let orderStatuses = this.data.orderStatuses;
    //     for (let selected of orderStatuses) {
    //       if (selected.action == options.action) {
    //         selected.selectedSytle = 'hengxian'
    //       } else {
    //         selected.selectedSytle = ""
    //       }
    //       this.setData({
    //         orderStatuses: orderStatuses
    //       })
    //     }
    //   }
    //   this.setData(options);
    // }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      img: app.endpoint.file
     })
    console.log(this.data);
    hfOrderApi.queryOrder( wx.getStorageSync('userId'), this.data.action, (res) => {
  
      let arr=res.data.data;
     for(var i=0;i<arr.length;i++){
       let count=0;
      for(var j=0;j<arr[i].detailRequestList.length;j++){
        for(var a=0;a<arr[i].detailRequestList[j].hfOrderDetailList.length;a++){ 
          count+=arr[i].detailRequestList[j].hfOrderDetailList[a].quantity;
          arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc=JSON.parse(arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc)
          
        }  
       
      }
      arr[i].userId=count;
     }
      this.setData({
        hfOrders:arr,
       
      });
     
    });
  },
  onSelectedNav: function(e) {
   console.log(e);
    let action = e.currentTarget.dataset.action;
    let arr1=this.data.orderStatuses;
    console.log(arr1)
    for(var i=0;i<arr1.length;i++){
      arr1[i].selectedSytle = '';
    }

    arr1[e.currentTarget.dataset.index].selectedSytle= 'hengxian';
   this.setData({
    orderStatuses:  arr1
   })
    hfOrderApi.queryOrder( wx.getStorageSync('userId'), action, (res) => {
      console.log(res);
      console.log(action);
      let arr=res.data.data;
     for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].detailRequestList.length;j++){
        for(var a=0;a<arr[i].detailRequestList[j].hfOrderDetailList.length;a++){ 
          arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc=JSON.parse(arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc)
        }  
      }
     }
      this.setData({
        hfOrders:arr,
      });
  })
},
  // onSelectedOrder : function(e) {
  //   if (e.currentTarget.dataset.hfOrder.orderType =='shoppingOrder'){
  //     wx.navigateTo({
  //       url: '/pages/payment/payment?userId=' + e.currentTarget.dataset.hfOrder.userId + '&outTradeNo=' + e.currentTarget.dataset.hfOrder.orderCode + '&paymentName=' + e.currentTarget.dataset.hfOrder.paymentName,
  //     })
  //   }else{
  //     wx.redirectTo({
  //       url: '/pages/order/detail?hfOrder=' + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.hfOrder)),
  //     })
  //   }
  // }
})
