const app = getApp();

function paymentOrder(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.payment + '/hf-payment/order',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  paymentOrder: paymentOrder
};

