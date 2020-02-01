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
    product: 'http://localhost:9095',
    file: 'http://localhost:9095',
    user: 'http://localhost:8082',
    order: 'http://localhost:9097'
  }
})