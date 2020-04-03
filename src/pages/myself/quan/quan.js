// src/pages/myself/coupons/coupons.js
import discount from '../../../services/discount.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formling:{
      couponId :'',
      userId :'' ,
    },
    scope:0,
    tequan:[],
    userId:'',
    unused: [],
    unusedEach: [],
    use: [],
    useEach: [],
    outmoded: [],
    outmodedEach: []
  },
  goling: function () {
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  goling: function () {
    wx.navigateTo({
      url: '../coupons/coupons',
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
          userId:that.data.userId,
          scope : that.data.scope,
        }
        discount.getTingQuan(obj,(res) => {
          // let list = res.data.data;
          // console.log(res);
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
          }
          that.setData({
            tequan:arr
          })
          console.log(that.data.tequan);
        });
      },
    })
  },
  getCoupon:function(e){
    var that=this;
    console.log(e);
    let obj={
      couponId :e.currentTarget.dataset.id,
      userId :that.data.userId,
    }
    discount.getCoupon(obj, (res) => {
     console.log(res);
     if(res.data.status==200){
       wx.showToast({
         title: '领取成功',
       })
     }
    });
  },
  tab: function (e) {
    console.log(e);
    //var dataId = e.currentTarget.dataset.id;
    var dataId = e.detail.index;
    var that=this;
    that.setData({
      scope: dataId
    })
    let obj={
      userId:that.data.userId,
      scope : that.data.scope,
    }
    discount.getTingQuan(obj, (res) => {
      // let list = res.data.data;
      // console.log(res);
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
      }
      that.setData({
        tequan:arr
      })
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