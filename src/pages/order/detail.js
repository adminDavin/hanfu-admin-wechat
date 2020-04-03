// src/pages/order/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hfOrder:{},
  },
  fanhui(){
    wx.redirectTo({
      url: '/pages/order/list?action=' + this.data.hfOrder.orderStatus,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(decodeURIComponent(options.hfOrder));
    // if (params.paymentName =="wechart"){
    //   params.paymentNameCN="微信支付"
    // } else if(params.paymentName == "balance"){
    //   params.paymentNameCN = "余额支付"
    // }
    // let hfGoodsSpecs = params.gooodsDesc.hfGoodsSpecs;
    // let str='';
    // for (let index in hfGoodsSpecs) {
    //   str = str + hfGoodsSpecs[index].hfValue+''
    // }
    // params.goodsSpecs=str
    this.setData({hfOrder: params});
    console.log(params)
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