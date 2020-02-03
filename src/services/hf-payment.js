const app = getApp();

function paymentOrder(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.payment + '/hf-payment/order',
    data: params,
    success: res => {
      handleResult(res);
    },
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function refundOrder(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.payment + '/hf-payment/refund',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function completeOrder(orderCode, userId, handleResult) {
  let params = {
    transactionType: 'paymentOrder',
    outTradeNo: orderCode,
    userId: userId
  }
  wx.request({
    url: app.endpoint.payment + '/hf-payment/complete',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  paymentOrder: paymentOrder,
  refundOrder: refundOrder,
  completeOrder: completeOrder
};

