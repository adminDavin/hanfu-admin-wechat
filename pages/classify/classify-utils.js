var util = require('../../utils/util.js');

const app = getApp();
const getRequest = function(uri, params, handleResult) {
  wx.request({
    url: app.globalData.urlmorecategory + uri,
    method: 'Get',
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    },
    data: params
  })
}

module.exports = {
  // 查询类目页面图片
  getClassifyImage: function(mine) {
    getRequest('/product/findCategoryPagePicture', {}, (res) => {
      let list = res.data.data;

      for (var index in list) {
        list[index].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].id;
      }

      mine.setData({
        images: list
      });
    });
  },
  // 首次加载二级类目
  firstGetSec: function(mine) {
    getRequest('/product/category', {
      parentCategoryId: mine.data.firstId,
      type: 1
    }, (res) => {
      let list = res.data.data;
      console.log(list)
      for (var index in list) {
        for (var j in list[index].categories) {
          list[index].categories[j].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
        }
      }
      mine.setData({
        arrs: list
      });
    });
  },
  //一级类目
  morecategory: function(mine) {
    wx.request({
      url: app.globalData.urlmorecategory + '/product/category',
      method: 'Get',
      success: (res) => {
        console.log(this, 'dfasfasfs');
        let firstId = res.data.data[0].id
        mine.setData({
          arr: res.data.data,
          firstId: firstId
        })
      },
      fail: (res) => {
        console.log("dddd", res);
      }
    })
  },
  //二级类目
  morecategorys: function(mine) {
    wx.request({
      url: app.globalData.urlmorecategory + '/product/category',
      method: 'Get',
      success: (res) => {
        let list = res.data.data;
        for (var index in list) {
          for (var j in list[index].categories) {
            list[index].categories[j].img = app.globalData.urlmorecategory + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
          }
        }
        mine.setData({
          arrs: list
        })
        console.log(list)
      },
      data: {
        parentCategoryId: mine.data.id,
        type: 1
      }
    })
  }
}