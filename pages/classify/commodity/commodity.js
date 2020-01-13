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
    idw:'',
  },
  //搜索
  sousuo: function () {
    wx.navigateTo({
      url: '../../seckill/seek/seek',
    })
  },
  //列表切换
  list: function () {
    var that = this;
    if (that.data.lists) {
      that.setData({
        lists: !that.data.lists,
      })
    } else {
      that.setData({
        lists: !that.data.lists,
      })
    }
  },
  //切换标题栏底部颜色
  clickTab: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.id,
    })
  },
  // 获取滚动条当前位置
  onPageScroll: function (e) {
    // console.log(e)
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
      console.log(res)
      let list = res.data.data;
      for (var index in list) {
        list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
      }
      that.setData({
        arr: list
      })
    });
  },
  // 获取商品列表
  categoryId: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urlGoods + '/seniority/findSeniorityContent',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list=res.data.data;
        for(var index in list){
          list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
        }
        that.setData({
          arr: list,
        })
        console.log(list)
      },
      data:{
        seniorityId:that.data.ids
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
        console.log(res)

        let list = res.data.data;
        for (var index in list) {
          list[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + list[index].fileId;
        }
        that.setData({
          arr: list,
        })
      },
    })
  },
  // 跳转携带id
  commodity: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id
    var fileid = e.currentTarget.dataset.fileid
    console.log(id)
    console.log(fileid)
    var that = this;
    that.setData({
      pictureId: id,
      fileIds: fileid
    });
    wx.navigateTo({
      url: `../particulars/particulars?id=${id}`,
    })
  },
  // 常买
  getOftenBuy() {
    var that = this;
    apiCart.toSettle(app.globalData.urlCart, '/cart/selectOftenBuy', {
      userId: that.data.userId,
    }, (res) => {
      console.log(res)
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
    let id=options.id;
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
      this.categoryId();
    };
   let ids=options.id
   console.log(ids);
   that.setData({
     ids:ids
   })
   

  },
 
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})