// src/pages/myself/address/detail.js
const app = getApp();

import userAddressApi from '../../../services/hf-user-address.js';
import util from '../../../utils/util.js';
const QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
const demo = new QQMapWX({ key: 'CLGBZ-V5SCF-PJ4JQ-NUZUA-2YP45-C6BMX' });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    formatted_addresses: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.action = "addAddress";
    options.userId = "965";
    this.setData(options);
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
    wx.getLocation({
      success: function(res) {
        console.log(res);
      },
    })
  },

  // 获取当前地理位置 授权验证
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
      type: 'wgs84',
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
                let address = { address: res.result.address, formatted_addresses: res.result.formatted_addresses.recommend };
                this.setData({ address: address });
              },
              fail: (res) => {
                console.log(res);
              }
            });
          },
        })
        console.log(res)
      }
    })
  },
  saveAddr: function (e) {
    if (e.detail.value.name == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的姓名！"
      })
    } else if (e.detail.value.phone == "") {
      wx.showModal({
        title: '提示',
        content: "请填写您的手机号！"
      })
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      wx.showModal({
        title: '提示',
        content: "手机号格式不正确"
      })
    } else if (e.detail.value.address === undefined) {
      wx.showModal({
        title: '提示',
        content: "请选择您的所在区域"
      })
    } else if (e.detail.value.door_card == "") {
      wx.showModal({
        title: '提示',
        content: "请输入您的详细地址"
      })
    } else {
      console.log(e.detail.value);
      if (this.data.action == "addAddress") {
        let params = {
          userId: this.data.userId,
          hfCity: this.data.address.address,
          hfDesc: this.data.address.formatted_addresses,
          hfAddressDetail: e.detail.value.door_card,
          contact: e.detail.value.contact,
          phoneNumber: e.detail.value.phone
        };
        userAddressApi.addAddress(params, (res) => {
          console.log(res);
          wx.navigateBack({
            delta: 1
          });
        });
      } 
    }
  }
})