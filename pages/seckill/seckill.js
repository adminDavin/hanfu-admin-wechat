const app = getApp()
var util = require('../../utils/util.js')
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
    times:'',
    times1: '',
    times2: '',
    times3: '',
    schedule:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 拼团标题
  onLoad: function (options) {
    this.requestData();
    // 获取当前时间
    var Day = util.formatTime(new Date());
    this.setData({
      day: Day
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
    // console.log(e)
    var that = this;
    wx.showToast({
      title: e.detail.title,
      icon: 'none'
    });
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
        that.setData({
          time: res.data
        })
        for (let i=0; i < that.data.time.length; i++) {
          // console.log(that.data.time[i])
          let str = that.data.time[0].substring(11, 16)
          let str1= that.data.time[1].substring(11, 16)
          let str2= that.data.time[2].substring(11, 16)
          let str3= that.data.time[3].substring(11, 16)
          that.setData({
            times: str,
            times1: str1,
            times2: str2,
            times3: str3
          })
        }
        wx.request({
          url: app.globalData.urlseckill + '/kill/seleteDate',
          method: 'Get',
          success: function (res) {
            that.setData({
              schedule: res.data
            })

          },
          data: {
            startTime: that.data.day+' '+that.data.times
          }
        })
      },
    })
  },
  // 跳转携带id
  particulars: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: `../classify/puzzle-particulars/puzzle-particulars?id=${id}`,
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