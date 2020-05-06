// src/pages/myself/allPing/allPing.js
const app = getApp();
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    evaluate:"",
    pingid:'',
    huiuser:'说点什么',
    evaluateRatio:'',
    evaluateCount:'',
    img:'',
    stoneId: '',
    stars: [0, 1, 2, 3, 4],
    productId:'',
    pinglist:[]
  },
  zan:function(e){
    let obj={
      type:'evaluate',
      id:e.currentTarget.dataset.id,
      userId:wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.zan(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        this.ping();
      }
  })
  },
  gopingdetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../allPingdetail/allPingdetail?id='+e.currentTarget.dataset.item.id+'&item='+JSON.stringify(e.currentTarget.dataset.item),
    })
},
  getcommont:function(e){
      console.log(e);
      this.setData({
        pingid:e.currentTarget.dataset.item.id,
        huiuser:'回复：'+ e.currentTarget.dataset.item.username,
      })
  },
  bind: function(e){
    this.setData({
      evaluate: e.detail.value
    });
  //  console.log(this.data.evaluate); 
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
          that.ping()
         
       }
    })
  },
  ping:function(){
    
    let obj = {
      stoneId:this.data.stoneId,
      productId:this.data.productId,
      userId:wx.getStorageSync('userId'),
      type:'evaluate'
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
      evaluateCount:options.evaluateCount,
      evaluateRatio:options.evaluateRatio,
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