// components/showcode/showcode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    qradd:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrshow: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    guanbi: function () {
      var that = this;
      this.triggerEvent('hiddenQr',{});
    },
  }
})
