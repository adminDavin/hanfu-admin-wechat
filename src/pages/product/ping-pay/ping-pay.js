const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowSum:'',
    groupSum:'', //总数
    groupFileUrl:'',
    imgageUrls:'',
    userName:'',
    productName:'',
    sellPrice:'',
    dataid: '', //一键平团跳转传的id
    arr: [], //一键拼团
    userId: '',
    fileId: '',
    startTime: '', //开始时间
    stopTime: '', //结束时间 
    hour: '',
    minute: '',
    second: '',
    fileDesc:'',//商品图片
    hfGoodsSpec:'',//规格
    addressId:'',//地址ID
  },
  //跳转去首页
  goHome:function(){
    wx.navigateTo({
      url: '../../seckill/seckill',
    })
  },
  //一键拼团
  pintuans: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectByGroup',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data;
        that.setData({
          arr: list,
          fileId: list.user,
          startTime: list.startTime,
          stopTime: list.stopTime,
          fileDesc: list.fileDesc
        });
        list.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + that.data.fileDesc.id;
        //开始时间
        let start_hour = (that.data.startTime).substring(11, 13)
        let start_minute = (that.data.startTime).substring(14, 16)
        let start_second = (that.data.startTime).substring(17, 19)
        that.setData({
          hour: start_hour,
          minute: start_minute,
          second: start_second
        });
        for (var index in that.data.fileId) {
          that.data.fileId[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + that.data.fileId[index].fileId;
        };
      },
      data: {
        groupId: that.data.dataid,//团购表id
        userId:2 //that.data.userId,//用户id

      }
    })
  },
  //邀请好友
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '同城优品小程序',
      path: 'pages/product/ping-pay/ping-pay?id=199',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let params = JSON.parse(decodeURIComponent(options.params))
    console.log(params)
    let productFileId = params.productFileId
    let fileId = params.user[0].fileId
    let groupFileUrl = app.endpoint.product + '/goods/getFile?fileId=' + productFileId
    let imgageUrls = app.endpoint.file + '/goods/getFile?fileId=' + fileId
    this.setData ({
      productName: params.productName,
      sellPrice: params.sellPrice,
      userName: params.user[0].userName,
      groupFileUrl: groupFileUrl,
      imgageUrls: imgageUrls,
      groupSum: params.groupSum,
      nowSum: params.nowSum
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

  }
})