// pages/index/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    indicatorDots: true,
    autoplay: true, 
    interval: 3000,
    duration: 800, 
    circular: true,
    imgUrls: [
      'http://a4.att.hudong.com/20/62/01000000000000119086280352820.jpg',
      'http://a2.att.hudong.com/36/48/19300001357258133412489354717.jpg',
      'http://a3.att.hudong.com/76/12/01300535598340138644126705706.jpg'
    ],
    winWidth: 0,
    winHeight: 0,
    scrollH: 0,
    imgWidth: 0,
    currentTab: 0
  },

  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          winWidth: res.windowWidth, 
          winHeight: res.windowHeight, 
          scrollH: scrollH,
          imgWidth: imgWidth });
        }
    });
    this.lunBoTu()
  },
  
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  
  //轮播图
  lunBoTu: function (e) {
    var that = this;
    wx.request({
      url: app.endpoint.product + '/product/slideshow',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data.data;
        console.log(res.data.data)
        for (var index in list) {
          list[index].img = app.endpoint.product + '/goods/getFile?fileId=' + list[index].fileId;
          let lunid = list[index].id
          // that.setData({
          //   lunid:lunid 
          // })
        }
        that.setData({
          imgUrls: list
        })
      },
    });
  },
  //轮播图跳转
  lunbotutiao: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id)
    wx.navigateTo({
      url: '/pages/product/detail?productId=' + id,
    })
  },
  onPullDownRefresh: function (e) {
    console.log(e);
  }
})