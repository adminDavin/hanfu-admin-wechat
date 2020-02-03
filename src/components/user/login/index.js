// components/user/login/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    // 弹窗内容
    content: {
      type: String,
      value: '内容'
    },
    // 弹窗取消按钮文字
    btn_no: {
      type: String,
      value: '取消'
    },
    // 弹窗确认按钮文字
    btn_ok: {
      type: String,
      value: '确定'
    } 
  },

  /**
   * 组件的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hidePopup: function () {
      this.setData({
        flag: !this.data.flag
      })
    },
    //展示弹框
    showPopup() {
      this.setData({
        flag: !this.data.flag
      })
    },
    /*
    * 内部私有方法建议以下划线开头
    * triggerEvent 用于触发事件
    */
    _error() {
      //触发取消回调
      this.triggerEvent("error")
    },
    _success() {
      //触发成功回调
      this.triggerEvent("success");
    }
  },
  lifetimes: {
    ready: function () {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (res) {
                //从数据库获取用户信息
                this.queryUsreInfo();
              }
            });
          }
        }
      });
    },
    detached: () => console.log("退出")
  }
})
