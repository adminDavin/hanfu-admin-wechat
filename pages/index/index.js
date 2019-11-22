//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    picdata:[],
    show:false,
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
    list: [],
    picdata:[]


  },
  topNavChange: function (e) {
    console.log(e.currentTarget.dataset.current);

    this.setData({
      currentTab: e.currentTarget.dataset.current
    })
  },
  // 获取轮播图
  getPic: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/strategy/findlunbotu',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].id;
        }
        wx.hideLoading();
        main.setData({
          picdata: res.data.data
        })

      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
    this.getPic()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
