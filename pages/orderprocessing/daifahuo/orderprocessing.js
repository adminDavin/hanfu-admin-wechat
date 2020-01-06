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
    goodsprice: ''
  },
  //返回
  fanhui(){
    wx.switchTab({
      url: '../../shopping/shopping',
    })
  },
  //提醒发货
  tixing(){
    wx.showToast({
      title: '已经提醒商家啦，请耐心等待',
      mask:true
    })
  },
  //退款
  tuikuan(e){
    let orderid=e.currentTarget.dataset.orderid;
    let price=e.currentTarget.dataset.price;
    wx.navigateTo({
      url: '../tuikuan/tuikuan?orderid='+orderid+'&price='+price+'goodsid='+that.data.goodsid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(options);
    let dingdan=options.orderid;
    let goodsid=options.goodsid
    that.setData({
      dingdan:dingdan,
      goodsid:goodsid
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
        let orderList = res.data.data;
        let addid = orderList.userAddressId
        let goodsprice = orderList.purchaseQuantity * orderList.purchasePrice
        that.setData({
          goodsList: orderList,
          addid: addid,
          goodsprice: goodsprice
        })
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
})