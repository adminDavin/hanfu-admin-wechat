const app = getApp()
Page({

  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
    // hideModals:false,
    dataId: '',
    goodsId: '',
    arr: [],
    evaluate: '', //评价
    site: '', //地址
    sites: '',
    shppingcar: '' ,//购物车
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
  particulars: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/byGoodsId',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          arr: res.data.data
        })
      },
      data: {
        goodsId: that.data.dataId
      }
    })
  },
  //详情页评价
  evaluate: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.information + '/message/SeekReply',
      method: 'Get',
      success: function (res) {
        that.setData({
          evaluate: res.data
        })
      },
      data: {
        orderId: 2,
        userId: 12
      }
    })
  },
  //获取顾客地址
  site: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlsite + '/user/address/queryAddress',
      method: 'Get',
      success: function (res) {
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
        userId: 13
      }
    })
  },
  //加入购物车
  shppingcar: function (e) {
    // console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlshppingcar + '/cart/add',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          shppingcar: res.data
        })
      },
      data: {
        goodsId: 2,
        num: 2,
        userId: 2
      }
    })
  },
  //立即购买
  buyquick: function (e) {
    // console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.information + '/order/creat',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          
        })
      },
      data: {
        
      }
    })
    wx.navigateTo({
      url:'../../order/order',
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
      dataId: id,
    })
    this.particulars();
    this.evaluate();
    this.site();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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