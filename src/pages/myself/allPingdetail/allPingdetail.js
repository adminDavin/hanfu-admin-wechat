// src/pages/myself/allPingdetail/allPingdetail.js
const app = getApp();
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate:'',
    pingid:'',
    huiuser:'说点什么',
    listcommmit:[],
    id:'',
    list:{},
    img:'',
    stars: [0, 1, 2, 3, 4],
  },
  bind: function(e){
    this.setData({
      evaluate: e.detail.value
    });
  //  console.log(this.data.evaluate); 
},
  getcommont:function(e){
    console.log(e);
    this.setData({
      pingid:e.currentTarget.dataset.item.id,
      huiuser:'回复：'+ e.currentTarget.dataset.item.username,
    })
},
pingjia:function(){
  var that=this;
  if(that.data.pingid==''){
    return false;
  }
  if(that.data.evaluate==''){
    return false;
  }
  let obj={
    type:'evaluate',
    evaluate:that.data.evaluate,
    userId:wx.getStorageSync('userId'),
    typeContent:'heart',
    parentEvaluateId:that.data.pingid,
    levelId:1,
  }
  console.log(obj);
    car.ping(obj, (res) => {
      console.log(res);
     if(res.data.status==200){
        wx.showToast({
          title: '评价成功',
        })
        that.setData({
          pingid: '',
          evaluate:''
        })
        that.selectDiscover();
       
     }
  })
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