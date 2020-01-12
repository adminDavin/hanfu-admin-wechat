// pages/mydingdan/mydingdan.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: '',
    navid: 1,
    productlist: [],
    pro:[],
    tipshow: false,
    showPayPwdInput: false,  //是否展示密码输入层
    pwdVal: '',  //输入的密码
    payFocus: true, //文本框焦点
    amount:'',
  },

  toggle: function(e) {
    var that = this;
    let navid = e.currentTarget.dataset.id;
    that.setData({
      navid: navid
    })
    if (navid == 1) {
      that.getOrder();
    } else if (navid == 2) {
      that.getfukuan();
    } else if (navid == 3) {
      that.gettihuo();
    } else if (navid == 4) {
      that.getshouhuo();
    } else if (navid == 5) {
      that.getwancheng();
    } else if (navid == 6) {
      that.getquxiao();
    }
  },
  //去到订单详情页
  godetail(e) {
    console.log(e)
    let orderid = e.currentTarget.dataset.orderid;
    let orderstatus = e.currentTarget.dataset.orderstatus;
    if (orderstatus == "待发货") {
      wx.navigateTo({
        url: '../orderprocessing/daifahuo/orderprocessing?orderid='+orderid,
      })
    } else if (orderstatus == "待收货"){
      wx.navigateTo({
        url: '../orderprocessing/daishouhuo/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "待支付") {
      wx.navigateTo({
        url: '../orderprocessing/daizhifu/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "待提货") {
      wx.navigateTo({
        url: '../orderprocessing/daitihuo/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "已完成") {
      console.log(orderid)
      wx.navigateTo({
        url: '../orderprocessing/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "已取消") {
      wx.navigateTo({
        url: '../orderprocessing/yiquxiao/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "已退款") {
      wx.navigateTo({
        url: '../orderprocessing/yituikuan/orderprocessing?orderid=' + orderid,
      })
    } else if (orderstatus == "退款中") {
      wx.navigateTo({
        url: '../orderprocessing/tuikuanzhong/orderprocessing?orderid=' + orderid,
      })
    }
    
  },

  // 按钮
  //确认收货
  querenshouhuo(e) {
    let orderid = e.currentTarget.dataset.orderid;
    var that = this;
    let navid = that.data.navid;
    wx.request({
      url: app.globalData.url + '/order/updatestatus',
      method: 'post',
      data: {
        id: 22,
        orderId: orderid
      },
      success(res) {
        if (res.data.data = 1) {
          wx.showToast({
            title: '订单收货确认完成',
            mask: true
          })
        } else {
          wx.showToast({
            title: '订单收货确认失败',
            mask: true
          })
        }
        if (navid == 1) {
          that.getOrder();
        } else if (navid == 4) {
          that.getshouhuo();
        }
      },
    })
  },
  //提醒发货
  tixing() {
    wx.showToast({
      title: '已经提醒店家啦，请耐心等待',
    })
  },
  //再次购买
  againbuy(e) {
    let goodsid = e.currentTarget.dataset.goodsid;
    wx.navigateTo({
      url: '../order/order?goodsid=' + goodsid,
    })
  },
  //评价晒单
  pingjia(e) {
    let orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../evaluate/evaluateList/evaluateList?orderid=' + orderid,
    })
  },
  //申请退款
  tuikuan(e) {
    let orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../tuikuan/tuikuan?orderid=' + orderid,
    })
  },
  // 查看物流
  wuliu(e) {
    let orderid = e.currentTarget.dataset.orderid;
    let logisticsordersid = e.currentTarget.dataset.logisticsordersid;
    let logisticscompany = e.currentTarget.dataset.logisticscompany;
    wx.navigateTo({
      url: '../orderform/logistics?orderid=' + orderid + '&company=' + logisticscompany + '&wuliuid=' + logisticsordersid,
    })
  },
  // 去支付
  gopay(e) {
    let orderId = e.currentTarget.dataset.orderid;
    let price = e.currentTarget.dataset.price;
    that.setData({
      ordersId: ordersId,
      amount:price
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
  //核销
  hexiao: function(e) {
    let orderid = e.currentTarget.dataset.orderid;
    wx.navigateTo({
      url: '../hexiao/hexiao?order=' + orderid,
    })
  },
  getOrder() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/queryByUserid',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: this.data.userId
      },
      success: function(res) {
        console.log('查询订单', res);
        var goods=res.data.data;
        for(var index in goods){
          goods[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + goods[index].fileId;
        }
        console.log(goods)
        that.setData({
          productlist: goods,
          pro:goods
        })
      }
    })
  },

  //待付款
  getfukuan() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/queryByUserid',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId
      },
      success: function(res) {
        console.log('查询订单', res);
        let orders = res.data.data
        console.log(orders)
        let goods = [];
        for (var index in orders) {
          if (orders[index].orderDetailStatus == '待支付') {
            orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + orders[index].fileId;
            goods.push(orders[index])
          }
        }
        that.setData({
          productlist: goods,
        })
      }
    })
  },
  //待收货
  getshouhuo() {
    var that = this;
    wx.request({
      url: app.globalData.url + '/order/queryByUserid',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId
      },
      success: function(res) {
        console.log('查询订单', res);
        let orders = res.data.data
        console.log(orders)
        let goods = [];
        for (var index in orders) {
          if (orders[index].orderDetailStatus == '待收货') {
            orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + orders[index].fileId;
            goods.push(orders[index])
          }
        }
        console.log(goods)
        that.setData({
          productlist: goods,
        })
      }
    })
  },
  //待提货
  gettihuo() {
    var that = this;
    let orders = that.data.pro
    let goods = [];
    for (var index in orders) {
      if (orders[index].orderDetailStatus == '待提货') {
        orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + orders[index].fileId;
        goods.push(orders[index])
      }
    }
    that.setData({
      productlist: goods,
    })
  },
  //已完成
  getwancheng() {
    var that = this;
    let orders = that.data.pro
    let goods = [];
    for (var index in orders) {
      if (orders[index].orderDetailStatus == '已完成') {
        orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + orders[index].fileId;
        goods.push(orders[index])
      }
    }
    that.setData({
      productlist: goods,
    })
  },
  getquxiao() {
    var that = this;
    let orders = that.data.pro
    let goods = [];
    for (var index in orders) {
      if (orders[index].orderDetailStatus == '已取消') {
        orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + orders[index].fileId;
        goods.push(orders[index])
      }
    }
    that.setData({
      productlist: goods,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var that = this;
    let tag = options.tag;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId: res.data.userId
        })
        console.log(that.data.userId)
      },
      fail(res) {
        that.setData({
          tipshow: true
        })
      }
    })
    if (tag == 1) {
      that.getOrder();
    } else if (tag == 2) {
      that.setData({
        navid: tag
      })
      that.getfukuan();
    } else if (tag == 4) {
      that.setData({
        navid: tag
      })
      that.getshouhuo();
    }
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