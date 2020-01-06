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
          attention:res.data.data  
        })
      },
      data: {
        goodsId: that.data.goodsId,//列表商品传过来
        openId: that.data.openId
      }
    })
    wx.showToast({
      title: `关注成功`,
    });
  },
  //点击分享
  fenxiang: function () {
    wx.navigateTo({
      url: '../ping-pay/ping-pay'
    })
  },
  //单独购买
  dandushpping:function(){
    wx.request({
      url: app.globalData.urlpuzzle + '/group/shopping',
      method: 'Post',
      success: function (res) {
        console.log(res)
        that.setData({

        })
      },
      data: {
        groupId: 1,//列表商品传过来
        userId:that.data.userId
      }
    });
    wx.navigateTo({
      url: '../../orderprocessing/daizhifu/orderprocessing'
    })
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
  // 更多拼团
  more: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlseckill + '/group/selectGroup',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          showModal: true,
          number:res.data
        })
      },
      data: {
        id: that.data.dataid
      }
    })
  },
  close_mask: function () {
    this.setData({
      showModal: false
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
        that.setData({
          dongtai: res.data
        })
      },
      data: {
        id: that.data.contentid
      }
    })
  },
  //一键拼团跳转
  yijianpintuan:function(e){
    var that=this;
    var id = that.data.contentid
    console.log(id)
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
    this.pinsckill();
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