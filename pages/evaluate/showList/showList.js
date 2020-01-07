// pages/evaluate/showList/showList.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr:[],
    value: 4,
    message: '这个东西不错，很符合本宝宝的品味',
    fileList: [
      { url: '/pages/images/handpick/07fbbc84987980b7.jpg!cc_350x449.png', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: '/pages/images/handpick/07fbbc84987980b7.jpg!cc_350x449.png',
        name: '图片2',
        isImage: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.information + "/message/insertReply",
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
        openId:2,
        evaluate:1321254654
      },
      success: function(res) {
        console.log("成功",res)
 
        
        
      }
    })
 
   }
})