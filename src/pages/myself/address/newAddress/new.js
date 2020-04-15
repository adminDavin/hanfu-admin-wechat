// src/pages/myself/address/newAddress/new.js
const app = getApp();
const QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({ key: 'CLGBZ-V5SCF-PJ4JQ-NUZUA-2YP45-C6BMX' });
import WxValidate from '../../../../utils/WxValidate.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setshow: true,
    contact: '',
    phoneNumber: '',
    hfProvince: '',
    hfCity: '',
    hfAddressDetail: '',
    isFaultAddress: '',
  },

  // 定位
  getCityNameOFLocation: function () {
    wx.navigateTo({
      url: '/pages/myself/address/detail'
    })
  },
  // 定位
  getCurrentLocal() {
    let that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation'] == false) {// 如果已拒绝授权，则打开设置页面
          wx.openSetting({
            success(res) { }
          });
        } else { // 第一次授权，或者已授权，直接调用相关api
          that.getMyLocation()
        }
      }
    })
  },

  // 获取当前地理位置
  getMyLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        wx.chooseLocation({
          success: (res) => {
            // 调用接口转换成具体位置
            demo.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: (res) => {
                console.log(res.result);
                let hfAddressDetail = res.result.address
                let hfProvince = res.result.ad_info.city
                let hfCity = res.result.ad_info.district
                this.setData({ hfAddressDetail: hfAddressDetail, hfProvince:hfProvince, hfCity:hfCity});
              },
              fail: (res) => {
                console.log(res);
                wx.showModal({
                  title: '解析地址失败',
                  content: res,
                })
              }
            });
          },
        })
        console.log(res)
      },
      fail: (res) => {
        wx.showModal({
          title: '已选择地址',
          content: res,
        })
      }
    })
  },

  setshowbtn: function () {
    var that = this;
    that.setData({
      setshow: !that.data.setshow
    })
  },
  contact(e) {
    var that = this;
    that.setData({
      contact: e.detail.value
    })
  },
  phoneNumber(e) {
    var that = this;
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  hfProvince(e) {
    var that = this;
    that.setData({
      hfProvince: e.detail.value
    })
  },
  hfCity(e) {
    var that = this;
    that.setData({
      hfCity: e.detail.value
    })
  },
  hfAddressDetail(e) {
    var that = this;
    that.setData({
      hfAddressDetail: e.detail.value
    })
  },
  submit(e) {
    var that = this;
    if (that.data.setshow == true) {
      that.setData({
        isFaultAddress: 1
      })
    } else {
      that.setData({
        isFaultAddress: 0
      })
    }

    if (wx.getStorageSync('userId') == null) {
      wx.showToast({
        title: '用户未登录',
      })
    }
    console.log(this.data);

    if (that.data.contact == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的姓名！"
      })
    } else if (that.data.phoneNumber == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的手机号！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(that.data.phoneNumber))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (that.data.hfProvince === '') {
      wx.showModal({
        title: '提示',
        content: "请选择您的所在区域"
      })
    } else if (that.data.hfAddressDetail == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的详细地址"
      })
    } else if (that.data.hfCity == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的城市"
      })
    } else {
      wx.request({
        url: app.endpoint.user + '/user/address/addAddress',
        method: 'get',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          hfConty: '中国',
          contact: that.data.contact,
          phoneNumber: that.data.phoneNumber,
          hfProvince: that.data.hfProvince,
          hfCity: that.data.hfCity,
          hfAddressDetail: that.data.hfAddressDetail,
          userId: wx.getStorageSync('userId'),
          isFaultAddress: that.data.isFaultAddress,
          hfDesc: '备注'
        },
        success: function (res) {
          wx.showToast({
            title: '地址添加成功',
          })
          //返回上一个页面
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面
          prevPage.getAddress();//触发父页面中的方法
          wx.navigateBack()
        },
        fail: function (res) {
          console.log(res)
          wx.showToast({
            title: '地址添加失败',
          })
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log(res)
        that.setData({
          userId: res.data.userId
        })
      },
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