const app = getApp();
// 普通订单
function createOrder(params={}, handleResult) {
  wx.request({
    // url: app.endpoint.order + '/hf-order/create',
    url: app.endpoint.order + '/hf-order/Ordercreate',
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
// 到店支付订单
function create(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.order + '/hf-order/create',
    // url: app.endpoint.order + '/hf-order/Ordercreate',
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
function addGroup(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/hfProductActivity/addGroup',
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
function entranceGroup(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/hfProductActivity/entranceGroup',
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
function qrCode(params,handleResult) {
  wx.request({
    url: app.endpoint.order + '/cancel/testCancel',
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
  evaluate: evaluate,
  addGroup: addGroup,
  entranceGroup:entranceGroup,
  create: create
};
