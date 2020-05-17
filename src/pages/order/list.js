// src/pages/order/list.js
const app = getApp();

import hfOrderApi from '../../services/hf-order.js';
import car from '../../services/car.js';
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
        selectedSytle: '',
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
    console.log(options);
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
      this.setData({
        action:options.action
      });
      console.log(this.data.action);

      hfOrderApi.queryOrder( wx.getStorageSync('userId'), this.data.action, (res) => {
        let orderStatuses=this.data.orderStatuses;
        for(var i=0;i<orderStatuses.length;i++){
           
         orderStatuses[i].selectedSytle='';
        }
        for(var i=0;i<orderStatuses.length;i++){
           if(orderStatuses[i].action==this.data.action){
             orderStatuses[i].selectedSytle='hengxian';
           }
        
        }
        this.setData({
          orderStatuses:orderStatuses
        })
         let arr=res.data.data;
        for(var i=0;i<arr.length;i++){
          let count=0;
          arr[i].amount=(arr[i].amount/100).toFixed(2);
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
    // }
  },
  ping:function(e){
    // console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../ping/ping?orderId='+e.currentTarget.dataset.item1.id+'&item='+JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  refund:function(){

  },
  yunsong:function(e){
    var that=this;
    let obj={
      targetOrderStatus :'evaluate',
      Id:  e.currentTarget.dataset.item.id,
      orderCode: e.currentTarget.dataset.item.orderCode,
      originOrderStatus: 'transport',
  
    }
    console.log(obj)
    car.modifyStatus(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        wx.showToast({
          title: '已确认',
        })
        that.chong();
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none'
        })
      }
    });
  },
  shenback:function(e){
    var that=this;
    let obj={
      targetOrderStatus :'controversial',
      Id: e.currentTarget.dataset.item.id,
      orderCode:e.currentTarget.dataset.item.orderCode,
      originOrderStatus: 'process',
       
    }
    console.log(obj)
    car.modifyStatus(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        wx.showToast({
          title: '申请成功',
        })
      that.chong();
      }else{
        wx.showToast({
          title: '申请失败',
        })
      }
    });
  },
  chong:function(){
    var that=this;
    hfOrderApi.queryOrder( wx.getStorageSync('userId'), that.data.action, (res) => {
      let orderStatuses=that.data.orderStatuses;
      for(var i=0;i<orderStatuses.length;i++){
         
       orderStatuses[i].selectedSytle='';
      }
      for(var i=0;i<orderStatuses.length;i++){
         if(orderStatuses[i].action==that.data.action){
           orderStatuses[i].selectedSytle='hengxian';
         }
      
      }
      that.setData({
        orderStatuses:orderStatuses
      })
       let arr=res.data.data;
      for(var i=0;i<arr.length;i++){
        let count=0;
        arr[i].amount=(arr[i].amount/100).toFixed(2);
       for(var j=0;j<arr[i].detailRequestList.length;j++){
         for(var a=0;a<arr[i].detailRequestList[j].hfOrderDetailList.length;a++){ 
           count+=arr[i].detailRequestList[j].hfOrderDetailList[a].quantity;
           arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc=JSON.parse(arr[i].detailRequestList[j].hfOrderDetailList[a].hfDesc)
           
         }  
        
       }
       arr[i].userId=count;
      }
      that.setData({
         hfOrders:arr,
        
       });
      
     });
  },
  cancel:function(e){
    var that=this;
   let obj={
     targetOrderStatus :'cancel',
     Id: e.currentTarget.dataset.item.id,
     orderCode:e.currentTarget.dataset.item.orderCode,
     originOrderStatus: 'payment',
 
   }
   console.log(obj)
   car.modifyStatus(obj, (res) => {
     console.log(res);
     if(res.data.status==200){
       wx.showToast({
         title: '取消成功',
       })
       that.chong();
     }else{
       wx.showToast({
         title: '取消失败',
       })
     }
   });
   
  },
  generateUUID:function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
      return uuid ;
    },
  gopay:function(e){
    console.log(e);
    this.generateUUID();
    let str =this.generateUUID();
    var that=this;
    let obj={
      // requestId:str,
      payOrderId:e.currentTarget.dataset.item.payOrderId,
      userId:wx.getStorageSync('userId')
    }
    console.log(obj)
    var that=this;
    car.pay(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        
        if(e.currentTarget.dataset.item.paymentName=='wechart'){
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonce_str,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success (res) { 
              console.log(res);
              let obj2={
                transactionType:'rechargeOrder',
                payOrderId :e.currentTarget.dataset.item.payOrderId,
                userId :wx.getStorageSync('userId'),
              }
              console.log(obj2)
             car.complate(obj2, (res) => {
                console.log('3',res);
                if(res.data.status==200){

                  that.chong();
                }
               });
            },
            fail (res) { }
          })
        }else{
      
          let obj2={
            requestId:str,
            transactionType:'rechargeOrder',
            payOrderId :e.currentTarget.dataset.item.payOrderId,
            userId :wx.getStorageSync('userId'),
          }
          console.log(obj2)
         car.complate(obj2, (res) => {
            console.log('3',res);
            if(res.data.status==200){
              wx.showToast({
                title: '支付成功',
              })
              that.chong();
            }
           });
        }
      
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      img: app.endpoint.file
     })
    console.log(this.data);
  
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
    orderStatuses:  arr1,
    action:action
   })
    hfOrderApi.queryOrder( wx.getStorageSync('userId'), action, (res) => {
      console.log(res);
      console.log(action);
      let arr=res.data.data;
     for(var i=0;i<arr.length;i++){
      arr[i].amount=(arr[i].amount/100).toFixed(2);
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
onUnload: function () {
  wx.navigateBack({
    delta: 3   //默认值是1
  })
},
  onSelectedOrder : function(e) {
    console.log(e.currentTarget.dataset)
    if (e.currentTarget.dataset.hfOrder.orderType =='shoppingOrder'){
      wx.navigateTo({
        url: '/pages/payment/payment?userId=' +  wx.getStorageSync('userId') + '&outTradeNo=' + e.currentTarget.dataset.hfOrder.orderCode + '&paymentName=' + e.currentTarget.dataset.hfOrder.paymentName,
      })
    }else{
      wx.navigateTo({
        url: '/pages/order/detail?hfOrder=' + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.hfOrder)),
      })
    }
  }
})
