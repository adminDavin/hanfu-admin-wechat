const app = getApp();
var util = require('../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {}, //
    dataid:'',
    number:[],
    day: '',
    site: '', //地址
    sites: '',
    dongtai: [],//id 查秒杀商品详情
    userId:'',
    attention: '',//设置关注
    goodsId:'',
    openId:'',
    slideNumber: '1',//详情滑动跳动数字
    collects: false,
    inquire: [],//查询正在开团
    guigeshow: false,
    totalprice: '',
    goodsNum: 1,
    startTime:'',//开始
    stopTime:'',//结束
    hour:'',
    minute:'',
    second:'',
  },

  //分享
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: '同城优品小程序',
      path: 'pages/classify/ping-pay/ping-pay',
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
  //规格弹框
  guigeshow() {
    var that = this;
    that.setData({
      guigeshow: true
    })
  },
  guigeguanbi() {
    var that = this;
    that.setData({
      guigeshow: false
    })
  },
  //规格获取
  getGuige() {
    var that = this;
    wx.request({
      url: app.globalData.urlGoods + '/goods/specifies',
      method: 'get',
      data: {
        goodsId: 2
      },
      success(res) {
        let spec = res.data.data;
        let specList = [];
        console.log(specList)
      },
    })
  },
  //商品数量减
  // subNum() {
  //   var that = this;
  //   let goodsNum = that.data.goodsNum;
  //   let list = that.data.arr
  //   let totalprice = that.data.totalprice;
  //   if (goodsNum > 1) {
  //     goodsNum = goodsNum - 1;
  //     totalprice = totalprice + goodsNum * list.sellPrice
  //     that.setData({
  //       goodsNum: goodsNum,
  //       totalprice: totalprice
  //     })
  //   } else {
  //     return;
  //   }
  // },
  // //商品数量加
  // addNum() {
  //   var that = this;
  //   let goodsNum = that.data.goodsNum;
  //   let list = that.data.arr
  //   console.log(that.data.totalprice)
  //   let totalprice = that.data.totalprice;
  //   goodsNum = goodsNum + 1;
  //   totalprice = totalprice + goodsNum * list.sellPrice
  //   that.setData({
  //     goodsNum: goodsNum,
  //     totalprice: totalprice
  //   })
  // },
  //跳转购物车
    gouwucar:function(){
      wx.switchTab({
        url:'../../shopping/shopping'
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
        title: that.data.attention,
      });
    }
  },
  //设置关注
  attention: function () {
    var that = this;
    //获取用户的openId
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          openId: res.data.userInfo.openId,
        })
      },
    });
    wx.request({
      url: app.globalData.urlGoods + '/goods/Concern',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          attention: res.data.data
        })
      },
      data: {
        goodsId: that.data.goodsId,//列表商品传过来
        openId: that.data.openId
      }
    })
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
  change: function (e) {
    console.log(e)
    var that = this
    that.setData({
      slideNumber: e.detail.current + 1
    })
  },
  //单独购买
  dandushpping:function(){
   
  },
  //获取顾客地址
  site: function (e) {
    console.log(e)
    var that = this;
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
        userId: that.data.userId
      }
    })
  },
  //查询正在开团
  inquire:function(){
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectGroup',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          inquire: res.data
        })
      },
      data: {
        id:that.data.dataid
      }
    })
  },
  // 查询正在更多开团
  more: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectAllGroup',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          showModal: true,
           number:res.data
        })
      },
      data: {
        id:that.data.dataid
      }
    })
  },
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },
 //查看更多评论跳转
  discuss: function () {
    wx.navigateTo({
      url: '../../evaluate/all',
    })
  },
  //根据id 查拼团商品详情
  pinsckill: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/seleteDate',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data
        list.img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list.fileDesc[0].id;
        that.setData({
          dongtai: list,
          startTime: list.startTime,
          stopTime: list.stopTime,
        })
        //开始时间
        let start_hour = (that.data.startTime).substring(11, 13)
        let start_minute = (that.data.startTime).substring(14, 16)
        let start_second = (that.data.startTime).substring(17, 19)
        that.setData({
          hour: start_hour,
          minute: start_minute,
          second: start_second
        })
      },
      data: {
        id:that.data.contentid
      }
    })
  },
  //一键拼团跳转
  yijianpintuan:function(e){
    var that=this;
    var id = that.data.dataid;//团购表id
    console.log(id)
    var hfDesc ="" ;//所选商品规格
    var addressId = ""//用户地址id
    wx.navigateTo({
      url:`../ping-pay/ping-pay?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    let goodsid = options.goodsid;
    var that =this;
    console.log (id);
    console.log(goodsid);
    that.setData({
      dataid:id,
      contentid:id,
      goodsId:goodsid
    });
    // 获取当前时间
    var Day = util.formatTime(new Date());
    this.setData({
      day: Day
    })
    this.pinsckill()
    this.site()
    this.inquire()
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