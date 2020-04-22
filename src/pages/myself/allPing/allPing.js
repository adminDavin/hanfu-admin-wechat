// src/pages/myself/allPing/allPing.js
const app = getApp();
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    stoneId: '',
    stars: [0, 1, 2, 3, 4],
    productId:'',
    pinglist:[]
  },
  ping:function(){
    
    let obj = {
      stoneId:this.data.stoneId,
      productId:this.data.productId,
     
    }
    console.log(obj)
    car.selectInstanceEvaluate(obj, (res) => {
      console.log(res);
      for(var i=0;i<res.data.data.list.length;i++){
        res.data.data.list[i].parentEvaluate.hfDesc=JSON.parse(res.data.data.list[i].parentEvaluate.hfDesc)
      }
      this.setData({
        pinglist:res.data.data.list
      })
      console.log(this.data.pinglist)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      stoneId: options.stoneId,
      productId:options.productId,
    })
    that.ping()
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
    this.setData({
      img: app.endpoint.file
     })
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