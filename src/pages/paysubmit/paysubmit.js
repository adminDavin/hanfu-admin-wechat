// src/pages/paysubmit/paysubmit.js
const app = getApp();
import car from '../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    statusBarHeight:'',
    paymentName:'',
    outTradeNo:'',
    str:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      outTradeNo :options.str, 
      outTradeNo :options.outTradeNo, 
      paymentName:options.paymentName,
    })
    let obj={
      requestId:this.data.str,
      outTradeNo :this.data.outTradeNo,
      userId:wx.getStorageSync('userId')
    }
    console.log(obj)
    var that=this;
    car.pay(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        
        if(that.data.paymentName=='wechart'){
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonce_str,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success (res) { 
              console.log(res);
              let obj2={
                requestId:that.data.str,
                transactionType:'rechargeOrder',
                outTradeNo :that.data.outTradeNo,
                userId :wx.getStorageSync('userId'),
              }
              console.log(obj2)
             car.complate(obj2, (res) => {
                console.log('3',res);
                // if(res.data.status==200){
                //   that.setData({
                //    show:true
                //   })
                // }
               });
            },
            fail (res) { }
          })
        }else{
      
          let obj2={
            requestId:that.data.str,
            transactionType:'rechargeOrder',
            outTradeNo :that.data.outTradeNo,
            userId :wx.getStorageSync('userId'),
          }
          console.log(obj2)
         car.complate(obj2, (res) => {
            console.log('3',res);
           if(res.data.status==200){
             that.setData({
              show:true
             })
           }
           });
        }
      
      }
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
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          statusBarHeight:res.statusBarHeight
        })
          
       }
     
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