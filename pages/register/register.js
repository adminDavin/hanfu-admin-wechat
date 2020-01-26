// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      phone:'',
      userId:'',
      yanzhengma:''
  },


phone:function(e){
 this.setData({
    phone:e.detail.value
  })
},

huoQu:function(){
  var that=this;
  let phone=that.data.phone;
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    wx.showToast({
      title: '请输入正确的手机号'
    })
  }else{
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    wx.request({
      url: app.globalData.urlLogin + '/user/code',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        phone: that.data.phone,
        userId: that.data.userId
      },

      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '验证码发送成功',
        })
        console.log("验证码发送成功", res);
        if (res.data.status == 200) {
          wx.setStorage({
            key: 'phone',
            data: that.data.phone
          })
          that.setData({
            yanzhengma: res.data.data
          })
        }

      },
      fail: function (res) {
        console.log("验证码发送失败");

      }
    })
  }
 
},

submit:function(){
  var that = this;
  wx.request({
    url: app.globalData.urlLogin + '/user/update',
    method: 'post',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      phone: that.data.phone,
      userId: that.data.userId
    },

    success: function (res) {
      console.log("更新手机号成功", res);
      if (res.data.status == 200) {
        wx.switchTab({
          url: '../seckill/seckill',
        })
      }
    },
    fail: function (res) {
      console.log("跟新手机号失败");
    }
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that=this;
    wx.getStorage({
      key: 'user',
      success: function (res) {
        console.log('缓存', res)
        let uid = res.data.userId
        that.setData({
          userId: res.data.userId,
        })
      },
      fail: function (res) {
          wx.showToast({
            title: '授权失败',
          })
      }
    })
  }
 
})