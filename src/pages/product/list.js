import productApi from '../../services/hf-product.js';
import util from '../../utils/util.js';
import projectUtils from '../../utils/project-utils.js';
import requestUtils from '../../services/request-utils.js';

Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    lists: false,
    currentTab: 0, //切换
    mosthigher: '',
    mostlower: '',
  },
  //列表切换
  list: function () {
    this.setData({
      lists: !this.data.lists,
    })
  },
  // 切换目录
  clickTab: function (e) {
    this.setData({ currentTab: e.currentTarget.dataset.id });
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  // 回到顶部
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({ scrollTop: 0 });
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 最低价
  mostlower(e) {
    this.setData({ mostlower: e.detail.value });
  },
  // 最高价
  mosthigher(e) {
    this.setData({ mosthigher: e.detail.value });
  },

  // 筛选
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  translate: function (event) {
    this.setData({ isRuleTrue: true });
  },
  
  success: function () {
    this.setData({ isRuleTrue: false });
  },

  onLoad: function (options) {
    this.setData({ parameters: options });
    projectUtils.adjustSystemInfo(this);
  }
})