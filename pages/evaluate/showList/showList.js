// pages/evaluate/showList/showList.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],
    chooseImgs:[],
    textVal:[],
    arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: app.globalData.urlGoods + "/goods/byGoodsId",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      
      success: function(res) {
        console.log(res)
        that.setData({
          listArr:res.data.data
        })
        
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

  },
  comment:function(){
    wx.request({
      url: app.globalData.information + "/message/insertReply",
      method:'get',
      header: {
       "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        evaluate:13121321,
        goodsId:3,
        orderId:1,
        userId:2
      },
      success: function(res) {
        console.log("成功",res)
        that.setData({
          arr:res.data.data
        })
        
        
      }
    })
    
 
   },
   handeIeChooseImg(){
     wx.chooseImage({
       count: 9,
       sizeType: ['original','compressed'],
       sourceType: ['album','camera'],
       success: (result)=>{
          this.setData({
            chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
          })
       },
     
     });
   },
   handeIeRemoveImg(e){
     const{index}=e. currentTarget.dataset;
   let{chooseImgs}=this.data;
   chooseImgs.splice(index,1);
   this.setData({
    chooseImgs
   })
   
     
   },
   handleTextInput(e){
     this.setData({
       textVal:e.detail.value
     })
   }
})