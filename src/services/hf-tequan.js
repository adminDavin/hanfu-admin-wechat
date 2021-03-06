const app = getApp();

function getcang(userId,handleResult) {
  console.log(app.endpoint.product+ '/home/findProductCollectByUserId')
  wx.request({
    url: app.endpoint.product + '/home/findProductCollectByUserId',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function getlishi(userId,handleResult) {
  console.log(app.endpoint.product+ '/home/findBrowseRecordByUserId')
  wx.request({
    url: app.endpoint.product + '/home/findBrowseRecordByUserId',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function guan(userId,handleResult) {
  console.log(app.endpoint.product+ '/home/findStoneConcernByUserId')
  wx.request({
    url: app.endpoint.product + '/home/findStoneConcernByUserId',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}

function getquan(userId,handleResult) {
  console.log(app.endpoint.quan + '/hf-auth/findMemberPrerogative')
  wx.request({
    url: app.endpoint.quan + '/hf-auth/findMemberPrerogative',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function getlevelList(handleResult) {
  console.log(app.endpoint.quan + '/hf-auth/findUserMemberLevel')
  wx.request({
    url: app.endpoint.quan + '/hf-auth/findUserMemberLevel',
    method: 'GET',
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function pay(params,handleResult) {
  console.log(app.endpoint.payment + '/hf-payment/order')
  wx.request({
    url: app.endpoint.payment + '/hf-payment/order',
    method: 'GET',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
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
function jifenMing(userId,handleResult) {
  console.log(app.endpoint.product + '/home/findIntegralRechargeRecord')
  wx.request({
    url: app.endpoint.product + '/home/findIntegralRechargeRecord',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function yuMing(userId,handleResult) {
  console.log(app.endpoint.product + '/home/findRechargeRecord')
  wx.request({
    url: app.endpoint.product + '/home/findRechargeRecord',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}

function findInfoByUserId(userId,handleResult) {
  console.log(app.endpoint.quan + '/hf-auth/findInfoByUserId')
  wx.request({
    url: app.endpoint.quan + '/hf-auth/findInfoByUserId',
    method: 'GET',
    data: {
      userId : userId
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function create(params,handleResult) {
  console.log(app.endpoint.order + '/hf-order/create')
  wx.request({
    url: app.endpoint.order + '/hf-order/create',
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
function couponHall(params,handleResult){
  
  console.log(app.endpoint.product + '/discountCoupon/couponHall')
  wx.request({
    url: app.endpoint.product + '/discountCoupon/couponHall',
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
function getstoneproduct(id,handleResult){
  
  console.log(app.endpoint.product + '/hfProduct/getstone')
  wx.request({
    url: app.endpoint.product + '/hfProduct/getstone',
    method: 'get',
    data:id,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function name(id,handleResult){
  
  console.log(app.endpoint.product + '/hfProduct/getHfName')
  wx.request({
    url: app.endpoint.product + '/hfProduct/getHfName',
    method: 'get',
    data:id,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}

function getpingjia(id,handleResult){
  
  console.log(app.endpoint.product + '/goods/selectEvaluateCompleteGoods')
  wx.request({
    url: app.endpoint.product + '/goods/selectEvaluateCompleteGoods',
    method: 'get',
    data:id,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}
function getwait(id,handleResult){
  
  console.log(app.endpoint.product + '/goods/selectEvaluateGoods')
  wx.request({
    url: app.endpoint.product + '/goods/selectEvaluateGoods',
    method: 'get',
    data:id,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}

export default {
  jifenMing:jifenMing,
  getquan: getquan,
  findInfoByUserId:findInfoByUserId,
  create:create,
  pay:pay,
  complate:complate,
  getlevelList:getlevelList,
  yuMing:yuMing,
  getcang:getcang,
  getlishi:getlishi,
  guan:guan,
  couponHall:couponHall,
  getstoneproduct:getstoneproduct,
  name:name,
  getwait:getwait,
  getpingjia:getpingjia
};