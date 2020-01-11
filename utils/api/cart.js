var app = getApp();

//去结算
function toSettle(baseUrl, requestPath, params = {}, doSuccess) {
  wx.request({
    url: baseUrl + requestPath,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    data: params,
    success: function (res) {
      doSuccess(res);
    }
  })
}

//获取购物车信息
function getCartList(baseUrl, requestPath, params = {}, doSuccess) {
  wx.request({
    url: baseUrl + requestPath,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    data: params,
    success: function (res) {
      doSuccess(res);
    }
  })
}
//不传参get
function getList(baseUrl, requestPath,doSuccess) {
  wx.request({
    url: baseUrl + requestPath,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res);
    }
  })
}


module.exports = {
  toSettle:toSettle,
  getCartList:getCartList,
  getList: getList
}