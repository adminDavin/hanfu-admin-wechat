//app.js
App({
  onLaunch: function() {
    var that = this;
    // 购物车数量
    wx.setTabBarBadge({
      index: 3,
      text: that.globalData.cartNum
    })
  },
  globalData: {
    userInfo: null,
    cartNum: '0',
    cartPrice: 0,
    toCartTag:false,
    purchase: 'http://192.168.1.104:8082',
    information: 'http://192.168.1.104:9097',
    urlLogin: 'http://192.168.1.104:8082', //登录
    url: 'http://192.168.1.104:9097', //
    urlGoods: 'http://192.168.1.104:9095', //商品
    urlCart: 'http://192.168.1.104:9098', //购物车
    urlHexiao: 'http://192.168.1.125:9901', //核销
    urlpuzzle: 'http://192.168.1.175:9911', //拼团
    urlparticulars: 'http://192.168.1.104:9095', //详情
    urlevaluate: 'http://192.168.1.104:9097', //评价
    urlsite: 'http://192.168.1.104:8082', //地点
    urlshppingcar: 'http://192.168.1.104:9098', //购物车
    urlseckill: 'http://192.168.1.175:9910' ,//秒杀
    code:'http://192.168.1.196:8082'//二维码
  }
})