// src/pages/myself/coupons/coupons.js
import hfOrderApi from '../../../services/hf-user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unused: [],
    use: [],
    outmoded: []
  },
 

  onSelectedNav: function (e) {
    let orderStatuses = this.data.orderStatuses;
    let action = e.currentTarget.dataset.action;
    let hfOrders = this.data.hfOrdersAll
    for (let selected of orderStatuses) {
      if (selected.action == action) {
        selected.selectedSytle = 'hengxian'
      } else {
        selected.selectedSytle = ""
      }
      this.setData({
        orderStatuses: orderStatuses
      })
    }
    // if (action == 'all') {
    //   this.setData({
    //     hfOrders: this.data.hfOrdersAll
    //   })
    // } else {
    //   let hf = hfOrders.filter((hfOrder, index) => {
    //     console.log(hfOrder)
    //     return hfOrder.orderStatus == action
    //   })
    //   this.setData({
    //     hfOrders: hf
    //   })
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    hfOrderApi.selectCoupons('unused', (res) => {
      console.log(res.data.data);
      this.setData({
        unused: res.data.data,
        // hfOrdersAll: res.data.data
      });
      console.log(this.data.hfOrders)
    });
    hfOrderApi.selectCoupons('use', (res) => {
      console.log(res.data.data);
      this.setData({
        use: res.data.data,
        // hfOrdersAll: res.data.data
      });
      console.log(this.data.hfOrders)
    });
    hfOrderApi.selectCoupons('outmoded', (res) => {
      console.log(res.data.data);
      this.setData({
        outmoded: res.data.data,
        // hfOrdersAll: res.data.data
      });
      console.log(this.data.hfOrders)
    });
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