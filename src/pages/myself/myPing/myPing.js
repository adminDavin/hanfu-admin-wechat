// src/pages/myself/myPing/myPing.js
const app = getApp();
import quan from '../../../services/hf-tequan.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pingjia:[],
    wait:[],
    stars: [0, 1, 2, 3, 4],
    num:3,
    img:'',
  },
  ping:function(e){
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../ping/ping?item='+JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj={
     userId: wx.getStorageSync('userId')
    }
    quan.getwait(obj, (res) => {
      console.log(res);
      for(var i=0;i<res.data.data.length;i++){
        res.data.data[i].hfDesc=JSON.parse(res.data.data[i].hfDesc);
      }
      this.setData({
        wait:res.data.data
      })
  })
  quan.getpingjia(obj, (res) => {
    console.log(res);
    for(var i=0;i<res.data.data.length;i++){
      res.data.data[i].list.hfDesc=JSON.parse(res.data.data[i].list.hfDesc);
   
    }
    this.setData({
      pingjia:res.data.data
    })
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
onShow(){
  this.setData({
    img: app.endpoint.file
   })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})