// src/pages/myself/storeDetail/storeDetail.js
const app = getApp();
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids:'',
    img:'',
    id:'',
    list:{}
  },
  fan:function(){
    wx.navigateBack({
      delta: 1,  // 返回上一级页面。
      success: function() {
          console.log('成功！')
      }
    })
  },
  cha:function(){
    wx.navigateTo({
      url: '../../pu/pu?id='+this.data.id+'&name='+this.data.name,
    })
  },
  getstoreDetail:function(){
    let obj={
     id:this.data.id
    }
    car.getstoreDetail(obj, (res) => {
      console.log(res);
      this.setData({
        list:res.data.data
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      img: app.endpoint.file
    })
    this.setData({ id: options.id });
    this.getstoreDetail();
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