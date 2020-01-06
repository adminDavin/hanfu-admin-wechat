// pages/orderprocessing/orderprocessing.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dingdan:'',
    orderList:[],
    price:0
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
  getList:function(){
    var that=this;
    wx.request({
      url: app.globalData.url + "/order/queryOrder",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        id:that.data.dingdan
      },
      success: function(res) {
        console.log("成功",res)
        that.setData({
          orderList:res.data.data
        })
        console.log(that.data.orderList)
      }
    })
  },
  //去支付
  gopay(){
    var that=this;
    wx.navigateTo({
      url: '../../pay/payto/payto?orderid='+that.data.dingdan+'&price='+that.data.price,
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
        orderId:that.data.dingdan
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