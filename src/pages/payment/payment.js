// src/pages/payment/payment.js
const app = getApp();
import paymentApi from '../../services/hf-payment.js';
import util from '../../utils/util.js';
import orderApi from '../../services/hf-order.js';

Page({

  /**
   * Page initial data
   */
  data: {
    count:'',
    show: false,
    groupid: '',
    activityId: '',
    goodsId: '',
    userId: '',
    orderId: '',
    groupActivity: false,
  },
  gohome: function () {
    console.log(11)
    wx.switchTab({
      url: '../home/index',
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.data.activityId = options.activityId;
    that.data.goodsId = options.goodsId;
    that.data.groupActivity = options.groupActivity;
    that.data.orderId = options.orderId;
    that.data.userId = options.userId;
    that.data.groupid = options.groupid;
    that.setData({
      count: options.payment
    })

    paymentApi.paymentOrder({
      userId: options.userId, payOrderId: options.payOrderId
    }, (res) => {
      console.log(res)
      let payment = res.data.data;
      console.log(res)
      if (res.data.status==500) {
        wx.showToast({
          title: '余额不足',
          icon: 'none'
        });
        wx.navigateTo({
          url: '/pages/order/list?action=all',
        });
        return
      }
      if (options.paymentName == "wechart") {
        // 微信支付 待用户确认
        let params = {
          payOrderId: options.payOrderId,
          userId: options.userId
        }
        this.wechartPaymentConfirm(params, payment)
      } else {
        //余额支付 直接跳转到订单列表
        paymentApi.completeOrder(options.payOrderId, options.userId, (res) => console.log(res));
        console.log(res)
        if (that.data.groupid !== 'undefined') {
          this.setData({
            show: true
          });
          // wx.navigateTo({
          //   url: '/pages/order/list?action=all',
          // });
        }
        console.log(that.data.groupActivity)
        console.log(that.data.goodsId)
        console.log(that.data.activityId)
        console.log(that.data.orderId)
        console.log(that.data.userId)
        console.log(that.data.groupid)
        console.log(that.data)
        if (that.data.groupid == 'undefined') {
          console.log(that.data.groupid == 'undefined')
          if (that.data.groupActivity !== 'false') {
            console.log(that.data.groupActivity)
            let param = {
              activityId: that.data.activityId,
              goodsId: that.data.goodsId,
              userId: that.data.userId,
              orderId: that.data.orderId,
            }
            orderApi.addGroup(param, (res) => {
              console.log('开团成功')
              console.log(res.data)
              if (res.data !== '') {
                console.log('跳转页面')
                let params = res.data.data
                wx.navigateTo({
                  url: '/pages/product/ping-pay/ping-pay?params=' + encodeURIComponent(JSON.stringify(params)),
                });
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/order/list?action=all',
            });
          }
        } else
          if (that.data.groupid !== 'undefined' && that.data.activityId !== 'undefined') {
            let param = {
              activityId: that.data.activityId,
              goodsId: that.data.goodsId,
              userId: that.data.userId,
              orderId: that.data.orderId,
              hfActivityGroupId: that.data.groupid
            }
            console.log('参团成功')

            orderApi.entranceGroup(param, (res) => {
              console.log('参团成功')
              wx.showToast({
                title: '参团成功',
                icon: 'none'
              });
            })
          }
      }
    });

  },

  wechartPaymentConfirm: function (options, payment) {
    let that = this
    console.log(payment)
    wx.requestPayment({
      timeStamp: payment.timeStamp,
      nonceStr: payment.nonce_str,
      package: payment.package,
      signType: payment.signType,
      paySign: payment.paySign,
      success: (response) => {
        // 微信确认支付成功后 
        paymentApi.completeOrder(options.payOrderId, options.userId, (res) => console.log(res));
        wx.showModal({
          title: '订单支付',
          content: '支付成功',
        });
        console.log(that.data.groupActivity)
        console.log(that.data.goodsId)
        console.log(that.data.activityId)
        console.log(that.data.orderId)
        console.log(that.data.userId)
        console.log(that.data.groupid)
        if (that.data.groupid == 'undefined') {
          if (that.data.groupActivity !== 'false') {
            let param = {
              activityId: that.data.activityId,
              goodsId: that.data.goodsId,
              userId: that.data.userId,
              orderId: that.data.orderId,
            }
            orderApi.addGroup(param, (res) => {
              console.log('开团成功')
              console.log(res.data)
              if (res.data !== '') {
                console.log('跳转页面')
                let params = res.data.data
                wx.navigateTo({
                  url: '/pages/product/ping-pay/ping-pay?params=' + encodeURIComponent(JSON.stringify(params)),
                });
              }
            })
          } else {
            wx.navigateTo({
              url: '/pages/order/list?action=all',
            });
          }
        } else
          if (that.data.groupid !== 'undefined' && that.data.activityId !== 'undefined') {
            let param = {
              activityId: that.data.activityId,
              goodsId: that.data.goodsId,
              userId: that.data.userId,
              orderId: that.data.orderId,
              hfActivityGroupId: that.data.groupid
            }
            orderApi.entranceGroup(param, (res) => {
              console.log('参团成功')
              wx.showToast({
                title: '参团成功',
                icon: 'none'
              });
            })
          }
        wx.navigateTo({
          url: '/pages/order/list?action=all',
        });

      },
      fail: (response) => {
        console.log(response);
        wx.showModal({
          title: '订单支付',
          content: '支付失敗',
        });
        wx.navigateTo({
          url: '/pages/order/list?action=payment',
        });
      }
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  }
})