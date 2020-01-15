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
    schedule: '',
    currentTab: 0,//切换
    userId: '',
    lunBoTu:[],//轮播图
    ordersId:'',
    goodsId:'',
    userId:'',
    show: false,
    shibaishow: false,
    beforetimes:[],
    beforestatus:[],
    startstatus:''
  },
  /**
   * 生命周期函数--监听页面加载
   */

  //查询排行相关信息
  ranking: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlmorecategory + '/seniority/findSeniorityInfo',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        for (var index in list) {
          list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
        }
        that.setData({
          ranking: list
        })
      },
    })
  },

  // 扫一扫
  getScancode: function () {
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
              url: app.globalData.urlHexiao + '/test/jiema',
              method: 'get',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              data: {
                goodsId: qrl[0].goodsId,
                ordersId: qrl[0].orderId
              },
              success: function (res) {
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
          show: true
        })
      }
    })
    // 允许从相机和相册扫码
  },

  // 扫码之后发送请求携带userid
  sendMsg: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        that.setData({
          userId: res.data.userId,
        })
        that.sendUserId();
      },
      fail: function (res) {
        main.setData({
          show: true,
          shibaishow: true
        })
      }
    })
  },

  sendUserId: function () {
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

      success: function (res) {
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
      fail: function (res) {
        wx.hideLoading();
        main.setData({
          show: true,
          shibaishow: true
        })
      }
    })
  },


  onLoad: function (options) {
    console.log(options);
    // 获取当前时间
    var Day = util.formatTime(new Date());
    this.setData({
      day: Day
    })
    this.lunBoTu();
    this.ranking();
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
      url: app.globalData.urlGoods + '/product/slideshow',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        console.log(res)
        for (var index in list) {
          list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
        }
        that.setData({
          lunBoTu:list
        })
      },
    });
  },
  //轮播图跳转
   lunbotutiao:function(e){
     var that = this;
     var id = e.currentTarget.dataset.id;
     wx.navigateTo({
       url: `../classify/particulars/particulars?id=${id}`,
     })
   },
  //推荐榜单
  bangdan: function (e) {
    let id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../classify/commodity/commodity?id='+id,
    })
  },
  //秒杀切换
  clickTab: function (e) {
    var that = this;
    let beforetimes=that.data.beforetimes;
    let beforestatus=that.data.beforestatus;
    let currentTab = e.detail.index;
    let title=e.detail.title;
    let startTime='';
    let startstatus=''
    that.setData({
      currentTab: currentTab,
    })
    for(var index in beforetimes){
      let time=beforetimes[index].substring(11,16);
      if(title==time){
        startstatus=beforestatus[index]
        startTime=beforetimes[index];
      }
    }
    console.log(startstatus)
    that.setData({
      startstatus:startstatus
    })
    wx.request({
      url: app.globalData.urlseckill + '/kill/seleteDate',
      method: 'Get',
      success: function (res) {
        console.log(res.data)
        let list = res.data;
        for (var index in list) {
          list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].fileDesc[0].id;
        }
        that.setData({
          schedule: list,
        })
      },
      data: {
        startTime: startTime
      }
    })
  },
  // 点击拼团
  requestData: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectCategoryName',
      method: 'Get',
      success: function (res) {
        let list=res.data;
        console.log(list)
        that.setData({
          arr: list
        })
        let pingtuanfirst=list[0]
        that.requestfirst(pingtuanfirst)
      },
    })
  },
  // 首次点击拼团
  requestfirst: function (name) {
    var that = this;
    wx.request({
      url: app.globalData.urlpuzzle + '/group/selectCategory',
      method: 'Get',
      success: function (res) {
        let list = res.data
        let nowTime=new Date().getTime();
        for (var index in list) {
          let starttime = list[index].startTime ;
          let stoptime = list[index].stopTime;
          if(starttime-nowTime>0){
            list[index].qinggoustatus=0 //还没开始
          }else if(starttime-nowTime<=0&&stoptime-nowTime>0){
            list[index].qinggoustatus = 1 //已经开始
          }else if(stoptime-nowTime<=0){
            list[index].qinggoustatus = 2  //已经结束
          }
          list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].fileDesc[0].id;
        }
        that.setData({
          name: list,
        })
        console.log(list)
      },
      data: {
        name: name
      }
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
        let list = res.data
        let nowTime = new Date().getTime();
        for (var index in list) {
          let starttime = list[index].startTime;
          let stoptime = list[index].stopTime;
          if (starttime - nowTime > 0) {
            list[index].qinggoustatus = 0 //还没开始
          } else if (starttime - nowTime <= 0 && stoptime - nowTime > 0) {
            list[index].qinggoustatus = 1 //已经开始
          } else if (stoptime - nowTime <= 0) {
            list[index].qinggoustatus = 2  //已经结束
          }
          list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].fileDesc[0].id;
        }
        that.setData({
          name: list,
        })
      },
      data: {
        name: e.detail.title
      }
    })
  },
  //根据时间查秒杀商品
  seckillshpping: function (e) {
    var that = this;
    if(e.detail.title=='精选'){
      that.ranking()
    } else if (e.detail.title == '拼团'){
      that.requestData();
    } else if (e.detail.title == '秒杀') {
      that.miaosha();
    }
  },
// 点击秒杀
miaosha(){
  var that=this;
  let beforetimes = [];
  let beforestatus = [];
  let timebox = [];
  wx.request({
    url: app.globalData.urlseckill + '/kill/selectByDate',
    method: 'Get',
    success: function (res) {
      let times = res.data;
      let nowTime = new Date().getTime();
      for (var index in times) {
        let timestart = times[index].time;
        if (timestart - nowTime > 0) {
          times[index].status = 1  //即将开始
        } else {
          times[index].status = 0 //已开始
        }
      }
      let startTime = util.formatDate(times[0].time);
      let startstatus = times[0].status;
      that.setData({
        startTime: startTime,
        startstatus: startstatus
      })
      for (var index in times) {
        beforestatus.push(times[index].status)
        beforetimes.push(util.formatDate(times[index].time))
        times[index].time = util.formatDate(times[index].time).substring(11, 16)
      }
      that.setData({
        beforetimes: beforetimes,
        beforestatus: beforestatus,
        times: times
      })
      wx.request({
        url: app.globalData.urlseckill + '/kill/seleteDate',
        method: 'Get',
        success: function (res) {
          let list = res.data;
          for (var index in list) {
            list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].fileDesc[0].id;
          }
          that.setData({
            schedule: res.data,
          })
        },
        data: {
          startTime: startTime
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
    this.lunBoTu();
    this.ranking();
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