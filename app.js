//app.js
App({
  onLaunch: function () {
    var that=this;
    // 购物车数量
    wx.setTabBarBadge({
      index: 3,
      text: that.globalData.cartNum
    })
  },
  globalData: {
    userInfo: null,
    cartNum:'0',
    cartPrice:0,
    urlLogin: 'http://192.168.1.104:8082',
    url: 'http://192.168.1.104:9097',
    urlGoods: 'http://192.168.1.104:9095',
    urlCart: 'http://192.168.1.104:9098',
    urlHexiao: 'http://192.168.1.125:9901',
  }
})