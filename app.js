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
    selectedGoods: [],
    // urlmorecategory: 'http://192.168.1.104:9095',//分类
    // purchase: 'http://192.168.1.101:8082',
    // // urlLogin: 'http://192.168.1.101:8082', //登录
    // urlsite: 'http://192.168.1.101:8082', //地点
    // urlGoods: 'http://192.168.1.104:9095', //商品
    // urlparticulars: 'http://192.168.1.104:9095', //详情
    // information: 'http://192.168.1.104:9097',
    // urlevaluate: 'http://192.168.1.104:9097', //评价
    // url: 'http://192.168.1.104:9097', //
    // urlCart: 'http://192.168.1.104:9098', //购物车
    // urlshppingcar: 'http://192.168.1.104:9098', //购物车
    // urlHexiao: 'http://192.168.1.125:9901', //核销
    //  urlpuzzle: 'http://192.168.1.175:9911', //拼团
    //  urlseckill: 'http://192.168.1.175:9910', //秒杀
    // urlRefund: 'http://192.168.1.196:9099/',
    // urlpay:'http://192.168.1.196:8082',
    urlHfUser: "http://localhost:8082",
    urlmorecategory: 'https://www.tjsichuang.cn:1443/api/product',//分类
    purchase: 'https://www.tjsichuang.cn:1443/api/user',
    urlLogin: 'https://www.tjsichuang.cn:1443/api/user', //登录
    urlsite: 'https://www.tjsichuang.cn:1443/api/user', //地点
    urlGoods: 'https://www.tjsichuang.cn:1443/api/product', //商品
    urlparticulars: 'https://www.tjsichuang.cn:1443/api/product', //详情
    information: 'https://www.tjsichuang.cn:1443/api/order',
    urlevaluate: 'https://www.tjsichuang.cn:1443/api/order', //评价
    url: 'https://www.tjsichuang.cn:1443/api/order', //
    urlCart: 'https://www.tjsichuang.cn:1443/api/cart', //购物车
    urlshppingcar: 'https://www.tjsichuang.cn:1443/api/cart', //购物车
    urlHexiao: 'https://www.tjsichuang.cn:1443/api/cancel', //核销
    urlpuzzle: 'https://www.tjsichuang.cn:1443/api/group', //拼团
    urlseckill: 'https://www.tjsichuang.cn:1443/api/seckill', //秒杀
    urlRefund: 'https://www.tjsichuang.cn:1443/api/zslpayment',
    urlpay: 'https://www.tjsichuang.cn:1443/api/user'
  }
})