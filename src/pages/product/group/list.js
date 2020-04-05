import productApi from '../../../services/hf-product.js';
import requestUtils from '../../../services/request-utils.js';
import util from '../../../utils/util.js';
import projectUtils from '../../../utils/project-utils.js';

Page({

  /**
   * Page initial data
   */
  data: {
    productGroups: [],
    scrollH: 0
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    projectUtils.adjustSystemInfo(this);
    productApi.getProductGroup((res) => {
      let productGroups = res.data.data;
      console.log(productGroups)
      let product =[]
      for (let i = 0; i < productGroups.length;i++){
        for (let j = 0; j < productGroups[i].productList.length; j++){
          product.push(productGroups[i].productList[j])
        }
      }
      requestUtils.setImageUrls(product);
      this.setData({
        productGroups: product,
      });
      console.log(this.data.productGroups)
    });
  },

  onPullDownRefresh: function (e) {
    console.log(e);
  },
  onSeletedProduct: function (e) {
    let selected = e.currentTarget.dataset.item;
    console.log(selected)
    wx.navigateTo({
      url: '/pages/product/detail?productId=' + selected.id +'&stoneId'+ selected.stoneId
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})