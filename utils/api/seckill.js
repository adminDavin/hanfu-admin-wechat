var app = getApp();

//GET请求，不需传参，直接URL调用，
function getData(baseUrl, requestPath, doSuccess) {
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

//GET请求，不需传参，直接URL调用，
function getDataWithParams(baseUrl, requestPath, params = {},  doSuccess) {
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

module.exports = {
  getData: getData,
  getDataWithParams: getDataWithParams
}