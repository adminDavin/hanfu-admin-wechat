const app = getApp();
function paymentOrder(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.payment + '/hf-payment/order',
    data: params,
    header: {
      'token': wx.getStorageSync('token'),
      'bossId': app.globalData.bossId
    },
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
    header: {
      'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function completeOrder(orderCode, userId, bossid, handleResult) {
  let params = {
    transactionType: 'paymentOrder',
    payOrderId: orderCode,
    userId: userId
  }
  wx.request({
    url: app.endpoint.payment + '/hf-payment/complete',
    data: params,
    header: {
      'token': wx.getStorageSync('token')
    },
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

