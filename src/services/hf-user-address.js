const app = getApp();

function query(userId, handleResult) {
  let params = {
    userId: userId,
    isDefault: 1
  };

  wx.request({
    url: app.endpoint.user + '/hf-user-address/query',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function addAddress(params={}, handleResult) {
  wx.request({
    url: app.endpoint.user + '/hf-user-address/addAddress',
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
  query: query,
  addAddress: addAddress
};