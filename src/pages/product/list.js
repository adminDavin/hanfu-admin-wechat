// src/pages/product/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    lists: false,
    currentTab: 0, //切换
    mosthigher:'',
    mostlower:'',
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
        console.log(e)
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
        console.log(e)
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
  //筛选完成
  success: function () {
    this.setData({
      isRuleTrue: false
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        
        options.scrollH = scrollH;
        options.imgWidth= imgWidth;
        this.setData({ ...this.data, ...options });
      }
    });
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