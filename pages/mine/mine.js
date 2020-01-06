// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    avatar: '',
    phone: '',
    show: false,
    xinxishow: true,
    shibaishow: false,
    hexiaostatus: '',
    global: {},
  },
  //退款
  // tuikuan(){
  //   var that=this;
  //   wx.navigateTo({
  //     url: '../mydingdan/mydingdan?userid=',
  //   })
  // },


  gologin: function() {
    var that = this;
    that.setData({
      show: true
    })
  },

  getScancode: function() {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        wx.scanCode({
          success: (res) => {
            console.log(res)
            let qrl = JSON.parse(res.result)
            console.log(qrl)
            wx.request({
              url: app.globalData.urlHexiao+'/test/jiema',
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                goodsId: qrl[0].goodsId,
                ordersId: qrl[0].orderId
              },
              success:function(res){
                console.log(res)
                let qrl2 = res.data.data;
                console.log(qrl2);
                that.setData({
                  goodsId: qrl2[0].goodsId,
                  orderId: qrl2[0].orderId
                })
                that.sendMsg();
              }
            })
          }
        })
      },
      fail: function (res) {
        that.setData({
          show:true
        })
      }
    })
    // 允许从相机和相册扫码
  },

  // 扫码之后发送请求携带userid
  sendMsg: function() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId: res.data.userId,
        })
        that.sendUserId();
      },
      fail: function(res) {
        main.setData({
          show: true,
          shibaishow: true
        })
      }
    })
  },

  sendUserId: function() {
    var that = this;
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    wx.request({
      url: app.globalData.urlHexiao + '/cancel/testCancel',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId,
        goodsId: that.data.goodsId,
        orderId: that.data.orderId
      },

      success: function(res) {
        console.log("发送userId和商品信息成功", res);
        wx.hideLoading();
        if (res.data.data == '对不起你不是核销员无法核销商品') {
          that.setData({
            hexiaostatus: 1
          })
          wx.navigateTo({
            url: '../hexiao/hexiaosucc/hexiaosucc?hexiaostatus=' + that.data.hexiaostatus,
          })
        } else if (res.data.data == '该商品不是自提商品') {
          that.setData({
            hexiaostatus: 2
          })
          wx.navigateTo({
            url: '../hexiao/hexiaosucc/hexiaosucc?hexiaostatus=' + that.data.hexiaostatus,
          })
        } else if (res.data.data == '你不是该商品的核销员') {
          that.setData({
            hexiaostatus: 3
          })
          wx.navigateTo({
            url: '../hexiao/hexiaosucc/hexiaosucc?hexiaostatus=' + that.data.hexiaostatus,
          })
        } else if (res.data.data == '该订单已被核销') {
          that.setData({
            hexiaostatus: 4
          })
          wx.navigateTo({
            url: '../hexiao/hexiaosucc/hexiaosucc?hexiaostatus=' + that.data.hexiaostatus,
          })
        } else if (res.data.data == 0) {
          that.setData({
            hexiaostatus: 5
          })
          wx.navigateTo({
            url: '../hexiao/hexiaosucc/hexiaosucc?hexiaostatus=' + that.data.hexiaostatus,
          })
        }
      },
      fail: function(res) {
        wx.hideLoading();
        main.setData({
          show: true,
          shibaishow: true
        })
      }
    })
  },

  goMyDingdan: function(e) {
    var that = this;
    console.log(e)
    let tag=e.currentTarget.dataset.tag
    wx.navigateTo({
      url: '../mydingdan/mydingdan?tag=' + tag,
    })
  },

  // 工具和服务
  myaddress(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  myConcern() {
    wx.navigateTo({
      url: '../goodsList/goodList',
    })
  },
  myoftenBuy() {
    var that=this;
    app.globalData.toCartTag=true
    wx.switchTab({
      url: '../shopping/shopping',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        that.setData({
          phone: res.data,
          xinxishow: false
        })
        wx.getStorage({
          key: 'user',
          success: function(res) {
            that.setData({
              userId: res.data.userId,
            })
          },
        })
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            that.setData({
              username: res.data.nickName,
              avatar: res.data.avatarUrl
            })
          },
        })
      },
      fail: function(res) {
        that.setData({
          xinxishow: true,
        })
      }
    })
  },


  nologin: function() {
    this.setData({
      show: false
    })
  },
  getUserInfo: function(e) {
    let main = this;
    wx.showLoading({
      title: '正在登录',
      mask: true
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
                success: function(res) {
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

                    success: function(res) {
                      console.log("登录", res);
                      if (res.data.status == 200) {
                        wx.hideLoading();
                        wx.setStorage({
                          key: 'user',
                          data: res.data.data,
                          success: function(res) {
                            wx.navigateTo({
                              url: '../register/register?userId=' + main.data.userId,
                            })
                          }
                        })
                      } else {
                        wx.hideLoading();
                        main.setData({
                          show: true,
                          shibaishow: true
                        })
                      }
                    },
                    fail: function(res) {
                      wx.hideLoading();
                      main.setData({
                        show: true,
                        shibaishow: true
                      })
                    }
                  })
                }
              })
            },
            fail(res) {

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
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        that.setData({
          phone: res.data,
          xinxishow: false
        })
        wx.getStorage({
          key: 'userInfo',
          success: function(res) {
            that.setData({
              username: res.data.nickName,
              avatar: res.data.avatarUrl
            })
          },
        })
      },
      fail: function(res) {
        that.setData({
          xinxishow: true
        })
      }
    })
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

  },
  ontab:function(event){
 
    wx.navigateTo({
 
          url: '../opp/vip/vip',//跳转的路径
 
    })
 
   },
})