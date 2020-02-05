const app = getApp();

function createOrder(params={}, handleResult) {
  wx.request({
    url: app.endpoint.order + '/hf-order/create',
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}


function queryOrderStatistics(userId, handleResult) {
  let params = {
    userId: userId  };
  wx.request({
    url: app.endpoint.order + '/hf-order/statistics',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

