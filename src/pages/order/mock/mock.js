// src/pages/order/mock/mock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hfOrder: {
      actualPrice: 10,
      amount: 10,
      fileId: 195,
      freight: 0,
      goodsId: 1,
      goodsName: "毛巾",
      goodsSpecs: "红色15*10棉",
      gooodsDesc: {
        fileIds: [195],
        goodsDesc: "紫色 x xl xl",
        goodsName: "毛巾",
        hfGoodsSpecs: [{
            goodsId: 1,
            hfName: "颜色",
            hfValue: "红色",
            id: 1,
            specType: "1",
            specUnit: "1"
          },
          {
            goodsId: 1,
            hfName: "大小",
            hfValue: "15*10",
            id: 2,
            specType: "1",
            specUnit: "1"
          },
          {
            goodsId: 1,
            hfName: "材质",
            hfValue: "棉",
            id: 3,
            specType: "1",
            specUnit: "1"
          }
        ],
        id: 1,
        isUsePriceMode: 0,
        modifyTime: "2019-11-03T18:39:22",
        priceId: 1,
        productId: 1,
        quantity: 10,
        respStatus: 1,
        sellPrice: 10,
        warehouseId: 1
      },
      hfRemark: "订单备注",
      id: 201,
      image: "https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=195",
      modifyTime: "2020-02-08T18:07:22",
      orderCode: "edd6ec5252db4b14a64737d1b3b6e22b",
      orderStatus: "pickup",
      orderStatusDesc: "待处理",
      orderType: "nomalOrder",
      payStatus: 1,
      paymentName: "wechart",
      paymentNameCN: "微信支付",
      paymentType: 1,
      quantity: 10,
      stoneId: 1,
      stoneName: "思维创造店铺",
      takingType: "selfPickUp",
      userId: 974,
    }
  },
  todetail() {
    wx.navigateTo({
      url: '/pages/order/detail?hfOrder=' + encodeURIComponent(JSON.stringify(this.data.hfOrder)),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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