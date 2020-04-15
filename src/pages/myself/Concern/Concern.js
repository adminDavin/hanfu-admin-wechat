const app = getApp();
import quan from '../../../services/hf-tequan';


Page({
  data: {
    img:'',
    scrollH: 0,
    imgWidth: 0,
    lists: false,
    currentTab: 0, //切换
    mosthigher: '',
    mostlower: '',
    cang:[],
  },
  onShow(){
    this.setData({
      img: app.endpoint.file
    })
   
  },
  //列表切换
  list: function () {
    var that=this;
   let aaa=wx.getStorageSync('userId');

   quan.guan(aaa, (res) => {
      console.log(res);
      that.setData({
        cang: res.data.data
      })
      
     
     
    });
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
    this.list();
  }
})