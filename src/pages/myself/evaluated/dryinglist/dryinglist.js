// src/pages/myself/evaluated/dryinglist/dryinglist.js
import orderApi from '../../../../services/hf-product.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: 5,
    evaluate: '',
    hfOrder: {},
    starDesc: '非常满意，无可挑剔',
    stars: [{
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '非常不满意，各方面都很差',
      star: 1
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '不满意，比较差',
      star: 2
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '一般，还要改善',
      star: 3
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '比较满意，仍要改善',
      star: 4
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '非常满意，无可挑剔',
      star: 5
    }],
    assessLists: ['意见很有帮助', '态度非常好', '非常敬业', '非常专业认真', '回复很及时', '耐心细致']
  },
  starClick: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc: this.data.stars[index].message,
      star: this.data.stars[index].star
    })
    wx.showToast({
      title: this.data.starDesc,
      icon: 'none'
    })
  },
  getVal(e) {
    var that = this;
    that.setData({
      evaluate: e.detail.value
    })
  },
  onSubmitSelectedGoods() {
    var that = this;
    let params = {
      star: this.data.star,
      evaluate: this.data.evaluate,
      goodsId: this.data.hfOrder.goodsId,
      orderId: this.data.hfOrder.orderId,
      userId: this.data.hfOrder.userId
    }
    orderApi.evaluate(params, (res) => {
      if (1) {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          success: function() {
            wx.redirectTo({
              url: '/pages/order/order?hfOrder=' + encodeURIComponent(JSON.stringify(this.data.hfOrder))
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let params = JSON.parse(decodeURIComponent(options.params));
    // this.setData({hfOrder:params})
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