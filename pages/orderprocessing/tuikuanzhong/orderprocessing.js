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
  fanhui() {
    wx.switchTab({
      url: '../../shopping/shopping',
    })
  },
  //取消退款
  quxiao(){
    var that=this;
    wx.request({
      url: app.globalData.url+'/order/updatastatus',
      method:'post',
      data:{
        id:18,
        orderId:that.data.dingdan
      },
      success(res){
        if(res.data.data==1){
          wx.showToast({
            title: '取消退团成功',
            mask:true
          })
        }
        wx.navigateTo({
          url: '../daifahuo/orderprocessing?orderid='+that.data.dingdan,
        })
      },
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