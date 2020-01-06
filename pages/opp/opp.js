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
    money:'',
    chongzhiList:[],
    goumaiList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (){
    var that=this;
    that.getchmsg();
  },
  /* 微信支付 */
  lijicz: function (e) {
    let money=e.currentTarget.dataset.money;
    var that = this;
    that.setData({
      money:money
    })
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.unitedPayRequest(res.data.userInfo.openId);
      },
    })
    
  },
  /*统一支付接口*/
  unitedPayRequest: function (openid) {
    var that = this;
    //统一支付签名
    var appid = 'wxfa188a42d843a0b0';//appid必填
    var body = '';//商品名必填
    var mch_id = '';//商户号必填
    var nonce_str = util.getNum();//随机字符串，不长于32位。  
    var notify_url = '';//通知地址必填
    var total_fee = that.data.monry; //价格，这是一分钱
    var trade_type = "JSAPI";
    var key = ''; //商户key必填，在商户后台获得
    var out_trade_no = '';//自定义订单号必填

    var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no + '&total_fee=' + total_fee + '™_type=' + trade_type + '&key=' + key;
    console.log("unifiedPayment", unifiedPayment);
    var sign = md5.md5(unifiedPayment).toUpperCase();
    console.log("签名md5", sign);

    //封装统一支付xml参数
    var formData = "<xml>";
    formData += "<appid>" + appid + "</appid>";
    formData += "<body>" + body + "</body>";
    formData += "<mch_id>" + mch_id + "</mch_id>";
    formData += "<nonce_str>" + nonce_str + "</nonce_str>";
    formData += "<notify_url>" + notify_url + "</notify_url>";
    formData += "<openid>" + openid + "</openid>";
    formData += "<out_trade_no>" + that.data.ordernum + "</out_trade_no>";
    formData += "<total_fee>" + total_fee + "</total_fee>";
    formData += "<trade_type>" + trade_type + "</trade_type>";
    formData += "<sign>" + sign + "</sign>";
    formData += "</xml>";
    console.log("formData", formData);
    //统一支付
    wx.request({
      url: '',
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: formData, //设置请求的 header
      success: function (res) {
        console.log("返回商户", res.data);
        var result_code = util.getXMLNodeValue('result_code', res.data.toString("utf-8"));
        var resultCode = result_code.split('[')[2].split(']')[0];
        if (resultCode == 'FAIL') {
          var err_code_des = util.getXMLNodeValue('err_code_des', res.data.toString("utf-8"));
          var errDes = err_code_des.split('[')[2].split(']')[0];
          wx.showToast({
            title: errDes,
            icon: 'none',
            duration: 3000
          })
        } else {
          //发起支付
          var prepay_id = util.getXMLNodeValue('prepay_id', res.data.toString("utf-8"));
          var tmp = prepay_id.split('[');
          var tmp1 = tmp[2].split(']');
          //签名  
          var key = '';//商户key必填，在商户后台获得
          var appId = '';//appid必填
          var timeStamp = util.createTimeStamp();
          var nonceStr = util.randomString();
          var stringSignTemp = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key=" + key;
          console.log("签名字符串", stringSignTemp);
          var sign = md5.md5(stringSignTemp).toUpperCase();
          console.log("签名", sign);
          var param = { "timeStamp": timeStamp, "package": 'prepay_id=' + tmp1[0], "paySign": sign, "signType": "MD5", "nonceStr": nonceStr }
          console.log("param小程序支付接口参数", param);
          that.processPay(param);
        }
      },
    })
  },

  /* 小程序支付 */
  processPay: function (param) {
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
            if (res.confirm) {
            } else if (res.cancel) {
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
   wx.request({
     url: app.globalData.purchase + "/member/buyMember",
     method:'get',
     header: {
      "Content-Type": "application/x-www-form-urlencoded"
     },
     data:{
      money:1,
      number:1,
      total:50,
      userId:2
     },
     success: function(res) {
       console.log("成功",res)

       
       
     }
   })

  },
  // 赠送会员
  grant:function(){
    wx.request({
      url: app.globalData.purchase + "/member/rechargeMember",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
       money:1,
       number:1,
       total:50,
       userId:2
      },
      success: function(res) {
        console.log("成功",res)
 
        
        
      }
    })
 
   }

})