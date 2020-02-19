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

function queryOrder(userId, action, handleResult) {
  let params = {
    userId: userId,
    orderStatus: action 
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
function modifyStatus(id, orderCode, originOrderStatus, targetOrderStatus, handleResult) {
  let params = {
    Id: id,
    orderCode: orderCode,
    originOrderStatus: originOrderStatus,
    targetOrderStatus: targetOrderStatus
  };
  wx.request({
    url: app.endpoint.order + '/hf-order/modifyStatus',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
function qrCode(url,params,handleResult) {
  wx.request({
    url: url,
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
function evaluate(params={}, handleResult) {
  wx.request({
    url: app.endpoint.order + '/message/insertReply',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
export default {
  createOrder: createOrder,
  queryOrder: queryOrder,
  queryOrderStatistics: queryOrderStatistics,
  modifyStatus: modifyStatus,
  qrCode: qrCode,
  evaluate: evaluate
};
