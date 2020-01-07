// pages/evaluate/myevaluate/myevaluate.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],
    active: 0,
    value: 4
  },

  onChange(e){
    console.log(e)
  },
//待评价
daipingjia(){
  var that=this;
  wx.request({
    url: app.globalData.information + "/order/queryOrder",
    method: 'get',
    data: {
      orderDetailStatus: '待评价',
      userId: that.data.userId
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log(res)
      that.setData({
        listArr: res.data.data
      })
    }
  })
},
//已评价
yipingjia(){
  var that = this;
  wx.request({
    url: app.globalData.information + "/order/queryOrder",
    method: 'get',
    data: {
      orderDetailStatus: '已评价',
      userId: that.data.userId
    },
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log(res)
      that.setData({
        listArr: res.data.data
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tag = options.tag;
    var that=this
    if (tag == 1) {
      that.daipingjia();
    } else {
      that.setData({
        active:1
      })
      that.yipingjia();
    }
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
  chakan:function(){
  
    wx.navigateTo({
 
      url: '../remark/remark',
     
})
   },
   see:function(){
    
    wx.navigateTo({
 
      url: '../showList/showList',
     
})
 
   }, 
})