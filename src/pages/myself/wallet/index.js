import quan from '../../../services/hf-tequan.js';
const app = getApp();
// var util = require('../../../utils/util.js')
// const apiCart = require('../../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    surplus:0,
    id:'',
    amount:'',
    userId:'',
  },
  
usernameInput: function (e) {
  this.setData({
    amount: e.detail.value
  })
  console.log(this.data.amount)
},
  onLoad: function (options) {
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
            surplus: res.data.data.surplus
          })
         
         });
      },
    })
  },
create:function(){
  var that=this;
  if(that.data.amount==''){
    wx.showToast({
      title: '请输入充值金额',
      icon:'none'
    })
    return false;
  }
  let obj={
    amount:that.data.amount*100,
    hfRemark :'充值订单',
    orderType :'rechargeOrder',
    paymentName :'wechart',
    userId :that.data.userId,
  }
  console.log(obj)
quan.create(obj ,(res) => {
  console.log(res);
  if(res.data.status==200){
    that.setData({
      id:res.data.data.orderCode
    })
    let obj1={
      outTradeNo :that.data.id,
      userId :that.data.userId,
    }
    quan.pay(obj1 , (res) => {
      console.log(res);
      if(res.data.status==200){
        let obj2={
          transactionType:'rechargeOrder',
          outTradeNo :that.data.id,
          userId :that.data.userId,
        }
        quan.complate(obj2, (res) => {
          console.log(res);
         });
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonce_str,
          package: res.data.data.package,
          signType: 'MD5',
          paySign: res.data.data.paySign,
          success (res) { 
            console.log(res);

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
  onShow: function() {

  },

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