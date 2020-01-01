// pages/shopping/shopping.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tiphidden:false,
      servehidden:true,
      editshow:true,
      cratList:[],
      cartPrice:0,
      checkgoods:'',
  },
  // 去结算
  submit(){
    var that=this;
    for(let i=0;i<that.data.cratList.length;i++){
      if (that.data.cratList[i].check == 1) {
        let productId=that.data.cratList[i].productId
        that.setData({
          checkgoods:that.data.checkgoods+'+'+productId
        })
      } 
      console.log(that.data.checkgoods)
    }
    wx.navigateTo({
      url: '../order/order?str='+this.data.checkgoods,
    })
  },


  // 切换选中状态
  checkstatus(e){
    console.log(e)
    var that=this;
    for(let i=0;i<that.data.cratList.length;i++){
      if(that.data.cratList[i].productId==e.currentTarget.dataset.goodsid){
        if(that.data.cratList[i].check==1){
          that.data.cratList[i].check=0
        }else{
          that.data.cratList[i].check = 1;
        }
        console.log(that.data.cratList[0].check);
      }
    }
  },

  edit:function(){
    var that=this;
    that.setData({
      editshow:!that.data.editshow
    })
  },

  gobuy(){
    wx.switchTab({
      url: '../seckill/seckill',
    })
  },

  getCart:function(){
    var that=this;
    wx.request({
      url: app.globalData.urlCart+'/cart/getCartList',
      method:'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId:2
      },
      success:function(res){
        console.log('购物车',res)
        if(res.data.data==''){
          that.setData({
            tiphidden: false
          })
        }else{
          that.setData({
            tiphidden: true
          })
        }
        that.setData({
          cratList: res.data.data
        })
        for(let i=0;i<res.data.data.length;i++){
          wx.request({
            url: app.globalData.urlGoods+'/goods/byGoodsId',
            method:'get',
            data:{
              goodsId: res.data.data[i].productId
            },
            success:function(res){
              that.data.cratList[i].goods=res.data.data
            }
          })
        }
        let num=JSON.stringify(res.data.data.length)
        app.globalData.cartNum=num;
        wx.setTabBarBadge({
          index: 3,
          text: app.globalData.cartNum
        })
        that.cartPrice();
      }
    })
  },

// cartPrice
cartPrice(){
  var that=this
  for(let i=0;i<that.data.cratList.length;i++){
    if(that.data.cratList[i].check==1){
      let cartnum=that.data.cratList[i].productNum;
      let cartprice=that.data.cratList[i].productPrice
      that.setData({
        cartPrice:that.data.cartPrice+cartnum*cartprice
      })
    }
  }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        wx.getStorage({
          key: 'user',
          success: function (res) {
            that.setData({
             userId:res.data.userId
            })
            that.getCart();
          },
        })
      },
      fail: function (res) {
        that.setData({
          tiphidden: false,
        })
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
    var that = this;
    that.setData({
      cartPrice:0
    })
    wx.getStorage({
      key: 'phone',
      success: function (res) {
        wx.getStorage({
          key: 'user',
          success: function (res) {
            that.setData({
              userId: res.data.userId
            })
            that.getCart();
          },
        })
      },
      fail: function (res) {
        that.setData({
          tiphidden: false,
        })
      }
    })
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