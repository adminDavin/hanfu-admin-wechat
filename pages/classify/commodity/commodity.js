const app = getApp();
var util = require('../../../utils/util.js')
const apiCart = require('../../../utils/api/cart.js');
Page({
  data: {
    ids:'',
    lists: false,
    arr: [],
    prices: '',
    currentTab: 0,//切换
    dataId: '',//待用
    pictureId: '',
    fileId: '',// 获取物品图片
    fileIds: '',
    morepicture: '',//图片都在这里
    mosthigher:'',
    mostlower:'',
    shuid:''
  },
  
  //搜索
  sousuo: function () {
    wx.navigateTo({
      url: '../../seckill/seek/seek',
    })
  },

  //列表切换
  list: function () {
    this.setData({
      lists: !this.data.lists,
    })
  },
  // 切换目录
  clickTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.id,
    })
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
  goTop: function (e) {  // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 最低价
  mostlower(e){
    var that=this;
    let mostlower=e.detail.value;
    that.setData({
      mostlower:mostlower
    })
  },
  // 最高价
  mosthigher(e) {
    var that = this;
    let mosthigher = e.detail.value;
    that.setData({
      mosthigher: mosthigher
    })
  },

  // 筛选
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  translate: function (event) {
    this.setData({
      isRuleTrue: true
    })
  },
  success: function () {
    this.setData({
      isRuleTrue: false
    })
    apiCart.toSettle(app.globalData.urlGoods, '/goods/queryList', {
      sellPrice1:that.data.mostlower,
      sellPrice2:that.data.mosthigher
    }, (res) => {
      let list = res.data.data;
      list.forEach(item => {
        item.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + item.fileId;
      });
      that.setData({
        arr: list
      })
    });
  },

  // 获取类目商品列表
  categoryId: function () {
    var that = this;
    const { ids } = this.data;
    wx.request({
      url: app.globalData.urlGoods + '/goods/findProductBycategoryId',
      method: 'Get',
      success: function (res) {
        // console.log(res)
        let list=res.data.data;
        list.forEach(item => {
          item.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + item.fileId;
        });
        that.setData({
          arr: list,
        })
      },
      data:{
        categoryId:that.data.ids
      }
    })
  },
  // 获取排行榜商品列表
  seniorityIds: function () {
    var that = this;
    const { ids } = this.data;
    wx.request({
      url: app.globalData.urlGoods + '/seniority/findSeniorityContent',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data.data;
        list.forEach(item => {
          item.img = app.globalData.urlGoods + '/goods/getFile?fileId=' + item.fileId;
        });
        that.setData({
          arr: list,
        })
      },
      data: {
        seniorityId: that.data.ids
      }
    })
  },
  //价格排序
  prices: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/Price',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        for (var index in list) {
          list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
        }
        that.setData({
          arr: list,
        })
      },
      data: {
        categoryId: that.data.shuid,
        seniorityId: that.data.shuid
      }
    })
  },
  // 跳转携带id
  commodity: function (e) {
    var id = e.currentTarget.dataset.id
    var price = e.currentTarget.dataset.price
    var fileid = e.currentTarget.dataset.fileid
    var that = this;
    that.setData({
      pictureId: id,
      fileIds: fileid
    });

    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: `../particulars/particulars?id=${id}&price=${price}`,
    })
  },

  // 常买
  getOftenBuy() {
    var that = this;
    apiCart.toSettle(app.globalData.urlCart, '/cart/selectOftenBuy', {
      userId: that.data.userId,
    }, (res) => {
      var list = res.data.data;
      for (var index in list) {
        list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].productIcon;
      }
      that.setData({
        arr: list,
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const { id } = options;
    if(options.tag){
      wx.getStorage({
        key: 'user',
        success: function(res) {
          that.setData({
            userId:res.data.userId
          })
          that.getOftenBuy();
        },
      })
    }else{
      this.setData({ ids: id})
      // todo 前期写死列表返回
    };
    this.categoryId();
    this.seniorityIds();
  },
})