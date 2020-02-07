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
    cancel(){
      
    },
    remind() {
      wx.showToast({
        title: '已经提醒商家啦，请耐心等待',
        icon: "success",
        mask: true
      })
    },
  }
})
