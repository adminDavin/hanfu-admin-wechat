// pages/opp/opp.js
const app = getApp();
var util = require('../../utils/util.js')
const apiCart = require('../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grid:[],
    tag:0,
    userId:975,
    money:'',
    times:'',
    chongzhiList:[],
    goumaiList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (){
    var that=this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        userId:res.data.userId
      },
    })
    that.getchmsg();
  },
  /* 微信支付 */
  lijicz: function (e) {
    let money=e.currentTarget.dataset.money;
    let times=e.currentTarget.dataset.id
    var that = this;
    console.log(that.data.tag)
    that.setData({
      money:money,
      times:times
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId:res.data.userId
        })
        that.unitedPayRequest(res.data.userInfo.openId);
      },
    })  
  },
  /*统一支付接口*/
  unitedPayRequest: function (openid) {
    var that = this;
    //统一支付
    wx.request({
      url: app.globalData.urlRefund+'/pay/wxpay',
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: {
        id: that.data.userId,
        body:'会员',
        openId:openid,
        total_fee:1,
      }, //设置请求的 header
      success: function (res) {
        console.log("返回商户", res.data);
        let config=res.data.data.data
        let timeStamp = config.timeStamp
        let pac = config.package
        let sig = config.signType
        let nonceStr = config.nonceStr
        let paySign = config.paySign  
        var param = { "timeStamp": timeStamp, "package": pac, "paySign": paySign, "signType": sig, "nonceStr": nonceStr }
          that.processPay(param);
        // }
      },
    })
  },

  /* 小程序支付 */
  processPay: function (param) {
    var that=this;
    var tag=that.data.tag;
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        console.log("wx.requestPayment返回信息", res);
        wx.showModal({
          title: '支付成功',
          content: '官方号中收到支付凭证',
          showCancel: false,
          success: function (res) {
            if(tag==0){
              that.grant()
            }else if(tag==1){
              that.buy()
            }
          }
        })
      },
      fail: function () {
        console.log("支付失败");
      },
      complete: function () {
        console.log("支付完成");
      }
    })
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

  },
  //充值列表
  chongzhi(e){
    console.log(e)
    let tag=e.detail.index
    var that=this;
    that.setData({
      tag:tag
    })
    if(tag==0){
      that.getchmsg()
    }else{
      that.getgmmsg()
    }
  },
  //获取充值会员信息
  getchmsg(){
    var that=this;
    apiCart.getList(app.globalData.urlpay, '/member/selectRe', (res) => {
      if (res.data.status == 200) {
        that.setData({
          chongzhiList:res.data.data
        })
      }
      console.log(res)
    });
  },
  //获取购买会员信息
  getgmmsg() {
    var that = this;
    apiCart.getList(app.globalData.urlpay, '/member/selectBuy', (res) => {
      if (res.data.status == 200) {
        that.setData({
          goumaiList: res.data.data
        })
      }
      console.log(res)
    });
  },
  // 购买会员
  buy:function(){
    var that=this;
   wx.request({
     url: app.globalData.urlpay + "/member/buyMember",
     method:'get',
     header: {
      "Content-Type": "application/x-www-form-urlencoded"
     },
     data:{
      money:that.data.money,
      number:that.data.times,
      total:that.data.money,
      userId:that.data.userId
     },
     success: function(res) {
       console.log("成功",res)
      wx.showToast({
        title: '购买会员成功',
        mask:true
      })
       wx.navigateTo({
         url: './vip/vip',
       })
     }
   })

  },
  // 赠送会员
  grant:function(){
    var that=this;
    wx.request({
      url: app.globalData.urlpay + "/member/rechargeMember",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
       money:that.data.money,
       number:that.data.times,
       total:that.data.money,
       userId:that.data.userId
      },
      success: function(res) {
        console.log("成功",res)
        wx.showToast({
          title: '充值会员成功',
          mask:true
        })
        wx.navigateTo({
          url: './vip/vip',
        })
      }
    })
 
   }

})