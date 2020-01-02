// pages/order/order.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    quhuomethod:true,
    userId:'',
    arr:[],
  },
  changeMethod:function(){
    var that=this;
    that.setData({
      quhuomethod:!that.data.quhuomethod
    })
    console.log(that.data.quhuomethod)
  },


  // 拿地址
  getAddress() {
    var that = this;
    wx.request({
      url: app.globalData.urlLogin + '/user/address/queryAddress',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId,
        token: 2
      },
      success: function (res) {
        console.log('获取地址', res);
        for(let i=0;i<res.data.data.length;i++){
          if (res.data.data[i].isFaultAddress==0){
            that.setData({
              addressList: res.data.data[i]
            })
          }
        }
        
      }
    })
  },

  // 拿商品信息
  getGoods(){
    var that=this;
    wx.request({
      url: app.globalData.urlGoods+ '/goods/byGoodsId',
      method:'get',
      data:{
        goodsId:that.data.arr
      },
      success(res){
        console.log(res)
      }
    })
  },

  // 提交订单
  submit(){
    var that=this;
    wx.request({
      // url: app.globalData.'',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId:res.data.userId
        })
        that.getAddress()
      },
    })
    // let arr=options.str.split('+');
    // console.log(arr)
    // that.setData({
    //   arr:arr
    // })
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