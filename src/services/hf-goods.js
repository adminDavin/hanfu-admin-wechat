const app = getApp();

function getGoodsDetail(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/goods/getDetail',
    data: params,
    header: {
      'bossId': app.globalData.bossId
    },
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
    header: {
      'bossId': app.globalData.bossId
    },
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
    header: {
      'bossId': app.globalData.bossId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function checkGoodsResp(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/goods/getDetail',
    method: 'POST',
    
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId
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