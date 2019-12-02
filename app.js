//app.js

App({
  onLaunch: function() {
    var main=this;
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              // that.setData({
              //   name: res.userInfo.nickName
              // })
              main.globalData.userInfo = res.userInfo;
              console.log(main.globalData.userInfo)
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo 
              })  
              wx.login({
                success: function(res){
                    console.log(res)
                }
              })
            },
            fail(res) {
              
            }
          })
        } else {
          console.log("未授权=====");
          wx.reLaunch({
            url: '/pages/empower/empower',
          })
          // that.showSettingToast("请授权")
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'http://192.168.1.105:9200',
    urlLogin: 'http://192.168.1.105:8082'
  }
})