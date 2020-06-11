App({  
  globalData: {
    isIphoneX: false,
    winHeight: '',
    winWidth: '',
    bossId:'1',
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success:  (e) => {
        console.log(e)
        this.globalData.isIphoneX = e.model.indexOf("iPhone") != -1 && e.model.indexOf("X") != -1;
        this.globalData.winWidth = e.windowWidth;
        this.globalData.winHeight = e.windowHeight;
      }
    })
  },

  endpoint: {
    product: 'https://www.tjsichuang.cn:1443/api/product',
    file: 'https://www.tjsichuang.cn:1443/api/product',
    user: 'https://www.tjsichuang.cn:1443/api/user',
    order: 'https://www.tjsichuang.cn:1443/api/order',
    payment: 'https://www.tjsichuang.cn:1443/api/cart',
    // payment: 'http://localhost:9098',
    quan:'https://www.tjsichuang.cn:1443/api/user',

    // product: 'http://192.168.1.191:9095/'
    
  }
})