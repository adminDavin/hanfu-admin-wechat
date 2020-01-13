// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quhuomethod: true,
    zhifumethod: true,
    textshow: false,
    userId: 975,
    arr:[],
    goodsid: [],
    elevalue: '',
    addressList: '',
    price: 0,
    total: 0,
    yunfei: 3,
    amount:'',
    purchasePrice:'',
    purchaseQuantity:'',
    userAddressId:'',
    selectedGoods: {},
  },

  showtext() {
    var that = this;
    that.setData({
      textshow: !that.data.textshow
    })
    console.log(that.data.textshow)
  },
  getVal: function (e) {
    console.log(e.detail.value);
    let elevalue = e.detail.value;
    this.setData({
      elevalue: elevalue
    })
  },

  //方式改变
  changeMethod: function () {
    var that = this;
    that.setData({
      quhuomethod: !that.data.quhuomethod
    })
    if (that.data.quhuomethod == false) {
      let total = that.data.yunfei + that.data.price
      that.setData({
        yunfei: 3,
        total: total
      })
    } else {
      that.setData({
        total: that.data.price
      })
    }
    console.log(that.data.total)
  },

  zhifuchange: function () {
    var that = this;
    that.setData({
      zhifumethod: !that.data.zhifumethod
    })
    console.log(that.data.zhifumethod)
  },

  // 拿地址
  getAddress() {
    var that = this;
    wx.request({
      url: app.globalData.urlLogin + '/user/address/addressDetail',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        id: that.data.userAddressId
      },
      success: function (res) {
        console.log('获取地址', res);
            that.setData({
              addressList: res.data.data
            })
      }
    })
  },
  // 拿商品信息
  getGoods() {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/byGoodsId',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let arr=res.data.data;
        arr.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + arr[0].fileId;
        that.setData({
          arr: res.data.data
        })
      },
      data: {
        goodsId:5 //that.data.goodsid
      }
    })
  },

  // 提交订单
  submit() {
    var that = this;
    let googsId = 5 //that.data.goodsid
    console.log(googsId)
    let distribution = '邮寄'
    let payMethodName = '微信支付'
    var zhifumethod = that.data.zhifumethod
    var quhuomethod = that.data.quhuomethod
    if (quhuomethod == true) {
      distribution = '自提';
    } else {
      distribution = '邮寄'
    }
    if (zhifumethod == true) {
      payMethodName = '微信支付'
    } else {
      payMethodName = '余额支付'
    }
    console.log(this.data.selectedGoods);
    wx.request({
      url: app.globalData.url + '/order/creat',
      method: 'get',
      data: {
        amount: this.data.selectedGoods.totalprice,
        distribution: distribution,
        hfRemark: that.data.elevalue,
        googsId: this.data.selectedGoods.goodsId,
        userId: this.data.userId,
        payMethodName: payMethodName,
        purchaseQuantity: this.data.selectedGoods.goodsNum,
        userAddressId: that.data.addressList.id,
        purchasePrice: this.data.selectedGoods.totalprice,
      },
      success(res) {
        console.log(res);

        let ordersId = res.data.data[0].ordersId;
        that.setData({
          ordersId: ordersId
        })
        that.lijicz();
      }
    })
  },
  /* 微信支付 */
  lijicz: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: (res) => {
        console.log(res);
        this.unitedPayRequest(res.data.userInfo.openId);
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
        id: that.data.ordersId, //订单ID
        body: '单品',
        openId: openid,
        total_fee: 1,
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
              wx.navigateTo({
                url: '../mydingdan/mydingdan'
              })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var goodsid = options.goodsid
    console.log(goodsid)
    let purchasePrice = options.purchasePrice;
    let purchaseQuantity = options.purchaseQuantity;
    let amount = options.amount;
    // let goodid = options.goodsid;
    let userAddressId = options.userAddressId;
    let selectedGoods = {};
    if (app.globalData.selectedGoods.length > 0) {
      let selectedGoodsArr = JSON.parse(JSON.stringify(app.globalData.selectedGoods));
      console.log(selectedGoodsArr);
      selectedGoods = selectedGoodsArr[0];
      userAddressId = selectedGoods.selectedAddress.id;
      goodsid = selectedGoods.selectedGoods.goodsId;
    }
    console.log(app.globalData.selectedGoods);
    wx.getStorage({
      key: 'user',
      success:  (res) => {
        this.setData({
          userId: res.data.userId,
          goodsid: goodsid,
          amount:amount,
          purchasePrice: purchasePrice,
          purchaseQuantity: purchaseQuantity,
          userAddressId: userAddressId,
          selectedGoods: selectedGoods.selectedGoods.selectedGoods
        })
        this.getAddress()
        this.getGoods()
        console.log(this.data)
      },
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

  }
})