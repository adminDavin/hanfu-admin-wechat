var util = require('../../../utils/util.js');

const app = getApp();
const getRequest = function (uri, params, handleResult) {
  wx.request({
    url: app.globalData.urlGoods + uri,
    method: 'Get',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    },
    data: params
  })
}

const getRequestAbs = function (url, params, handleResult) {
  wx.request({
    url: url,
    method: 'Get',
    success: res => handleResult(res),
    // header: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    // },
    fail: (res) => {
      console.log(params, res);
    },
    data: params
  })
}

module.exports = {
  getGoodsByProductId: function(params={}, handle) {
    getRequest('/goods/specifiess', params, (res) => handle(res));
  },
  getSitelist: function (params = {}, handle) {
    getRequestAbs(app.globalData.urlLogin + '/user/address/queryAddress', params, (res) => handle(res));
  },
  getAddressDetail: function (params = {}, handle) {
    getRequestAbs(app.globalData.urlsite + '/user/address/addressDetail', params, (res) => handle(res));
  },
  getProductInfo: function (params = {}, handle) {
    getRequest('/goods/byGoodsId', params, (res) => handle(res));
  },
  checkIsLogin: function(userId) {
    return typeof userId == "undefined" || userId == null || userId == "";
  }
}