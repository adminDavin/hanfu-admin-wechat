// src/pages/myself/coupons/coupons.js
import discount from '../../../services/discount.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    tequan:[],
    userId: [],
    unusedEach:[],
    use: [],
    useEach: [],
    outmoded: [],
    outmodedEach: []
  },
  goling:function(){
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  getCoupon:function(){
    wx.switchTab({
      url: '../../home/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
     // console.log(111);
     var that = this;
     wx.getStorage({
       key: 'userId',
       success: function (res) {
         that.setData({
           userId: res.data
         })
         console.log(res);
         let obj={
          state :0,
          userId :that.data.userId
         }
         console.log(obj);
        
         discount.myCoupon(obj ,(res) => {
           console.log(res);
          that.setData({
            tequan: res.data.data
          })
          let arr=that.data.tequan;
          for(var i=0;i<arr.length;i++){
            arr[i].useLimit=JSON.parse(arr[i].useLimit);
            arr[i].startTime=arr[i].startTime.split(' ');
            arr[i].startTime=arr[i].startTime[0];
            arr[i].stopTime=arr[i].stopTime.split(' ');
            arr[i].stopTime=arr[i].stopTime[0];
            if(arr[i].discountCouponType==1){
              arr[i].useLimit.minus= (arr[i].useLimit.minus/100).toFixed(2);
            }
              arr[i].useLimit.full= (arr[i].useLimit.full/100).toFixed(2);
          }
          that.setData({
            tequan:arr
          })
          console.log(that.data.tequan);
         });
       },
     })
  },
  tab: function (e) {
    console.log(e);
    var that=this;
    that.setData({
      state: e.detail.index
    })
    let obj={
      userId:that.data.userId,
      state :  e.detail.index,
    }
console.log(obj)
    discount.myCoupon(obj ,(res) => {
      console.log(res);
      that.setData({
        tequan: res.data.data
      })
      let arr=that.data.tequan;
      if(arr){
        for(var i=0;i<arr.length;i++){
          arr[i].useLimit=JSON.parse(arr[i].useLimit);
          arr[i].startTime=arr[i].startTime.split(' ');
          arr[i].startTime=arr[i].startTime[0];
          arr[i].stopTime=arr[i].stopTime.split(' ');
          arr[i].stopTime=arr[i].stopTime[0];
          if(arr[i].discountCouponType==1){
            arr[i].useLimit.minus= (arr[i].useLimit.minus/100).toFixed(2);
          }
            arr[i].useLimit.full= (arr[i].useLimit.full/100).toFixed(2);
        }
        that.setData({
          tequan:arr
        })
      }
      
      console.log(that.data.tequan);
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