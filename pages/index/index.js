//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    global:{},
    user:false,
    activeId:'',
    activeList:[],
    picdata:[],
    show:false,
    "bnrUrl": [{
      "url": "../img/img.png"
    }, {
        "url": "../img/img.png"
    }, {
        "url": "../img/img.png"
    }, {
        "url": "../img/img.png"
    }],
    topNavs: ['全部', '红包', '折扣券', '实物奖励', '0000', '1234', '0123', '2345', '11111', '22222', '3333', '4444', '5555', '6666'],
    /**
    * 当前激活的当航索引
    */
    currentTab: 0,
    /**
     * 上一个激活的当航索引
     */
    prevIndex: -1,
    /**
     * scroll-view 横向滚动条位置
     */
    scrollLeft: 0,
   
    picdata:[],
    personList:[]


  },
  goinfer:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../checkperson/checkperson?id=' + e.currentTarget.dataset.userid
    })
  },
  topNavChange: function (e) {
    console.log(e.currentTarget.dataset.current);

    this.setData({
      currentTab: e.currentTarget.dataset.current,
      activeId: this.data.activeList[e.currentTarget.dataset.current].id
    })
    this.getPerson()
  },
  list: function (even) {
    var main = this;
    wx.showLoading({
      title: '请稍后',
    })
    console.log(1111)
    wx.request({
      url: app.globalData.url + '/activity/listActivity',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("查找成功");
        console.log(res);
        wx.hideLoading();
        main.setData({
          activeList: res.data.data
        })
        main.getPerson1()
      },
      fail: function (res) {
        console.log("查找失败：");

      }
    })
  },
  getPerson1:function(){
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    if (main.data.activeList[0]){
      wx.request({
        url: app.globalData.url + '/activity/listActivityUser',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          activityId: main.data.activeList[0].id
        },
        success: function (res) {
          console.log("查找成功：");
          console.log(res);
          if (res.data.data){
            for (var i = 0; i < res.data.data.length; i++) {
              
              if (res.data.data[i].fileId) {
                res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].fileId;
              } else {
                res.data.data[i].img = '../img/pic.png';
              }
              
            }
          }
         
          wx.hideLoading();
          main.setData({
            personList: res.data.data
          })

        },
        fail: function (res) {
          console.log("查找失败：");
          console.log(res);
          wx.hideLoading();
        }
      })
    }else{
      wx.hideLoading();
    }
   
   
  },
  getPerson: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/activity/listActivityUser',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.data){
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].id) {
              res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].id;
            } else {
              res.data.data[i].img = '../img/pic.png';
            }

          }
          main.setData({
            personList: res.data.data
          })
        }else{
          main.setData({
            personList: []
          })
        }
        
        
        
        console.log(main.data.personList)
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  // 获取轮播图
  getPic: function () {
    wx.showLoading({
      title: '请稍后',
    })
    var main = this;
    wx.request({
      url: app.globalData.url + '/strategy/findlunbotu',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        activityId: main.data.activeId
      },
      success: function (res) {
        console.log("查找成功：");
        console.log(res);
        if (res.data.data.length>0){
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].img = app.globalData.url + '/wareHouse/getFile?fileId=' + res.data.data[i].id;
          }
         
          main.setData({
            picdata: res.data.data
          })
        }else{
         
        }
        wx.hideLoading();
       

      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow:function(){
  
  
    this.getPic();
    this.list();
  },
  everyday: function (e) {
    var main = this;
 if (e.currentTarget.dataset.id == 34) {
    wx.request({
      url: app.globalData.url + '/wareHouse/findIsPraise',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: main.data.user.userId
      },
      success: function (res) {
        console.log(res);
        if(res.data.data){

        }else{
          wx.navigateTo({
            url: '../dailyPraise/dailyPraise',
          })
        }
        
      },
      fail: function (res) {
        console.log("查找失败：");
        console.log(res);
        // wx.hideLoading();
      }
    })
   
      console.log(1);
     
    }
  },

  getUserInfo: function (e) {

    
    let main = this;
    // console.log(e)
    // 获取用户信息
    main.setData({
      show:false
    })
    console.log(main.data.show)
    wx.getSetting({
      success(res) {
        // console.log("res", res)
        if (res.authSetting['scope.userInfo']) {
          console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
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
                  wx.login({
                    success: function (res) {
                      // console.log(main.globalData.urlLogin + '/user/wxLogin');
                      // console.log(main.globalData.encryptedData, main.globalData.iv, main.globalData.rawData, main.globalData.signature)
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
  onLoad(){
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        that.setData({
          user: res.data,

        })

        console.log(19009)
      },
      fail:function(){
     
          console.log(1111111111)
          that.setData({
            show: true
          })
        
      }

    })
    
  
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   // this.setData({
  //   //   userInfo: e.detail.userInfo,
  //   //   hasUserInfo: true
  //   // })
  // }
})
