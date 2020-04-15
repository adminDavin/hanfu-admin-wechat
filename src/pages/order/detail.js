// src/pages/order/detail.js
import car from '../../services/car.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hfOrder:{},
    img:'',
  },
  ping:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../ping/ping?orderId='+this.data.hfOrder.id+'&item='+JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  zai:function(){
    let arr=this.data.hfOrder.detailRequestList;
    for(var i=0;i<arr.length;i++){
      arr[i].check1=1;
      for(var j=0;j<arr[i].hfOrderDetailList.length;j++){
        arr[i].hfOrderDetailList[j].check=1;
      }
     
    }
    console.log(arr)
    // arr=JSON.stringify(arr);
   
    // wx.navigateTo({
    //   url: '../pay/pay?arr='+ arr +'&count='+this.data.hfOrder.amount,
    // })
  },
  getma:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../ma/ma?orderId='+this.data.hfOrder.id+'&stoneId='+e.currentTarget.dataset.id,
    })
  },
  gowuliu:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../wuliu/wuliu?orderId='+this.data.hfOrder.id+'&stoneId='+e.currentTarget.dataset.id,
    })
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
   
  gopay:function(){
    this.generateUUID();
    let str =this.generateUUID();
    var that=this;
    let obj={
      // requestId:str,
      outTradeNo:that.data.hfOrder.orderCode,
      userId:wx.getStorageSync('userId')
    }
    console.log(obj)
    var that=this;
    car.pay(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        
        if(that.data.hfOrder.paymentName=='wechart'){
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
                outTradeNo :that.data.hfOrder.orderCode,
                userId :wx.getStorageSync('userId'),
              }
              console.log(obj2)
             car.complate(obj2, (res) => {
                console.log('3',res);
                if(res.data.status==200){

                  let hfOrder1=that.data.hfOrder;
                  hfOrder1.orderStatus='process';
                  that.setData({
                    hfOrder:hfOrder1
                  })
                }
               });
            },
            fail (res) { }
          })
        }else{
      
          let obj2={
            requestId:str,
            transactionType:'rechargeOrder',
            outTradeNo :that.data.hfOrder.orderCode,
            userId :wx.getStorageSync('userId'),
          }
          console.log(obj2)
         car.complate(obj2, (res) => {
            console.log('3',res);
            if(res.data.status==200){
              wx.showToast({
                title: '支付成功',
              })
              let hfOrder1=that.data.hfOrder;
                  hfOrder1.orderStatus='process';
                  that.setData({
                    hfOrder:hfOrder1
                  })
            }
           });
        }
      
      }
    });
  },
  shenback:function(){
    var that=this;
    let obj={
      targetOrderStatus :'controversial',
      Id: that.data.hfOrder.id,
      orderCode:that.data.hfOrder.orderCode,
      originOrderStatus: 'process',
  
    }
    console.log(obj)
    car.modifyStatus(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        wx.showToast({
          title: '申请成功',
        })
        let hfOrder1=that.data.hfOrder;
        hfOrder1.orderStatus='controversial';
        that.setData({
          hfOrder:hfOrder1
        })
      }else{
        wx.showToast({
          title: '申请失败',
        })
      }
    });
  },
  // 确认收获
  yunsong:function(){
    var that=this;
    let obj={
      targetOrderStatus :'evaluate',
      Id: that.data.hfOrder.id,
      orderCode:that.data.hfOrder.orderCode,
      originOrderStatus: 'transport',
  
    }
    console.log(obj)
    car.modifyStatus(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        wx.showToast({
          title: '已确认',
        })
        let hfOrder1=that.data.hfOrder;
        hfOrder1.orderStatus='evaluate';
        that.setData({
          hfOrder:hfOrder1
        })
      }else{
        wx.showToast({
          title: '操作失败',
          icon:'none'
        })
      }
    });
  },
 cancel:function(){
   var that=this;
  let obj={
    targetOrderStatus :'cancel',
    Id: that.data.hfOrder.id,
    orderCode:that.data.hfOrder.orderCode,
    originOrderStatus: 'payment',

  }
  console.log(obj)
  car.modifyStatus(obj, (res) => {
    console.log(res);
    if(res.data.status==200){
      wx.showToast({
        title: '取消成功',
      })
      let hfOrder1=that.data.hfOrder;
      hfOrder1.orderStatus='cancel';
      that.setData({
        hfOrder:hfOrder1
      })
    }else{
      wx.showToast({
        title: '取消失败',
      })
    }
  });
  
 },
  fanhui(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function() {
          // console.log('成功！')
      }
    })
    // wx.na({
    //   url: '/pages/order/list?action=' + this.data.hfOrder.orderStatus,
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options);
    let params = JSON.parse(decodeURIComponent(options.hfOrder));
    console.log(params);
   
    for(var i=0;i<params.detailRequestList.length;i++){
     
      for(var j=0;j<params.detailRequestList[i].hfOrderDetailList.length;j++){
        params.detailRequestList[i].hfOrderDetailList[j].hfDesc.sellPrice=(params.detailRequestList[i].hfOrderDetailList[j].hfDesc.sellPrice/100).toFixed(2)
      }
     
    }
    console.log(params);
    this.setData({hfOrder: params});
    // let obj={
    //   orderCode:this.data.hfOrder.orderCode,
    //   orderStatus:this.data.hfOrder.orderStatus,
    //   orderType:this.data.hfOrder.orderType,
    //   userId:wx.getStorageSync('userId'),
    // }
    // car.getdetail(obj, (res) => {
    //   console.log(res);
      
    //   this.setData({hfOrder: res.data.data[0]});
    // });

    // if (params.paymentName =="wechart"){
    //   params.paymentNameCN="微信支付"
    // } else if(params.paymentName == "balance"){
    //   params.paymentNameCN = "余额支付"
    // }
    // let hfGoodsSpecs = params.gooodsDesc.hfGoodsSpecs;
    // let str='';
    // for (let index in hfGoodsSpecs) {
    //   str = str + hfGoodsSpecs[index].hfValue+''
    // }
    // params.goodsSpecs=str
   
    console.log(params)
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
    this.setData({
      img: app.endpoint.file
     })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})