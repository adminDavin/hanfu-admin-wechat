// src/pages/order/list.js
const app = getApp();

import userAddressApi from '../../services/hf-user-address.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index?orderStatus=payment',
      });
    } else {
      options.userId = userId;
      this.setData(options);
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(this.data);
  },

})