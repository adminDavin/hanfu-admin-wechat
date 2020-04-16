const app = getApp();
import quan from '../../../services/hf-tequan.js';


Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    lists: false,
    currentTab: 0, //切换
    mosthigher: '',
    mostlower: '',
    cang:[],
  },

  //列表切换
  list1: function () {
    var that=this;
   let aaa=wx.getStorageSync('userId');

   quan.getcang(aaa, (res) => {
      console.log(res);
      that.setData({
        cang: res.data.data
      })
      let arr=that.data.cang;
      for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].list.length;j++){
          arr[i].list[j].fileId=app.endpoint.file + '/goods/getFile?fileId=' +arr[i].list[j].fileId;
          arr[i].list[j].priceArea=(arr[i].list[j].priceArea/100).toFixed(2);
        }
       
      }
      that.setData({
        cang: arr
      })
    });
  },
  onSeletedProduct: function (e) {
    let selected = e.currentTarget.dataset.item;
    console.log(selected)
    if (selected.productActivityType == 'groupActivity') {
      wx.navigateTo({
        url: '/pages/product/group-detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea + '&stoneName=' + selected.stoneName + '&action=' + selected.productActivityType + '&activityId=' + selected.activityId + '&stoneName=' + selected.stoneName
      });
    } else if (selected.productActivityType == 'seckillActivity') {
      wx.navigateTo({
        url: '/pages/product/detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea + '&stoneName=' + selected.stoneName + '&action=' + selected.productActivityType + '&activityId=' + selected.activityId + '&stoneName=' + selected.stoneName
      });
    } else {
      wx.navigateTo({
        url: '/pages/product/detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea + '&stoneName=' + selected.stoneName
      });
    }

  },
  // 切换目录
  clickTab: function (e) {
    this.setData({ currentTab: e.currentTarget.dataset.id });
  },

  onLoad: function (options) {
    console.log(options)
    this.list1();
 
  }
})