// pages/home/components/flash-sale.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    onSelectedMore: function (e) {
      console.log(e);
      wx.navigateTo({
        url: '/pages/product/seckill/list',
      })
    }

  },

  lifetimes: {
    attached: function () {

      console.log('dddsdfadfaf', this);
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
