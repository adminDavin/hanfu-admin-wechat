import productApi from '../../services/hf-product.js';
import util from '../../utils/util.js';
import projectUtils from '../../utils/project-utils.js';
import requestUtils from '../../services/request-utils.js';

Page({
  data: {
    current: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [],
    currentTab: 0
  },

  onLoad: function (options) {
    projectUtils.adjustSystemInfo(this);
    productApi.getRotation((res) => {
      let list = res.data.data;
      requestUtils.setImageUrls(list);
      this.setData({ imgUrls: list });
    });
  },

  onShow: function () {
    projectUtils.activeTabBar(this, 0);
  },

  swichNav: function (e) {
    if (this.data.currentTab != e.target.dataset.current) {
      this.setData({ currentTab: e.target.dataset.current });
    }
  },

  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },

  onSelectRotation: function (e) {
    wx.navigateTo({
      url: '/pages/product/detail?action=rotation&productId=' + e.currentTarget.dataset.id,
    })
  },

  onPullDownRefresh: function (e) {
    console.log(e);
  }
})