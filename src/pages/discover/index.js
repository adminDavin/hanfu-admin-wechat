// src/pages/discover/index.js
import car from '../../services/car.js';
const app = getApp();
Page({
  inputValue: '',
  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    list:[],
    src: '',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }]
  },
  go:function(){
    console.log(1)
  },
  zan:function(e){
    let obj={
      type:'discover',
      id:e.currentTarget.dataset.id,
      userId:wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.zan(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        this.selectDiscover();
      }
  })
  },
  godetail:function(e){
    console.log(e.currentTarget.dataset.item)
    
    wx.navigateTo({
      url: '../faDetail/faDetail?item='+JSON.stringify(e.currentTarget.dataset.item) ,
    })
  },
  gosend:function(){
    wx.navigateTo({
      url: '../send/send',
    })
  },
  selectDiscover:function(){
    let obj={
      parentEvaluateId:-1,
      type:'discover',
      userId:wx.getStorageSync('userId'),
    }
    car.selectDiscover(obj, (res) => {
      console.log(res);
     this.setData({
       list:res.data.data
     })
  })
  },
  videoErrorCallback: function (e) {
    console.log('视频错误信息:'+e.detail.errMsg);
   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  getRandomColor:function  () {
    let rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.selectDiscover();
    this.setData({
      img: app.endpoint.file
     })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
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