const app = getApp()
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
    tsiteshow:false,
    isUserId: false,
    goodsId: '',
    openId: '',
    arr: [],
    evaluate: '', //评价
    addressList:[],
    site: '', //地址
    sites: '',
    shppingcar: '', //购物车
    attention: '',
    userId: '',
    slideNumber: '1', //详情滑动跳动数字
    collects: false,
    goodsNum: 1,
    totalprice: '',
    userAddressId: '',
    spec: [],
    guigestr: '',
    curr:0
  },
  //购物车
  gouwucar: function () {
    wx.switchTab({
      url: '../../shopping/shopping',
    })
  },
  //商品数量减
  subNum() {
    var that = this;
    let goodsNum = that.data.goodsNum;
    let list = that.data.arr
    console.log(list)
    let totalprice = that.data.totalprice;
    if (goodsNum > 1) {
      goodsNum = goodsNum - 1;
      totalprice = totalprice - list.sellPrice
      console.log(totalprice)
      that.setData({
        goodsNum: goodsNum,
        totalprice: totalprice
      })
    } else {
      return;
    }
  },
  //商品数量加
  addNum() {
    var that = this;
    let goodsNum = that.data.goodsNum;
    let list = that.data.arr
    console.log(that.data.totalprice)
    let totalprice = that.data.totalprice;
    goodsNum = goodsNum + 1;
    totalprice = totalprice + list.sellPrice
    console.log(totalprice)
    that.setData({
      goodsNum: goodsNum,
      totalprice: totalprice
    })
  },
  //关注
  collect: function() {
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
  attention: function() {
    var that = this;
    //获取用户的openId
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          openId: res.data.userInfo.openId,
        })
      },
    });
    wx.request({
      url: app.globalData.urlGoods + '/goods/Concern',
      method: 'Get',
      success: function(res) {
        console.log(res)
        that.setData({
          attention: that.data.data
        })
      },
      data: {
        goodsId: that.data.goodsId, //列表商品传过来
        openId: that.data.openId
      }
    })
    wx.showToast({
      title: that.data.attention,
    });
  },
  //规格弹框
  guigeshow() {
    var that = this;
    that.setData({
      guigeshow: true
    })
    that.getGuige()
  },
  guigeguanbi() {
    var that = this;
    that.setData({
      guigeshow: false,
      guigestr:''
    })
  },
  //规格获取
  getGuige() {
    var that = this;
    wx.request({
      url: app.globalData.urlGoods + '/goods/specifiess',
      method: 'get',
      data: {
        goodsId: 2
      },
      success(res) {
        let spec = res.data.data;
        that.setData({
          spec: spec
        })
        console.log(spec)
      },
    })
  },
  //点击各个规格值
  guigevalue(e) {
    console.log(e)
    let name = e.currentTarget.dataset.name;
    let value = e.currentTarget.dataset.value;
    let curr=e.currentTarget.dataset.index;
    var that=this;
    that.setData({
      curr:curr
    })
    let spec = that.data.spec;
    for (var index in spec) {
      if (spec[index].productSpecName == name) {
        spec[index].value = value
      }
    }
  },
  //规格确认
  guigesubmit() {
    var that = this;
    let spec = that.data.spec;
    let str = '';
    let flag=false;
    for (var index in spec) {
      console.log(spec[index])
      if (spec[index].value) {
        flag=true
        str += spec[index].value + " "
      } else {
        flag=false
        let name = spec[index].productSpecName
        wx.showToast({
          title: '请选择' + name,
          icon: 'none',
        })
        return
      }
    }
    if(flag==true){
      str = str + ' '+that.data.goodsNum+'件'
      that.setData({
        guigestr: str,
        guigeshow: false
      })
    }
  },
  // 地址弹框
  showSiteList(){
    var that = this;
    that.setData({
      tsiteshow: true
    })
    that.getsitelist()
  },
  tsiteguanbi() {
    var that = this;
    that.setData({
      tsiteshow: false,
    })
  },
  // 点击选择地址
  editadd(e){
    let id = e.currentTarget.dataset.addid
    var that=this;
    console.log(id)
    wx.request({
      url: app.globalData.urlsite +'/user/address/addressDetail',
      method:'get',
      data:{
        id:id
      },
      success(res){
        console.log(list)
        let list=res.data.data;
        let sitss = list.hfProvince + list.hfCity + list.hfAddressDetail
        that.setData({
          sites: sitss,
          tsiteshow: false,
          userAddressId:id
        })
      }
    })
  },
  //分享
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '同城优品小程序',
      path: 'pages/classify/particulars/particulars',
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  },
  //详情滑动跳动数字
  current: function(e) {
    console.log(e)
    var that = this
    that.setData({
      slideNumber: e.detail.current + 1
    })
  },
  // 显示遮罩层
  showModal: function() {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function() {
      that.fadeIn(); //调用显示动画
    }, 200)
  },
  // 隐藏遮罩层
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800, //动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease', //动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown(); //调用隐藏动画   
    setTimeout(function() {
      that.setData({
        hideModal: true
      })
    }, 720) //先执行下滑动画，再隐藏模块
  },
  //动画集
  fadeIn: function() {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export() //动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function() {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  //商品详情价格及内容
  particulars: function(e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlGoods + '/goods/byGoodsId',
      method: 'Get',
      success: function(res) {
        console.log(res)
        let list = res.data.data[0]
        list.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list.fileId
        that.setData({
          arr: list,
          totalprice: list.sellPrice
        })
        console.log(list)
        that.site();
        console.log(that.data.totalprice)
      },
      data: {
        goodsId: that.data.dataId
      }
    })
  },
  // 获取图片
  getpic() {
    var that = this;
    let list = that.data.arr.
    wx.request({
      url: '',
    })
  },
  //详情页评价
  // evaluate: function (e) {
  //   console.log(e)
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.information + '/message/SeekReply',
  //     method: 'Get',
  //     success: function (res) {
  //       that.setData({
  //         evaluate: res.data
  //       })
  //     },
  //     data: {
  //       orderId: 2,
  //       userId: that.data.userId
  //     }
  //   })
  // },
  //获取顾客地址
  site: function(e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlsite + '/user/address/queryAddress',
      method: 'Get',
      success: function(res) {
        // console.log(res)
        that.setData({
          site: res.data.data
        })
        for (let i = 0; i < that.data.site.length; i++) {
          if (that.data.site[i].isFaultAddress == 0) {
            let sitss = that.data.site[i].hfProvince + that.data.site[i].hfCity + that.data.site[i].hfAddressDetail
            that.setData({
              sites: sitss
            })
          }
        }
      },
      data: {
        token: 13,
        userId: that.data.userId
      }
    })
  },
  //展示地址
  getsitelist() {
    var that=this;
    wx.request({
      url: app.globalData.urlLogin + '/user/address/queryAddress',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: that.data.userId,
        token: 2
      },
      success: function (res) {
        console.log('获取地址', res);
        that.setData({
          addressList: res.data.data
        })
      }
    })
  },
  //加入购物车
  shppingcar: function(e) {
    var that = this;
    let isLogin = that.data.isLogin;
    if (isLogin == false) {
      that.setData({
        show: true
      })
    } else {
      if(that.data.guigestr==''){
        wx.showToast({
          title: '请选择规格',
          icon:'none',
          mask:true
        })
        return
      }
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
    var that = this;
    let purchasePrice = that.data.arr.sellPrice;
    let purchaseQuantity = that.data.goodsNum;
    let amount = purchasePrice * purchaseQuantity;
    let goodsid = that.data.dataId;
    let userAddressId = that.data.userAddressId;
    wx.navigateTo({
      url: '../../ljbuy/ljbuy?purchasePrice=' + purchasePrice + '&purchaseQuantity=' + purchaseQuantity + '&amount=' + amount + '&goodsid=' + goodsid + '&userAddressId=' + userAddressId,
    })
  },


  // 判断userid
  isUserId() {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          canGetSite: true,
          isUserId: true,
          userId: res.data.userId
        })
      },
      fail: function(res) {
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
      success: function(res) {

        that.setData({
          userId: res.data.userId,
        })

      },
      fail: function(res) {
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
      success: function(res) {
        that.setData({
          userId: res.data.userId,
          isLogin: true
        })
        console.log(that.data.userId)
      },
      fail: function(res) {
        that.setData({
          isLogin: false
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
                        that.setData({
                          isLogin: true
                        })
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
                          shibaishow: true,
                          isLogin: false
                        })
                      }
                    },
                    fail: function(res) {
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
  discuss: function() {
    wx.navigateTo({
      url: '../../evaluate/all',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let goodsid = options.goodsid;
    var that = this;
    this.isUserId();
    this.firstIsLogin();
    console.log(id);
    console.log(goodsid)
    that.setData({
      dataId: id,
      goodsId: goodsid
    });
    //用户的id
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          userId: res.data.userId,
        })
        that.site();
      },
    });
    this.particulars();
    // this.evaluate();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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