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


function getProductDetail(params, handleResult) {

  wx.request({
    url: app.endpoint.product + '/hfProduct/getDetail',
    data: params,
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
    url: app.endpoint.product + '/hfProductActivity/getActivityRatation',
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

function groupStatus(groupId, userId, handleResult) {
  wx.request({
    url: app.endpoint.product + '/hfProductActivity/groupStatus?groupId=' + groupId + '&userId=' + userId,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function getProducts(params, handleResult) {
  // params.quantity = 3;
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
// 关注
function addStoneConcern(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/product/addStoneConcern',
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
// 取消关注
function deleteStoneConcern(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/product/deleteStoneConcern',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 收藏
function addProductCollect(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/product/addProductCollect',
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
// 取消收藏
function deleteProductCollect(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/product/deleteProductCollect',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
//库存校验 
function checkResp(params, handleResult) {
  wx.request({
    url: app.endpoint.product + '/hf-goods/checkResp',
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
  getProductForRotation: getProductForRotation,
  getProductDetail: getProductDetail,
  getTopRanking: getTopRanking,
  getCategory: getCategory,
  getRotation: getRotation,
  getProducts: getProducts,
  getProductGroup: getProductGroup,
  getProductSeckill: getProductSeckill,
  getSeckillTimeBar: getSeckillTimeBar,
  groupStatus: groupStatus,
  addStoneConcern:addStoneConcern,
  deleteStoneConcern: deleteStoneConcern,
  addProductCollect: addProductCollect,
  deleteProductCollect: deleteProductCollect,
  checkResp:checkResp
};