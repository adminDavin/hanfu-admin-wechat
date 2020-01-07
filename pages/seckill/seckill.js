const app = getApp()
var util = require('../../utils/util.js')
const apiSeckill = require('../../utils/api/seckill.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    name: [],
    id: [],
    day: '', //当前时间
    time: [], //时间
    times: [],
    times1: '',
    times2: '',
    times3: '',
    schedule: '',
    currentTab: 0,//切换
    userId: '',
    lunBoTu:[]//轮播图
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    var Day = util.formatTime(new Date());
    this.setData({
      day: Day
    })
    this.requestData();
    this.lunBoTu()
  },
  //搜索
  sousuo:function (){
    wx.navigateTo({
      url: '../seckill/seek/seek',
    })
  },
  //轮播图
  lunBoTu:function(e){
    var that=this;
    wx.request({
      url: app.globalData.urlGoods + '/goods/categoryId',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          lunBoTu:res.data.data
        })
      },
    });
  },
  //轮播图跳转
   lunbotutiao:function(e){
     var that = this;
     wx.request({
       url: app.globalData.urlGoods + '/goods/categoryId',
       method: 'Get',
       success: function (res) {
         console.log(res)
         that.setData({
           lunBoTu: res.data.data
         })
       },
     })
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: `../classify/commodity/commodity?id=${id}`,
     })
   },
  //推荐榜单
  bangdan: function () {
    wx.navigateTo({
      url: '../classify/commodity/commodity?',
    })
  },
  //秒杀切换
  clickTab: function (e) {
    var that = this;
    let currentTab = e.currentTarget.dataset.id;
    console.log(currentTab)
    that.setData({
      currentTab: e.currentTarget.dataset.id,
    })
    let time = 0;
    if (currentTab == 0) {
      time = that.data.times
    } else if (currentTab == 1) {
      time = that.data.times1
    } else if (currentTab == 2) {
      time = that.data.times2
    } else if (currentTab == 3) {
      time = that.data.times3
    }
    wx.request({
      url: app.globalData.urlseckill + '/kill/seleteDate',
      method: 'Get',
      success: function (res) {
        that.setData({
          schedule: res.data,
        })
      },
      data: {
        startTime: that.data.day + '  ' + time
      }
    })
  },
  requestData: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectCategoryName',
      method: 'Get',
      success: function (res) {
        that.setData({
          arr: res.data
        })
      },
    })
  },
  // 拼团内容
  requestcontent: function (e) {
     console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectCategory',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          name: res.data,
        })
      },
      data: {
        name: e.detail.title
      }
    })
  },
  //根据时间查秒杀商品
  seckillshpping: function (e) {
    // console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlseckill + '/kill/selectByDate',
      method: 'Get',
      success: function (res) {
        // console.log(res)
        that.setData({
          time: res.data
        })
        let str = that.data.time[0].substring(11, 16)
        let str1 = that.data.time[1].substring(11, 16)
        let str2 = that.data.time[2].substring(11, 16)
        let str3 = that.data.time[3].substring(11, 16)
        that.setData({
          times: str,
          times1: str1,
          times2: str2,
          times3: str3
        })
        wx.request({
          url: app.globalData.urlseckill + '/kill/seleteDate',
          method: 'Get',
          success: function (res) {
            // console.log(res)
            that.setData({
              schedule: res.data,
            })
          },
          data: {
            startTime: that.data.day + '  ' + that.data.times
          }
        })
      },
    })
  },

  // 跳转携带id跳拼团
  particulars: function (e) {
    var id = e.currentTarget.dataset.id
    var goodsid = e.currentTarget.dataset.goodsid
    console.log(id)
    console.log(goodsid)
    wx.navigateTo({
      url: `../classify/puzzle-particulars/puzzle-particulars?id=${id}&goodsid=${goodsid}`,
    })
  },
  // 跳转携带id跳秒杀
  miaoparticulars: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../classify/Limited-time/Limited-time?id=${id}`,
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