const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
   dataid:'',//一键平团跳转传的id
    arr: [],//一键拼团
   userId:''
  },
  //一键拼团
  pintuans:function(){
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/shopping',
      method: 'POST',
      success: function (res) {
        console.log(res)
        that.setData({
         arr: res.data
        })
      },
      data: {
        groupId:10,//that.data.dataid,//团购表id
        userId:980 ,//that.data.userId,//用户id
        addressId:9, //用户地址id
        hfDesc:'红色' //所选商品规格
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    var that = this;
    console.log(id);
    that.setData({
      dataid: id,
    });
    //用户的id
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
        })
        console.log(that.data.userId)
      },
    });
    this.pintuans();
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