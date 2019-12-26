// pages/hexiao/hexiaosucc/hexiaosucc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userid: res.data.userid,
        })
        that.userlogin();
      },
      fail: function(res) {
        that.auth();
      }
    })
  },

  auto: function() {
    var main = this;
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
              main.data.global.userInfo = res.userInfo;
              // console.log(main.globalData.userInfo);
              main.data.global.encryptedData = res.encryptedData;
              main.data.global.iv = res.iv;
              main.data.global.rawData = res.rawData;
              main.data.global.signature = res.signature;
              wx.setStorage({
                key: 'userInfo',
                data: res.userInfo
              })
            main.userlogin();
            },
            fail(res) {
              console.log("获取用户信息失败", res)
            }
          })
        } else {
          console.log("未授权=====")
          // that.showSettingToast("请授权")
        }
      }
    })
  },

  userlogin:function(){
    var main=this;
    wx.login({
      success: function (res) {
        console.log(res);
        wx.request({
          url: app.globalData.urlLogin + '/user/wxLogin',
          method: 'get',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            goodsId: res.data.goodsid,
            code: res.code,
            encryptedData: main.data.global.encryptedData,
            iv: main.data.global.iv,
            rawData: main.data.global.rawData,
            signature: main.data.global.signature
          },
          success: function (res) {
            console.log("核销登录", res);
            if (res.data.status == 200) {
              wx.setStorage({
                key: 'user',
                data: res.data.data
              })
              
            }
          },
          fail: function (res) {
            console.log("查找失败：");
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})