// src/pages/login/index.js
// src/pages/product/detail.js
const app = getApp();

import userApi from '../../services/hf-user.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    code: '',
    loginParams: {},
    isAuth: false,
    isLogin: false,
    isBindPhone: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.setData({ isAuth: true, userInfo: res.userInfo });
            }
          });
        } else {
          this.setData({ isAuth: false });
        }
      }
    });
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data);
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('isAuth', true);
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.setData({isAuth: true, userInfo: e.detail.userInfo });
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      });
    }
  },
  onWechartLogin: function(e) {
    wx.login({
      success: (res) => {
        let code = res.code;
        wx.getUserInfo({
          success: (res) => userApi.login({
              code: code,
              encryptedData: res.encryptedData,
              iv: res.iv,
            }, (response) => {
              let result = response.data.data;
              result.isBindPhone = util.isEmpty(result.user.phone);
              result.isAuth = true;
              result.userInfo = res.userInfo;
              console.log(result);
              wx.setStorageSync("userId", result.userId);
              wx.getStorage({
                key: 'userId',
                success: function (res) {
                  console.log(res);
                },
              });
              this.setData(result);
            })
        });
      }
    });
  },
  getPhoneNumber(e) {
    wx.login({
      success: (res) => {
        let code = res.code;
        console.log(e.detail.encryptedData);
        userApi.modifyUserInfo({
          code: code,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
        }, (response) => {
          let result = response.data.data;
          result.userId = result.id;
          wx.setStorage(result);
          this.setData(result);
        });
      }
    });
  }
})