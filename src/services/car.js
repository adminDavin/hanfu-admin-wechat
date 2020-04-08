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
export default {
  addcar:addcar,
  checkcar:checkcar,
  delGoods:delGoods,
  updateCartNum:updateCartNum,
  createOrder:createOrder,
  pay:pay,
  complate:complate
};