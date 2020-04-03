// components/order/payment.js
import orderApi from '../../../services/hf-order.js';
import paymentOrder from '../../../services/hf-payment.js';
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
    refund(){
      paymentOrder.refundOrder({ userId: this.properties.hfOrder.userId, orderCode: this.properties.hfOrder.orderCode},(res)=>{
        let data=res.data;
        console.log(data)
      })
    },
    cancel(){
      orderApi.modifyStatus(this.properties.hfOrder.id,this.properties.hfOrder.orderCode,this.properties.hfOrder.orderStatus,'cancel',(res)=>{
        let data=res.data.data;
        console.log(data)
        if(1){
          wx.showToast({
            title: '订单取消成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.redirectTo({
                url: '/pages/order/list?action=cancel',
              })
            }
          })
        }
      })
    },
  },
    onShareAppMessage: function () {
      return {
        title: '同城优品小程序',
        path: 'pages/product/ping-pay/ping-pay',
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          // 转发失败
          console.log("转发失败:" + JSON.stringify(res));
        }
      }
  }
})
