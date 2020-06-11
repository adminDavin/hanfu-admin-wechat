const app = getApp();

function getTingQuan(params,handleResult) {
  console.log(app.endpoint.product + '/hf-auth/findMemberPrerogative')
  wx.request({
    url: app.endpoint.product + '/discountCoupon/couponHall',
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId
    },
    method: 'post',
    data:params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log( res);
    }
  });
}


function myCoupon(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/discountCoupon/couponMy',
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
function getCoupon(params={}, handleResult) {
  wx.request({
    url: app.endpoint.product + '/discountCoupon/addCouponForUser',
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
  getTingQuan: getTingQuan,
  getCoupon:getCoupon,
  myCoupon:myCoupon,
  
};