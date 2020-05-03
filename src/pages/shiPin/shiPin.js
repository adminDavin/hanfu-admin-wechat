// src/pages/ping/ping.js
import car from '../../services/car.js';
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgs:'',
    file:[],
    orderId:{},
    storeorder:{},
    star:0,
    evaluate:""
  },
  delete:function(e){
    console.log(e.currentTarget.dataset.item);
    let imgs=this.data.imgs;
    let file=this.data.file;
    let obj={
      fileId:file[e.currentTarget.dataset.item]
    }
    car.deleteGoodsFile(obj, (res) => {
      console.log(res);
    })
    imgs.splice(e.currentTarget.dataset.item);
    file.splice(e.currentTarget.dataset.item);
    this.setData({
      imgs:imgs,
      file:file
    })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // that.setData({
    //   storeorder:  JSON.parse(options.item),
    //   orderId:options.orderId
    // })
    // console.log(that.data.orderId);
    // console.log(that.data.storeorder);
    // console.log(that.data.storeorder.id);
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
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath);
        that.setData({
          imgs:res.tempFilePath
        })
        wx.uploadFile({
          url: app.endpoint.product+'/goods/fileUpLoad', //仅为示例，非真实的接口地址
          filePath: res.tempFilePath,
          name: 'file',
          formData: {
            'file': res.tempFilePath
          },
          success (res){
           console.log(res)
           res.data=JSON.parse(res.data)
           console.log(res.data)
           let arr=[];
           arr.push(res.data.data)
           that.setData({
             file:arr
           })
            //do something
          }
        })
      }
    })
  },

  pingjia:function(){
    var that=this;
//     var formdata=new FormData();
// //可以通过append()方法来追加数据
//      formdata.append("file",that.data.file);
//      formdata.append("userId",that.data.file);
//      formdata.append("file",that.data.file);
//      formdata.append("file",that.data.file);
//      formdata.append("file",that.data.file);
console.log(that.data.file)
 if(that.data.file.length==0){
   return false;
 }

    let obj={
      type:'discover',
      typeContent:'video',
      userId:wx.getStorageSync('userId'),
      evaluate:that.data.evaluate,
      fileId:that.data.file,
      parentEvaluateId:-1,
      levelId:0
    }
    console.log(obj);
      car.addDiscoverXin(obj, (res) => {
        
        console.log(res);
       if(res.data.status==200){
         that.setData({
          file:[]
         })
          wx.showToast({
            title: '添加成功',
          })
          setTimeout(function(){
            wx.switchTab({
              url: '../discover/index',
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
    // let img=this.data.imgs;
    // let file=this.data.file;
    // img=[];
    // file=[];
    // this.setData({
    //   imgs:img,
    //   file:file
    // })
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