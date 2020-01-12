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

module.exports = {
  getGoodsByProductId: function(params={}, handle) {
    getRequest('/goods/specifiess', params, (res) => handle(res));
  }
}