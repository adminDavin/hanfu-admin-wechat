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

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    receipt(){
      orderApi.modifyStatus(this.properties.hfOrder.id, this.properties.hfOrder.orderCode, this.properties.hfOrder.orderStatus, 'evaluate', (res) => {
        let data = res.data.data;
        if (1) {
          wx.showToast({
            title: '确认收货成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.redirectTo({
                url: '/pages/order/list?action=evaluate',
              })
            }
          })
        }
      })
    },
    logistics(){}
  }
})
