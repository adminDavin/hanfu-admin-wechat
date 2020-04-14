const app = getApp();
function addcar(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/cart/add',
    method: 'get',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      
      console.log(params, res);
    }
  });
}
function checkcar(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/cart/getCartList',
    method: 'get',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
      
    }
  });
}

function updateCartNum(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/cart/updateCartNum',
    method: 'get',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    
    }
  });
}
function delGoods(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/cart/delGoods',
    method: 'get',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    
    }
  });
}

function getquan(params={}, handleResult) { 
  wx.request({
    url: app.endpoint.product + '/discountCoupon/couponMy',
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
function createOrder(params={}, handleResult) {
  wx.request({
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
function pay(params={}, handleResult) {
  console.log(app.endpoint.payment + '/hf-payment/order')
  wx.request({
    url: app.endpoint.payment + '/hf-payment/order',
    method: 'get',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);

    }
  });
}
function complate(params,handleResult) {
  console.log(app.endpoint.payment + '/hf-payment/complete')
  wx.request({
    url: app.endpoint.payment + '/hf-payment/complete',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}

function getdetail(params,handleResult) {
  console.log(app.endpoint.order + '/hf-order/query')
  wx.request({
    url: app.endpoint.order+ '/hf-order/query',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function modifyStatus(params,handleResult) {
  console.log(app.endpoint.order + '/hf-order/modifyStatus')
  wx.request({
    url: app.endpoint.order+ '/hf-order/modifyStatus',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function logistics(params,handleResult) {
  console.log(app.endpoint.order + '/query/logistics')
  wx.request({
    url: app.endpoint.order+ '/query/logistics',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function ma(params,handleResult) {
  console.log(app.endpoint.order + '/cancel/activity/create/activity-code')
  wx.request({
    url: app.endpoint.order+ '/cancel/activity/create/activity-code',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function ping(params,handleResult) {
  console.log(app.endpoint.product + '/goods/addEvaluateProduct')
  wx.request({
    url: app.endpoint.product + '/goods/addEvaluateProduct',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data:params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}


export default {
  addcar:addcar,
  checkcar:checkcar,
  delGoods:delGoods,
  updateCartNum:updateCartNum,
  createOrder:createOrder,
  pay:pay,
  complate:complate,
  getquan:getquan,
  modifyStatus:modifyStatus,
  getdetail:getdetail,
  logistics:logistics,
  ma:ma,
  ping:ping,
};