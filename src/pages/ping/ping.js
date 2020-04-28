// src/pages/ping/ping.js
import car from '../../services/car.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    imgs:[],
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
      count:1,
      success (res) {
        console.log(res);
        const tempFilePaths = res.tempFilePaths;
        let img=that.data.imgs;
        if(img.length>=9){
          return false;
        }
        img.push(tempFilePaths[0]);
         that.setData({
          imgs:img
         })
        console.log(that.data.file,app.endpoint.product+'/fileUpLoad')
        wx.uploadFile({
          url: app.endpoint.product+'/goods/fileUpLoad', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'file': tempFilePaths[0]
          },
          success (res){
           console.log(res)
           res.data=JSON.parse(res.data)
           console.log(res.data)
           let arr =that.data.file;
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

    let obj={
      type:'evaluate',
      evaluate:that.data.evaluate,
      fileId:that.data.file,
      goodId:that.data.storeorder.goodsId,
      orderDetailId:that.data.storeorder.id,
      star:that.data.star,
      stoneId:that.data.storeorder.stoneId,
      userId:wx.getStorageSync('userId'),
      typeContent:'heart'
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
    this.setData({
      img: app.endpoint.file
     })
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