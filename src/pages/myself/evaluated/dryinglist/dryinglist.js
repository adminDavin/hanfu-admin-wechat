// src/pages/myself/evaluated/dryinglist/dryinglist.js
import orderApi from '../../../../services/hf-product.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbox: '',
    star: 5,
    evaluate: '',
    hfOrder: {},
    starDesc: '非常满意，无可挑剔',
    stars: [{
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '非常不满意，各方面都很差',
      star: 1
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '不满意，比较差',
      star: 2
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '一般，还要改善',
      star: 3
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '比较满意，仍要改善',
      star: 4
    }, {
      lightImg: '../../../../images/starth.png',
      blackImg: '../../../../images/startw.png',
      flag: 1,
      message: '非常满意，无可挑剔',
      star: 5
    }],
    assessLists: ['意见很有帮助', '态度非常好', '非常敬业', '非常专业认真', '回复很及时', '耐心细致']
  },
  starClick: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars.length; i++) {
      var allItem = 'stars[' + i + '].flag';
      that.setData({
        [allItem]: 2
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars[' + i + '].flag';
      that.setData({
        [item]: 1
      })
    }
    // 评价星星文字说明
    this.setData({
      starDesc: this.data.stars[index].message,
      star: this.data.stars[index].star
    })
    wx.showToast({
      title: this.data.starDesc,
      icon: 'none'
    })
  },
  getVal(e) {
    var that = this;
    that.setData({
      evaluate: e.detail.value
    })
  },
  // 删除照片 && 
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 上传图片 &&&  
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    console.log(imgbox)
    var picid = e.currentTarget.dataset.pic;
    console.log(picid)
    var that = this;
    var n = 9;
    if (9 > imgbox.length > 0) {
      n = 9 - imgbox.length;
    } else if (imgbox.length == 9) {
      n = 1;
    }
    wx.chooseImage({
      count: n, // 默认9      
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有      
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有     
      success: function (res) {
        // console.log(res.tempFilePaths)       
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片       
        var tempFilePaths = res.tempFilePaths
        if (imgbox.length == 0) {
          imgbox = tempFilePaths
        } else if (9 > imgbox.length) {
          imgbox = imgbox.concat(tempFilePaths);
        } else {
          imgbox[picid] = tempFilePaths[0];
        }
        that.setData({
          imgbox: imgbox
        });
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        console.log(filep)
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
        // wx.uploadFile({
        //   url: app.globalData.url + '/wareHouse/updateUserAvatar',
        //   filePath: filep,
        //   name: 'fileInfo',
        //   formData: { userId: that.data.userid },
        //   success: function (res) {
        //     console.log(res)
        //     console.log(res.data)
        //     var sss = JSON.parse(res.data)
        //     var dizhi = sss.dizhi;
        //     //输出图片地址 
        //     console.log(dizhi);
        //     that.setData({
        //       "dizhi": dizhi
        //     })

        //     //do something  
        //   }, fail: function (err) {
        //     console.log(err)
        //   }
        // });
      }
    })
  },
  onSubmitSelectedGoods() {
    var that = this;
    let params = {
      star: that.data.star,
      evaluate: that.data.evaluate,
      goodsId: that.data.hfOrder.goodsId,
      orderId: that.data.hfOrder.orderId,
      userId: that.data.hfOrder.userId
    }
    orderApi.evaluate(params, (res) => {
      if (1) {
        wx.showToast({
          title: '评价成功',
          icon: 'success',
          success: function() {
            wx.redirectTo({
              url: '/pages/order/order?hfOrder=' + encodeURIComponent(JSON.stringify(this.data.hfOrder))
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // let params = JSON.parse(decodeURIComponent(options.params));
    // this.setData({hfOrder:params})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})