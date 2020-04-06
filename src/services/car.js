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

export default {
  addcar:addcar,
  checkcar:checkcar,
  delGoods:delGoods,
  updateCartNum:updateCartNum,
};