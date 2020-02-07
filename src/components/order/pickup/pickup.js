// components/order/payment.js
import orderApi from '../../../services/hf-order.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hfOrder:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrshow:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    guanbi: function () {
      var that = this;
      that.setData({
        qrshow: false
      })
    },
    copy() {
      wx.setClipboardData({
        data: this.properties.hfOrder.orderCode,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    },
    refund() {
      paymentOrder.refundOrder({ userId: this.properties.hfOrder.userId, orderCode: this.properties.hfOrder.orderCode }, (res) => {
        let data = res.data;
        console.log(data)
      })
    },
    pickup(){
      let qrUrl = app.endpoint.order + '/cancel/activity/create/activity-code'
      this.setData({
        qrshow:true,
        qrAdd: qrUrl + '?goodsId=' + this.properties.hfOrder.goodsId+ '&orderId'+this.properties.hfOrder.orderCode
        })
    }
  }
})
