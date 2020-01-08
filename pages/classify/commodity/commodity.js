const app = getApp()
Page({
  data: {
    lists: false,
    arr: [],
    prices: '',
    currentTab: 0,//切换
    dataId: '',//待用
    pictureId: '',
    fileId: '',// 获取物品图片
    fileIds: '',
    morepicture: ''//图片都在这里
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
  // 筛选
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  translate: function (event) {
    // console.log(event);
    this.setData({
      isRuleTrue: true
    })
    // this.animation.translate(-245, 0).step()
    // this.setData({
    //   animation: this.animation.export()
    // })
  },

  success: function () {
    this.setData({
      isRuleTrue: false
    })
    // this.animation.translate(0, 0).step()
    // this.setData({
    //   animation: this.animation.export()
    // })
  },
  // 获取商品列表
  categoryId: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/listGoods',
      method: 'Get',
      success: function (res) {
        console.log(res)
        that.setData({
          arr: res.data.data,
        })
      },
      data:{
        stoneId:1
      }
    })
  },
  // 获取物品图片
  picture: function (e) {
    console.log(e)
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/pictures',
      method: 'Get',
      success: function (res) {
        console.log(res);
        that.setData({
          fileId: res.data.data
        })
      },
      data: {
        goodsId: that.data.pictureId
      }
    })
  },
  //获取图片
  morepicture: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/getFile',
      method: 'Get',
      success: function (res) {
        console.log(res);
        that.setData({
          morepicture: res.data.data
        })
      },
      data: {
        fileId: that.data.fileIds
      }
    })
  },
  //综合
  synthesize: function () {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/categoryId',
      method: 'Get',
      success: function (res) {
        console.log(res);
        that.setData({
          arr: res.data.data,
        })
      },
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
        that.setData({
          arr: res.data.data
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    var that = this;
    console.log(id);
    that.setData({
      dataId: id,
    });
    this.categoryId();
    this.picture();
    this.morepicture();
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