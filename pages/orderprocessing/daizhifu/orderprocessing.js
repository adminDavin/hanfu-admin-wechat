// pages/orderprocessing/orderprocessing.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dingdan: '',
    goodsList: [],
    addid: '',
    hfProvince: '',
    hfCity: '',
    hfAddressDetail: '',
    phoneNumber: '',
    goodsprice: '',
    price:0,
    orderId:''
  },
  //返回
  fanhui() {
    wx.switchTab({
      url: '../../shopping/shopping',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    let dingdan=options.orderid
    that.setData({
      dingdan:dingdan
    })
    that.getList()
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
  getList: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + "/order/queryOrder",
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        orderDetailId: that.data.dingdan
      },
      success: function (res) {
        console.log("成功", res)
        let orderList = res.data.data[0];
        let addid = orderList.userAddressId
        let amount=orderList.amount;
        let goodsprice = orderList.purchaseQuantity * orderList.purchasePrice
        that.setData({
          goodsList: orderList,
          addid: addid,
          goodsprice: goodsprice,
          amount:amount
        })
        that.getAddress();
      }
    })
  },
  //拿地址
  getAddress() {
    var that = this;
    wx.request({
      url: app.globalData.urlLogin + '/user/address/addressDetail',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.addid,
      },
      success: function (res) {
        console.log('获取地址', res);
        that.setData({
          hfProvince: res.data.data.hfProvince,
          hfCity: res.data.data.hfCity,
          hfAddressDetail: res.data.data.hfAddressDetail,
          phoneNumber: res.data.data.phoneNumber
        })

      }
    })
  },
  //去支付
  gopay(){
   var that=this;
   let goodslist=that.data.goodsList;
   let ordersid=goodslist.ordersId;
   that.setData({
     orderId:ordersid
   })
   that.lijicz();
  },
  /* 微信支付 */
  lijicz: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.unitedPayRequest(res.data.userInfo.openId);
      },
    })
  },
  /*统一支付接口*/
  unitedPayRequest: function (openid) {
    var that = this;
    //统一支付
    wx.request({
      url: app.globalData.urlRefund + '/pay/wxpay',
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: {
        id: that.data.userId,
        body: '订单',
        openId: openid,
        total_fee: that.data.amount,
      }, //设置请求的 header
      success: function (res) {
        console.log("返回商户", res.data);
        let config = res.data.data.data
        let timeStamp = config.timeStamp
        let pac = config.package
        let sig = config.signType
        let nonceStr = config.nonceStr
        let paySign = config.paySign
        var param = {
          "timeStamp": timeStamp,
          "package": pac,
          "paySign": paySign,
          "signType": sig,
          "nonceStr": nonceStr
        }
        that.processPay(param);
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
              that.changeStatus();
            } else if (res.cancel) { }
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

  // 修改订单状态
  changeStatus() {
    var that = this
    wx.request({
      url: app.globalData.url + '/order/updatestatus',
      method: 'post',
      data: {
        id: 12,
        orderId: that.data.ordersId
      },
      success(res) {
        wx.navigateTo({
          url: '../mydingdan/mydingdan'
        })
      },
      fail(res) {
        console.log(res.data.data)
      }
    })
  },
  //取消订单
  quxiaodingdan(){
    var that=this;
    wx.request({
      url: app.globalData.url+'/order/updatestatus',
      method:'post',
      data:{
        id:23,
        orderId:that.data.ordersId
      },
      success(res){
        if(res.data.data==1){
        wx.showToast({
          title: '订单已取消',
          mask:true
        })
        wx.navigateTo({
          url: '../yiquxiao/orderprocessing?orderid='+that.data.dingdan,
        })
        }
      }
    })
  }
})