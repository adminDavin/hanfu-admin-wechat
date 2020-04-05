const app = getApp();

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

export default {
  jifenMing:jifenMing,
  getquan: getquan,
  findInfoByUserId:findInfoByUserId,
  create:create,
  pay:pay,
  complate:complate,
  getlevelList:getlevelList,
  yuMing:yuMing,
};