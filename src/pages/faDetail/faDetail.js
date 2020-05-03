// src/pages/faDetail/faDetail.js
import car from '../../services/car.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs:[],
    img:'',
    list:{},
    id:''
  },
  getfadetail:function(){
    let obj={
      type:'discover',
      id:this.data.list.id,
      userId:wx.getStorageSync('userId'),
    }
    car.getfadetail(obj, (res) => {
      console.log(res);
      this.setData({
        list:res.data.data.list[0].parentEvaluate
      })
    })
  },
  zan:function(){
    let obj={
      type:'discover',
      id:this.data.list.id,
      userId:wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.zan(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        this.getfadetail();
      }
  
  })
  },
  previewImage: function (e) {
    console.log(e)
    console.log(this.data.imgs)
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls:this.data.imgs// 需要预览的图片http链接列表  
    })
  } ,   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      list: JSON.parse(options.item)
    })
    this.getfadetail();
    this.setData({
      img: app.endpoint.file
     })
    let arr =this.data.list.fileId;
    for(var i=0;i<arr.length;i++){
      arr[i]=this.data.img+'/goods/getFile?fileId='+arr[i]
    }
    this.setData({
      imgs: arr
    })
   console.log(this.data.list)
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