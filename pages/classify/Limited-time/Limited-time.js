const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
    // hideModals:false,
    contentid: '',//id 查秒杀商品详情
    arr:'',//秒
    site: '', //地址
    sites: '',
    slideNumber:'1',
    userId:'',
    collects: false,
    startTime: '', //开始时间
    stopTime: '', //结束时间 
    hour: '',
    minute: '',
    second: '',
    fileDesc: ''//商品图片
  },
  //购物车
  gouwucar:function(){
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
  //详情滑动跳动数字
  current: function (e) {
    console.log(e)
    var that = this
    that.setData({
      slideNumber: e.detail.current + 1
    })
  },
  //设置关注
  // attention: function () {
  //   var that = this;
  //   wx.request({
  //     url: app.globalData.urlGoods + '/goods/Concern',
  //     method: 'Get',
  //     success: function (res) {
  //       console.log(res)
  //       that.setData({
          
  //       })
  //     },
  //     data: {
  //       goodsId: 1,//列表商品传过来
  //       openId: 1
  //     }
  //   })
  // },
  //分享
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '同城优品小程序',
      path: 'pages/classify/Limited-time/Limited-time',
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
  //获取顾客地址
  site: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlsite + '/user/address/queryAddress',
      method: 'Get',
      success: function (res) {
        console.log(res)
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
        userId:that.data.userId
      }
    })
  },
  //根据id 查秒杀商品详情
  contentsckill: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlseckill + '/kill/seletById',
      method: 'Get',
      success: function (res) {
        let list = res.data;
        console.log(res)
        that.setData({
          arr: list,
          fileDesc: list.fileDesc,
          startTime: list.startTime,
          stopTime: list.stopTime
        });
        //开始时间
        let start_hour = (that.data.startTime).substring(11, 13)
        let start_minute = (that.data.startTime).substring(14, 16)
        let start_second = (that.data.startTime).substring(17, 19)
        that.setData({
          hour: start_hour,
          minute: start_minute,
          second: start_second
        });
        for (var index in that.data.fileDesc){
          that.data.fileDesc[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + that.data.fileDesc[index].id;
        }
      },
      data: {
        id: that.data.contentid
      }
    })
  },
  //查看更多评论跳转
  discuss: function () {
    wx.navigateTo({
      url: '../../evaluate/all',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    var that = this;
    console.log(id);
    that.setData({
      contentid: id
    });
    //用户的id
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
        })
        console.log(that.data.userId)
      },
    });
    this.contentsckill();
    this.site();
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