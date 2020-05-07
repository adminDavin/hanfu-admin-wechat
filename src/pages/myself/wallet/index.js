import quan from '../../../services/hf-tequan.js';
import car from '../../../services/car.js';
const app = getApp();
// var util = require('../../../utils/util.js')
// const apiCart = require('../../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'',
    surplus:0,
    id:'',
    amount:'',
    userId:'',
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
usernameInput: function (e) {
  this.setData({
    amount: e.detail.value
  })
  console.log(this.data.amount)
},
  onShow: function (options) {
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        console.log(res);
        that.setData({
          userId: res.data
        })
        quan.findInfoByUserId(that.data.userId, (res) => {
          console.log(res);
          that.setData({
            surplus: (res.data.data.surplus/100).toFixed(2)
          })
         
         });
         quan.yuMing(that.data.userId, (res) => {
          console.log(res);
          that.setData({
            xi: res.data.data
          })
          let arr=that.data.xi;
          for(var i=0;i<arr.length;i++){
            arr[i].amount=(arr[i].amount/100).toFixed(2)
          }
          that.setData({
            xi:arr
          })
         });
         
      },
    })
  },
create:function(){
  let str ='';
  if(this.data.str==''){
   str =this.generateUUID();
   this.setData({
     str: str
    })
  }else{
   str=this.data.str;
  }
  var that=this;
  if(that.data.amount==''){
    wx.showToast({
      title: '请输入充值金额',
      icon:'none'
    })
    return false;
  }
  let obj={
    requestId:str,
    sellPrice:that.data.amount*100,
    hfRemark :'充值订单',
    orderType :'rechargeOrder',
    paymentName :'wechart',
    userId :that.data.userId,
  }
  console.log(obj)
  car.createOrder(obj ,(res) => {
  console.log(res);
  if(res.data.status==200){
    that.setData({
      id:res.data.data.id
    })
    let obj1={
      requestId: str,
      payOrderId :that.data.id,
      userId :that.data.userId,
    }
    console.log(obj1)
    quan.pay(obj1 , (res) => {
      console.log(res);
      if(res.data.status==200){
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonce_str,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success (res) { 
            console.log(res);
            let obj2={
              requestId:str,
              transactionType:'rechargeOrder',
              outTradeNo :that.data.id,
              userId :that.data.userId,
            }
          car.complate(obj2, (res) => {
              console.log(res);
              quan.findInfoByUserId(that.data.userId, (res) => {
                console.log(res);
                that.setData({
                  surplus: (res.data.data.surplus/100).toFixed(2)
                })
               });
               quan.yuMing(that.data.userId, (res) => {
                console.log(res);
                that.setData({
                  xi: res.data.data,
                  str:''
                })
                let arr=that.data.xi;
                for(var i=0;i<arr.length;i++){
                  arr[i].amount=(arr[i].amount/100).toFixed(2)
                }
                that.setData({
                  xi:arr
                })
               });
             });
          },
          fail (res) { }
        })
      }
    });
  }
     

});
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})