const app = getApp()
Page({
  // 获取滚动条当前位置
  onPageScroll: function(e) {
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
  goTop: function(e) { // 一键回到顶部
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
  onReady: function() {
    this.animation = wx.createAnimation()
  },
  translate: function(event) {
    console.log(event);
    this.setData({
      isRuleTrue: true
    })
    // this.animation.translate(-245, 0).step()
    // this.setData({
    //   animation: this.animation.export()
    // })
  },

  success: function() {
    this.setData({
      isRuleTrue: false
    })
    // this.animation.translate(0, 0).step()
    // this.setData({
    //   animation: this.animation.export()
    // })
  },
  data: {
    arr:'',
    dataId:{},
    images:'',
  },
  // 获取商品列表
  categoryId: function(e) {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/categoryId',
      method: 'Get',
      success: function(res) {
         console.log(res);
        that.setData({
          arr: res.data.data,
        })
        // for(var i=0;i<arr.length;i++) {
        //     console.log(arr[i])
        // }  
      },
    })
  },
  // 获取物品图片
  picturesTu: function (e) {
    var that = this;
    wx.request({
      url: app.globalData.urlparticulars + '/goods/pictures',
      method: 'Get',
      success: function (res) {
        // console.log(res);
        that.setData({
        })
        data: {
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.categoryId();
    this.picturesTu();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})