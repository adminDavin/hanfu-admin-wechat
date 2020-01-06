// pages/orderprocessing/orderprocessing.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    addid:'',
    hfProvince:'',
    hfCity:'',
    hfAddressDetail:'',
    phoneNumber:''
  },
  //返回
  fanhui() {
    wx.switchTab({
      url: '../shopping/shopping',
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
    that.getList();
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
  getList:function(){
    var that=this;
    wx.request({
      url: app.globalData.url + "/order/queryOrder",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        orderId:that.data.dingdan
      },
      success: function(res) {
        console.log("成功",res)
        let orderList=res.data.data;
        let goodsList=[];
        for(var index in orderList){
          if (orderList[index].googsId ==that.data.goodsid){
            goodsList=orderList[index]
            addid = orderList[index].userAddressId
          }
        }  
        that.setData({
          goodsList:goodsList,
          addid:addid
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
          hfProvince: res.data.hfProvince,
          hfCity: res.data.hfCity,
          hfAddressDetail: res.data.hfAddressDetail,
          phoneNumber: res.data.phoneNumber
        })
      }
    })
  },
  //再次购买
  ypx:function(){
    var that=this;
    wx.navigateTo({
      url: '../order/order?orderid='+that.data.dingdan,
})
 
   }, 
  //  评价晒单
   see:function(){
     var that=this;
    wx.navigateTo({
      url: '../evaluate/evaluateList/evaluateList?orderid='+that.data.dingdan,
})
 
   }, 
})