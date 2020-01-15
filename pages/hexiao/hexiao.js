// pages/hexiao/hexiao.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '',
    orderId: '',
    qrAdd: '',
    qrshow: false
  },

  tiHuo: function(e) {
    var that = this;
    console.log(e.currentTarget);
    let goodsid = e.currentTarget.dataset.goodsid;
    that.setData({
      qrshow: true,
      qrAdd: app.globalData.urlHexiao + '/test/activity/create/activity-code?goodsId=' + goodsid + '&orderId=' + that.data.orderId
    })

  },

  guanbi: function() {
    var that = this;
    that.setData({
      qrshow: false
    })
  },
  // 商品信息
  getList: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + "/order/queryOrder",
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        orderId: that.data.orderid
      },
      success: function (res) {
        console.log("成功", res)
        let orders=res.data.data;
        // for(var index in orders){
        //   orders[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + cartList[index].productIcon;
        // }
        that.setData({
          orderList: orders
        })
        console.log(that.data.orderList)
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this;
    let orderid=options.orderid;
    that.setData({
      orderid:orderid
    })
    console.log(this.data, 'dsfdf');
    that.getList();
  },
})