// pages/updatePerson/updatePerson.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    imgs:'../img/person.png',
    name:'',
    phone:'',
    pic:{},
    date: '2016-09-01',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  pic:function(){
    var main=this;
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        main.setData({
          pic: tempFilePaths,
          imgs: tempFilePaths[0],
          show:false
        })

        console.log(main.data.pic)
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  },
  ming: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  phonedate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  phoneperson: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  ping: function () {

    var main = this;
    console.log(main.data.pic[0], main.data.date, main.data.phone, main.data.name)
    wx.request({
      url: app.globalData.url + '/wareHouse/updateUserBaseInfo',
      method: 'post',
      data: {
        fileInfo: main.data.pic[0],
        userId: 12,
        hiredate: main.data.date,
        phone:main.data.phone,
        username: main.data.name
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success(res) {
        console.log(res)
        if (res.data.status) {
          wx.showToast({
            title: '提交成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../information/information'
            })
          }, 1000)

        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})