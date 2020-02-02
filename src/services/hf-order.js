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

function queryOrder(userId, orderStatus, handleResult) {
  let params = {
    userId: userId,
    orderStatus: orderStatus
  };
  wx.request({
    url: app.endpoint.order + '/hf-order/query',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  createOrder: createOrder,
  queryOrder: queryOrder
};