// src/pages/faDetail/faDetail.js
import car from '../../services/car.js';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listcommmit:[],
    evaluate:"",
    pingid:'',
    huiuser:'说点什么',
    imgs:[],
    img:'',
    list:{},
    id:''
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
      type:'discover',
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
          that.selectDiscover()
         
       }
    })
  },
  selectDiscover:function(){
    var that=this;
   let obj={
    levelId:1,
    parentEvaluateId:that.data.list.id,
    type:'discover',
    userId:wx.getStorageSync('userId'),
   }
   car.selectDiscover(obj, (res) => {
    console.log(res);
    that.setData({
      listcommmit:res.data.data
    })
  });
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
  onShareAppMessage: function(res) {
    console.log('转发',res);
    if (res.from === 'button') {
      console.log('转发');
      console.log(2);
      let obj={
        id:this.data.list.id
      }
      console.log(obj)
      car.share(obj, (res) => {
        console.log(res);
        if(res.data.status==200){
          this.getfadetail();
        }
    })
    }
    // return {
    //   title: '转发',
    //   path: '/pages/index/index',
    //   success: function(res) {}
    // }
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
    // console.log(this.data.imgs)
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
    this.selectDiscover();
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

})