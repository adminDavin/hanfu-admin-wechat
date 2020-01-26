const app = getApp()
import particularsUtil from './particulars-util.js';

Page({
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
    // hideModals:false,
    dataId: '',
    show: false,
    isLogin: false,
    canGetSite: true,
    guigeshow: false,
    tsiteshow: false,
    productId: 0,
    goodsSpecMap: {},
    isUserId: false,
    openId: '',
    evaluate: '', //评价
    site: '', //地址
    sites: '',
    shppingcar: '', //购物车
    attention: '',
    userId:'',
    slideNumber: '1', //详情滑动跳动数字
    collects: false,
    goodsNum: 1,
    totalprice: '',
    userAddressId: '',
    spec: [],
    guigestr: '',
    curr: 0,
    selectedGoods: {},
    selectedAddress: {},

    //----------
    goods: {},
    price: 4500,

  },
  //跳转添加地址页
  newsite:function(){
    wx.navigateTo({
      url: '../../address/address',
    })
  },
  //跳转购物车
  gouwucar: function () {
    wx.switchTab({
      url: '../../shopping/shopping'
    })
  },
  //购物车
  gouwucar: function () {
    wx.switchTab({
      url: '../../shopping/shopping',
    })
  },
  //关注
  collect: function () {
    var that = this;
    if (that.data.collects) {
      that.setData({
        collects: !that.data.collects,
      })
      wx.showToast({
        title: '取消关注',
      });
    } else {
      that.setData({
        collects: !that.data.collects,
      })
      wx.showToast({
        title: '关注成功',
      });
    }
  },
  //设置关注
  // attention: function () {
  //   var that = this;
  //   //获取用户的openId
  //   wx.getStorage({
  //     key: 'user',
  //     success: function (res) {
  //       that.setData({
  //         openId: res.data.userInfo.openId,
  //       })
  //     },
  //   });
  //   wx.request({
  //     url: app.globalData.urlGoods + '/goods/Concern',
  //     method: 'Get',
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
  //         attention: that.data.data
  //       })
  //     },
  //     data: {
  //       goodsId: that.data.productId, //列表商品传过来
  //       openId: that.data.openId
  //     }
  //   })
  //   wx.showToast({
  //     title: that.data.attention,
  //   });
  // },
  //规格弹框
  guigeshow() {
    this.setData({
      guigeshow: true
    });
  },
  guigeguanbi() {
    var that = this;
    that.setData({
      guigeshow: false,
      guigestr: ''
    })
  },
  listenChooseGoodsCommitEvent(e) {
    console.log(e.detail, 'dddd');
    let a = 1;
    console.log(e.detail[a]);
    this.setData({
      guigeshow: false,
      selectedGoods: e.detail
    });
  },
  listenSelectAddress(e) {
    this.setData({
      tsiteshow: false,
    });
    this.setData({
      selectedAddress: e.detail.selectedAddress
    });
  },
  // 地址弹框
  showSiteList() {
    var that = this;
    that.setData({
      tsiteshow: true
    })
  },
  tsiteguanbi() {
    var that = this;
    that.setData({
      tsiteshow: false
    })
  },
  //分享
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '同城优品小程序',
      path: 'pages/classify/particulars/particulars',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  //详情滑动跳动数字
  current: function (e) {
    console.log(e)
    var that = this
    that.setData({
      slideNumber: e.detail.current + 1
    })
  },
  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块
  },
  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  //商品详情价格及内容
  particulars: function (goodsId) {
    particularsUtil.getProductInfo({
      goodsId,
    }, (res) => {
      let goods = res.data.data[0]
      console.log(goods)
      goods.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + goods.fileId
      this.setData({
        goods: goods,
        totalprice: goods.sellPrice
      });
    });
  },
  checkUserIslogin() {
    return particularsUtil.checkUserIslogin(this.data.userId);
  },
  //加入购物车
  shppingcar: function (e) {
    var that = this;
    let isLogin = that.data.isLogin;
    if (isLogin == false) {
      that.setData({
        show: true
      })
    } else {
      if (that.data.guigestr == '') {
        wx.showToast({
          title: '请选择规格',
          icon: 'none',
          mask: true
        })
        return
      }
      this.guigeshow()
      wx.request({
        url: app.globalData.urlCart + '/cart/add',
        method: 'Get',
        success: function (res) {
          if (res.data.data == '成功加入购物车') {
            wx.showToast({
              title: '添加购物车成功',
            })

            let num = app.globalData.cartNum + 1;
            let num1 = JSON.stringify(num)
            that.setData({
              cartNum: num1
            })
            wx.setTabBarBadge({
              index: 3,
              text: app.globalData.cartNum
            })
            wx.switchTab({
              url: '../../shopping/shopping',
            })
          }
        },
        data: {
          goodsId: that.data.dataId,
          num: that.data.goodsNum,
          userId: that.data.userId,
          goodsSpec: that.data.guigestr
        }
      })
    }
  },
  //立即购买
  buyquick() {

    let goodsid = this.data.selectedGoods;
    console.log(this.data.selectedGoods)
      let userAddressId = this.data.selectedAddress;
    console.log(this.data.selectedAddress);
      if (app.globalData.selectedGoods.length > 0) {
        app.globalData.selectedGoods = [];
      }
      app.globalData.selectedGoods.push({ selectedGoods: this.data.selectedGoods, selectedAddress: this.data.selectedAddress });

    if (JSON.stringify(this.data.selectedGoods) == '{}') {
      this.guigeshow()
      wx.showToast({
        title: '规格或地址未选',
        icon: 'none',
      });
    } else if (JSON.stringify(this.data.selectedGoods) !== '{}') {
      wx.navigateTo({ url: `../../ljbuy/ljbuy?purchasePrice=` });
    }
    //  
  },
  // 判断userid
  isUserId() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          canGetSite: true,
          isUserId: true,
          userId: res.data.userId
        })
      },
      fail: function (res) {
        that.setData({
          canGetSite: false,
          isUserId: false
        })
      }
    })
  },

  // 点击判断是否登录
  isLogin() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {

        that.setData({
          userId: res.data.userId,
        })

      },
      fail: function (res) {
        that.setData({
          show: true,
          isLogin: false
        })
      }
    })
  },
  //初次判断是否登录
  firstIsLogin() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
          isLogin: true
        })
      },
      fail: function (res) {
        that.setData({
          isLogin: false
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
                        that.setData({
                          isLogin: true
                        })
                        wx.setStorage({
                          key: 'user',
                          data: res.data.data,
                          success: function (res) {
                            wx.navigateTo({
                              url: '../register/register?userId=' + main.data.userId,
                            })
                          }
                        })
                      } else {
                        wx.hideLoading();
                        main.setData({
                          show: true,
                          shibaishow: true,
                          isLogin: false
                        })
                      }
                    },
                    fail: function (res) {
                      wx.hideLoading();
                      main.setData({
                        show: true,
                        shibaishow: true,
                        isLogin: false
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
  //查看更多评论跳转
  // discuss: function () {
  //   wx.navigateTo({
  //     url: '../../evaluate/all',
  //   })
  // },

  goBack: function() {
    wx.navigateTo({
      url: '../../classify/commodity/commodity',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id, price } = options;
    var that = this;
    this.isUserId();
    this.firstIsLogin();
    that.setData({
      dataId: id,
      productId: id,
      price: price,
    });
    //用户的id
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
        })
      },
    });
    this.particulars(id);
    // this.evaluate();
  }
})