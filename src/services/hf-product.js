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

function getProductDetail(productId, stoneId, handleResult) {
  let params = {
  };
  wx.request({
    url: app.endpoint.product + '/hfProduct/getDetail',
    data: {
      productId: productId,
      stoneId: stoneId
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
    url: app.endpoint.product + '/hfProductActivity/findProdcutActivity?activityType=seniorityActivity',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

// 获取首页轮播图请求
function getRotation(handleResult) {
  let params = {
  };
  wx.request({
    url: app.endpoint.product + '/product/slideshow',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function requestProducts(uri, params, handleResult) {
  wx.request({
    url: app.endpoint.product + uri,
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getProducts(params, handleResult) {
  params.quantity = 3;
  let uri = '/hfProduct/getProductsForRotation';
  if (params.action == "chosen") {
    // 精选 跳转过来的
    uri = '/hfProduct/getProductListSeniority';

  } else if (params.action == "category") {
    // 分类页面
    uri = '/hfProduct/getCategory';

  } else if (params.action == "collection") {
    // 商品收藏
    uri = '/hfProduct/getProductsForRotation';

  } else if (params.action == "history") {
    // 浏览记录
    uri = '/hfProduct/getProductsForRotation';
  } 
  requestProducts(uri, params, handleResult);
}

function getCategory(params = {}, handleResult) {
  params.quantity = 3;
  wx.request({
    url: app.endpoint.product + '/product/category',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getProductGroup(handleResult) {
  wx.request({
    url: app.endpoint.product + '/hfProduct/getActivityProductList?activityType=groupActivity',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getSeckillTimeBar(handleResult) {
  let params = {};
  params.quantity = 3;
  wx.request({
    url: app.endpoint.product + '/hfProduct/getProductsForRotation',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getProductSeckill(params = {}, handleResult) {
  params.quantity = 3;
  wx.request({
    // url: app.endpoint.product + '/hfProduct/getProductsForRotation',
    url: app.endpoint.product + '/hfProduct/getActivityProductList?activityType=seckillActivity',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
export default {
  getProductForRotation: getProductForRotation,
  getProductDetail: getProductDetail,
  getTopRanking: getTopRanking,
  getCategory: getCategory,
  getRotation: getRotation,
  getProducts: getProducts,
  getProductGroup: getProductGroup,
  getProductSeckill: getProductSeckill,
  getSeckillTimeBar: getSeckillTimeBar
};