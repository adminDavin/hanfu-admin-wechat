const app = getApp();

function login(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.user + '/login/wechart',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

function modifyUserInfo(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.user + '/hf-user/update/wechart',
    data: params,
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}

export default {
  login: login,
  modifyUserInfo: modifyUserInfo
};