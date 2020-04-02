const app = getApp();

function getGoodsDetail(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/goods/getDetail',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  }); 
}
// 获取团购列表
function getListGrou(params,handleResult) {
  wx.request({
    url: app.endpoint.product + '/hfProductActivity/ListGroup',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getGoodDetailByProductId(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/goods/getGoodDetailByProductId',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  }); getGoodDetailByProductId
}

function checkGoodsResp(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/goods/getDetail',
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

export default {
  getGoodsDetail: getGoodsDetail,
  getGoodDetailByProductId: getGoodDetailByProductId,
  checkGoodsResp: checkGoodsResp,
  getListGrou: getListGrou
};