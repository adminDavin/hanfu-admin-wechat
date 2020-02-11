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
    productApi.getProductGroup({}, (res) => {
      let productGroups = res.data.data;
      requestUtils.setImageUrls(productGroups);
      this.setData({
        productGroups: productGroups,
      });
    });
  },

  onPullDownRefresh: function (e) {
    console.log(e);
  },
  onSeletedProduct: function (e) {
    let selected = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/product/detail?productId=' + selected.id
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