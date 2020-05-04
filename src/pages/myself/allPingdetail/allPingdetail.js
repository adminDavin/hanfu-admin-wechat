// src/pages/myself/allPingdetail/allPingdetail.js
const app = getApp();
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listcommmit:[],
    id:'',
    list:{},
    img:'',
    stars: [0, 1, 2, 3, 4],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options)
    that.setData({
      id:options.id,
      list:JSON.parse(options.item)
    })
    console.log(that.data.list)
     that.selectDiscover();
  },
  selectDiscover:function(){
    var that=this;
   let obj={
    levelId:1,
    parentEvaluateId:that.data.id,
    type:'evaluate',
    userId:wx.getStorageSync('userId'),
   }
   car.selectDiscover(obj, (res) => {
    console.log(res);
    that.setData({
      listcommmit:res.data.data
    })
  });
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