const app = getApp();
import quan from '../../../services/hf-tequan';


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
  list: function () {
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
          arr[i].list[j].fileId=app.endpoint.file + '/goods/getFile?fileId=' +arr[i].list[j].fileId
        }
       
      }
      that.setData({
        cang: arr
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