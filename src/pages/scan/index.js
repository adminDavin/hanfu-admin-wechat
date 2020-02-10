// src/pages/scan/index.js
const app = getApp()
import util from '../../utils/util.js';
import orderApi from '../../services/hf-order.js';
Page({

  data: {
    result: ''
  },
  pickupScancode(){
    var that=this;
    let url = app.endpoint.order + '/cancel/testCancel'
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index?orderStatus=payment',
      });
    } else{
      wx.scanCode({
        success: (res) => {
          let qrl = JSON.parse(res.result)
          console.log(qrl)
          let params = {
            userId: userId,
            UgoodsId: qrl[0].goodsId,
            UorderId: qrl[0].orderId
          };
          // orderApi.qrCode(url,params,(res)=>{
          //   console.log(res)
          // })
        }
      })
    }
  },
  payScancode(){
    var that = this;
    let url = app.endpoint.payment + '/balance/payment '
    let userId = wx.getStorageSync('userId');
    if (util.isEmpty(userId)) {
      wx.navigateTo({
        url: '/pages/login/index?orderStatus=payment',
      });
    } else {
      wx.scanCode({
        success: (res) => {
          let qrl = JSON.parse(res.result)
          console.log(qrl)
          let params = {
            userId: qrl[0].userId,
            qrCode:qrl[0].qrCode,
            qrCodeType: qrl[0].qrCodeType,
            userCancelId: userId
          };
          // orderApi.qrCode(url,params,(res)=>{
          //   console.log(res)
          // })
        }
      })
    }
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

  },
  getScancode: function () {
    var _this = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;

        _this.setData({
          result: result,

        })
      }
    })
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      // package: '',
      signType: 'MD5',
      paySign: '',
      success(res) { },
      fail(res) { }
    })
  }

})