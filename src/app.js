App({  
  onLaunch: function () {
    wx.getSystemInfo({
      success:  (e) => {
        this.globalData.isIphoneX = e.model.indexOf("iPhone") != -1 && e.model.indexOf("X") != -1;
      }
    })
  },
  globalData: {
    isIphoneX: false
  },
  endpoint: {
    product: 'https://www.tjsichuang.cn:1443/api/product',
    file: 'https://www.tjsichuang.cn:1443/api/product',
    user: 'https://www.tjsichuang.cn:1443/api/user',
    order: 'https://www.tjsichuang.cn:1443/api/order',
    payment: 'https://www.tjsichuang.cn:1443/api/cart'
    // payment: 'http://localhost:9098'
  }
})