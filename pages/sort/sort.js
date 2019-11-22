// pages/sort/sort.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firstid:'',
    activeList:[],
    "bnrUrl": [{
      "url": "../img/img.png"
    }, {
      "url": "../img/img.png"
    }, {
      "url": "../img/img.png"   

    }, {
      "url": "../img/img.png"
    }],
    topNavs: ['全部', '红包', '折扣券', '实物奖励', '0000', '1234', '0123', '2345', '11111', '22222', '3333', '4444', '5555', '6666'],
    /**
    * 当前激活的当航索引
    */
    currentTab: 0,
    /**
     * 上一个激活的当航索引
     */
    prevIndex: -1,
    /**
     * scroll-view 横向滚动条位置
     */
    scrollLeft: 0,
    listdata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  
  topNavChange:function(e){
    console.log(e,e.currentTarget.dataset.current, e.currentTarget.dataset.id);
    
    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/findActivityResult?',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: e.currentTarget.dataset.id
        
      },
     
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
        }
        wx.hideLoading();
        main.setData({
          listdata: res.data.data
        })
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })

  },
  // 获取头部导航
  list: function () {
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/listActivity',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        if (res.data.data.length>0){
          main.setData({
            firstid: res.data.data[0].id
          }) 
        }
       main.list1();
        console.log(main.data.firstid)
        main.setData({
          activeList: res.data.data
        })
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  // 获取排名
  list1: function () {
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/findActivityResult?',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.firstid

      },

      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        for (var i = 0; i < res.data.data.length;i++){
          res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
        }
        main.setData({
          listdata: res.data.data
        })
        console.log(main.data.listdata)
      },
      fail: function (res) {
        console.log("查找失败：");

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
    this.list();

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