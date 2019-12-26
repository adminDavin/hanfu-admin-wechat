// pages/mine/mine.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    avatar:'',
    phone:'',
    show: false,
    xinxishow:true,
    shibaishow:false,
    global: {},
  },
  gologin:function(){
    var that=this;
    that.setData({
      show:true
    })
  },

  getScancode:function(){
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  goMyDingdan:function(){
    var that=this;
    wx.navigateTo({
      url: '../mydingdan/mydingdan?userId'+that.data.userId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        that.setData({
          phone:res.data,
          xinxishow:false
        })
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            that.setData({
              username: res.data.nickName,
              avatar: res.data.avatarUrl
            })
          },
        })
      },
      fail:function(res){
        that.setData({
          xinxishow: true,
        })
      }
    })
  },

  nologin: function () {
    this.setData({
      show: false
    })
  },
  getUserInfo: function (e) {
    let main = this;
    wx.showLoading({
      title: '正在登录',
      mask:true
    })
    console.log(e)
    // 获取用户信息
    main.setData({
      show: false
    })
    console.log(main.data.show)
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              wx.getUserInfo({
                success(res) {
                  console.log("获取用户信息成功", res)
                  main.data.global.userInfo = res.userInfo;
                  main.data.global.encryptedData = res.encryptedData;
                  main.data.global.iv = res.iv;
                  main.data.global.rawData = res.rawData;
                  main.data.global.signature = res.signature;
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.userInfo
                  })
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
                          code: res.code,
                          encryptedData: main.data.global.encryptedData,
                          iv: main.data.global.iv,
                          rawData: main.data.global.rawData,
                          signature: main.data.global.signature
                        },

                        success: function (res) {
                          console.log("登录", res);
                          if (res.data.status == 200) {
                            wx.hideLoading();
                            wx.setStorage({
                              key: 'user',
                              data: res.data.data,
                              success:function(res){
                                wx.navigateTo({
                                  url: '../register/register?userId=' + main.data.userId,
                                })
                              }
                            })
                          }
                        },
                        fail: function (res) {
                          wx.hideLoading();
                          main.setData({
                            show:true,
                            shibaishow:true
                          })
                        }
                      })
                    }
                  })
                },
                fail(res) {

                }
              })




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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        that.setData({
          phone: res.data,
          xinxishow: false
        })
        wx.getStorage({
          key: 'userInfo',
          success: function (res) {
            that.setData({
              username: res.data.nickName,
              avatar: res.data.avatarUrl
            })
          },
        })
      },
      fail: function (res) {
        that.setData({
          xinxishow: true,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})