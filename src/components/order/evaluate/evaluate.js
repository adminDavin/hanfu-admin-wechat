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
    repurchase(){
      wx.redirectTo({
        url: '/pages/product/detail?productId=' + this.properties.hfOrder.gooodsDesc.productId
      });
    },
    evaluate(){
      let params={
        image: this.properties.hfOrder.image,
        goodsName: this.properties.hfOrder.goodsName,
        id: this.properties.hfOrder.id,
        orderCode: this.properties.hfOrder.orderCode
      }
      wx.navigateTo({
        url: '/pages/myself/evaluated/dryinglist/dryinglist?params=' + encodeURIComponent(JSON.stringify(params))
      });
    }
  }
})
