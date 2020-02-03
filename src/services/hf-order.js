const app = getApp();

function createOrder(params={}, handleResult) {
  wx.request({
    url: app.endpoint.order + '/hf-user-address/query',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  createOrder: createOrder
};