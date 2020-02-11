import orderApi from '../../../services/hf-order.js';
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    checkEvaluate(){
      
    },
    evaluate() {
      let params = {
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
