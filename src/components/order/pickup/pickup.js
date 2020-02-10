// components/order/payment.js
import orderApi from '../../../services/hf-order.js';
import paymentApi from '../../../services/hf-payment.js';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hfOrder: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrshow: false,
    qrAdd:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hiddenQr() {
      this.setData({
        qrshow: false
      })
    },
    copy() {
      wx.setClipboardData({
        data: this.properties.hfOrder.orderCode,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    },
    refund() {
      paymentApi.refundOrder({
        userId: this.properties.hfOrder.userId,
        orderCode: this.properties.hfOrder.orderCode
      }, (res) => {
        let data = res.data;
        console.log(data)
      })
    },
    pickup() {
      let qrUrl = app.endpoint.order + '/cancel/activity/create/activity-code'
      this.setData({
        qrAdd: qrUrl + '?goodsId=' + this.properties.hfOrder.goodsId + '&orderId' + this.properties.hfOrder.id,
        qrshow: true
      })
    }
  }
})