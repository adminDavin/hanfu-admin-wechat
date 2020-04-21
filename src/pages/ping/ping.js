// src/pages/ping/ping.js
import car from '../../services/car.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file:[],
    orderId:{},
    storeorder:{},
    star:'',
    evaluate:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      storeorder:  JSON.parse(options.item),
      orderId:options.orderId
    })
    console.log(that.data.orderId);
    console.log(that.data.storeorder);
    console.log(that.data.storeorder.id);
  },
  twoLevelCommentBtnClick (e) {
    this.setData({
      star: e.detail
    });
    // console.log("fu：" +this.data.star);
  },
  bind: function(e){
    this.setData({
      evaluate: e.detail.value
    });
  //  console.log(this.data.evaluate); 
},
  loadpicture:function(){
    var that=this;
    wx.chooseImage({
      count: 9,
      success (res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;
        let arr =that.data.file;
        for(var i=0;i<tempFilePaths.length;i++){
          arr.push(tempFilePaths[i])
        }
        // arr.push(res.tempFilePaths[0])
        that.setData({
          file:arr
        })
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success (res){
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },

  pingjia:function(){
    var that=this;
    let obj={
      userId:wx.getStorageSync('userId'),
      evaluate:that.data.evaluate,
      // file:that.data.file,
      goodId:that.data.storeorder.goodsId,
      orderDetailId:that.data.storeorder.id,
      star:that.data.star,
      stoneId:that.data.storeorder.stoneId,
      userId:wx.getStorageSync('userId')
    }
    console.log(obj);
      car.ping(obj, (res) => {
        console.log(res);
       if(res.data.status==200){
          wx.showToast({
            title: '评价成功',
          })
          setTimeout(function(){
            wx.navigateTo({
              url: '../myself/myPing/myPing',
            })
          },1000)
         
       }
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