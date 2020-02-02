const app = getApp();

function getProductForRotation(rotationQuantity, handleResult) {
  let params = {
    quantity: rotationQuantity
  };
  wx.request({
    url: app.endpoint.product + '/hfProduct/getProductsForRotation',
    data: {
      quantity: rotationQuantity
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getProductDetail(productId, handleResult) {
  let params = {
  };
  wx.request({
    url: app.endpoint.product + '/hfProduct/getDetail',
    data: {
      productId: productId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getTopRanking(handleResult) {
  let params = {
  };
  wx.request({
    url: app.endpoint.product + '/seniority/findSeniorityInfo',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  getProductForRotation: getProductForRotation,
  getProductDetail: getProductDetail,
  getTopRanking: getTopRanking
};