// pages/orderform/logistics/logistics.js
const app = getApp();
var util = require('../../utils/util.js')
const apiCart = require('../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    orderid:'',
    steps: [
      {
        text: `已签收
              2017-02- 22 08:05:26`,
        desc: '您的订单已由本人签收'
      },
      {
        text: `派送中
              2017-02- 22 08:05:26`,
        desc: '您的订单正在配送途中(快递员:李牧木，电话:1888888888),请耐心等待。'
      },
      {
        text: '运输中',
        desc: '2017-02- 22 08:05:26'
      },
      {
        text: '您的订单由[接货仓]送至[天津分拨中心]',
        desc: '2017-02- 22 08:05:26'
      },
      {
        text: '您的订单由[接货仓]送至[天津分拨中心]',
        desc: '2017-02- 22 08:05:26'
      },
      {
        text: '您的订单由[接货仓]送至[天津分拨中心]',
        desc: '2017-02- 22 08:05:26'
      },
      {
        text: '您的订单由[接货仓]送至[天津分拨中心]',
        desc: '2017-02- 22 08:05:26'
      },
      {
        text: '已下单',
        desc: '2017-02- 22 08:05:26'
      }
    ]
  },
  //查物流
  getlog(){
    var that=this;
    apiCart.toSettle(app.globalData.url, '/query/logistics', {
      expCode:that.data.company,
      expNo:that.data.wuliuid,
    }, (res) => {
      if (res.data.data.success == true) {
        
      }else{
        wx.showToast({
          title: '暂无物流信息',
        })
      }
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderid=options.orderid;
    let company=options.company;
    let wuliuid=options.wuliuid
    var that=this;
    that.setData({
      orderid:orderid,
      company: company,
      wuliuid: wuliuid
    })
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