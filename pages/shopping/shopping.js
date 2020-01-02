// pages/shopping/shopping.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannertoggle:1,
    tiphidden: false,
    servehidden: true,
    editshow: true,
    cratList: [],
    cartPrice: 0,
    cartNum:0,
    checkgoods: '',
    goodsarr: [],
    selectCountPrice: 0.00,
    isAllSelect: false, //全选
    selectValue: [], //选中的数据
  },

  // banner切换
  toggle(e){
    var that=this;
    var index=e.currentTarget.dataset.index;
    that.setData({
      bannertoggle:index
    })
    if(index==1){
    that.getCart();
    }else if(index==2){

    }else if(index==2){

    }
  },

  // 去结算
  submit() {
    var that = this;
    let cart=that.data.cratList
    var checkgoods=[];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].check == 1) {
          checkgoods.push(cart[i])
      }
    }
    
    // wx.navigateTo({
    //   url: '../order/order?str=' + this.data.checkgoods,
    // })
  },


  // 切换选中状态
  checkboxChange: function(event) {
    var that = this;
    console.log(event)
    var shangjiagoods = [];
    var value = event.detail.value;
    console.log(value.length)
    var cart = that.data.cratList;
    for (var index in cart) {
      if (that.inArray(cart[index].productId, value)) cart[index].check = 1;
      else cart[index].check = 0;
    }
    for (var index in cart) {
      if (that.data.cratList[index].productStatus == 1) {
        shangjiagoods.push(that.data.cratList[index])
      }
    }
    console.log(shangjiagoods)
    this.setData({
      cratList: cart,
      isAllSelect: value.length == shangjiagoods.length,
      selectValue: value,
    })
    this.switchSelect();
  },

  inArray: function(search, array) {
    for (var i in array) {
      if (array[i] == search) {
        return true;
      }
    }
    return false;
  },

  switchSelect: function() {
    var that = this;
    var validList = that.data.cratList;
    var selectValue = that.data.selectValue;
    var selectCountPrice = 0.00;
    if (selectValue.length < 1) {
      that.setData({
        selectCountPrice: selectCountPrice
      });
    } else {
      for (var index in validList) {
        if (that.inArray(validList[index].productId, selectValue)) {
          selectCountPrice = Number(selectCountPrice) + Number(validList[index].productNum) * Number(validList[index].productPrice)
        }
      }
      that.setData({
        selectCountPrice: selectCountPrice.toFixed(2)
      });
    }
    console.log(that.data.selectCountPrice)
  },
  //全选
  checkboxAllChange: function(event) {
    var value = event.detail.value;
    if (value.length > 0) {
      this.setAllSelectValue(1)
    } else {
      this.setAllSelectValue(0)
    }
  },

  setAllSelectValue: function(status) {
    var that = this;
    var selectValue = [];
    var shangjiagoods = [];
    var valid = that.data.cratList;
    if (valid.length > 0) {
      for (var index in valid) {
        if (status == 1) {
          if (valid[index].productStatus == 1) {
            valid[index].check = 1;
            selectValue.push(valid[index].productId);
          }
        } else valid[index].check = 0;
      }
      // var validData = "cartList.valid";
      that.setData({
        cratList: valid,
        selectValue: selectValue,
      });
      that.switchSelect();
    }
  },

  edit: function() {
    var that = this;
    that.setData({
      editshow: !that.data.editshow
    })
  },

  gobuy() {
    wx.switchTab({
      url: '../seckill/seckill',
    })
  },

  //获取购物车信息
  getCart: function() {
    var that = this;
    wx.request({
      url: app.globalData.urlCart + '/cart/getCartList',
      method: 'get',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        userId: 2
      },
      success: function(res) {
        console.log('购物车', res)
        if (res.data.data == '') {
          that.setData({
            tiphidden: false
          })
        } else {
          that.setData({
            tiphidden: true
          })
        }
        var cartList = res.data.data;
        for(var index in cartList){
          cartList[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + cartList[index].productIcon;
        }
        var valid = cartList;
        if (valid.length > 0) {
          that.setData({
            cratList: valid,
          });
          that.switchSelect();
        }
        let num = JSON.stringify(res.data.data.length)
        app.globalData.cartNum = num;
        that.setData({
          cartNum:num
        })
        wx.setTabBarBadge({
          index: 3,
          text: app.globalData.cartNum
        })
      }
    })
  },

  //删除商品
  delGoods(e) {
    var that = this;
    var goodslist=[];
    var cart = that.data.cratList;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    wx.request({
      url: app.globalData.urlCart + '/cart/delCartProduct',
      method:'get',
      data:{
        goodsId:e.currentTarget.dataset.goodsid,
        userId:that.data.userId
      },
      success(res){
        for(var index in cart){
          if(cart[index].productId!=goodsid){
            goodslist.push(cart[index])
          }
        }
        that.setData({
          cratList:goodslist
        })
        console.log(that.data.cratList)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        wx.getStorage({
          key: 'user',
          success: function(res) {
            that.setData({
              userId: res.data.userId
            })
            that.getCart();
          },
        })
      },
      fail: function(res) {
        that.setData({
          tiphidden: false,
        })
      }
    })
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
    var that = this;
    that.setData({
      cartPrice: 0
    })
    wx.getStorage({
      key: 'phone',
      success: function(res) {
        wx.getStorage({
          key: 'user',
          success: function(res) {
            that.setData({
              userId: res.data.userId
            })
            that.getCart();
          },
        })
      },
      fail: function(res) {
        that.setData({
          tiphidden: false,
        })
      }
    })
  },

  //修改商品数量
  subCart: function(event) { //减少商品数量
    var that = this;
    var status = false;
    var index = event.currentTarget.dataset.index;
    var item = that.data.cratList[index];
    console.log(item);
    item.productNum = item.productNum - 1;
    if (item.productNum < 1) status = true;
    if (item.productNum <= 1) {
      item.productNum = 1;
      // item.numSub = true;
    }
    // else { item.numSub = false; item.numAdd = false; }
    if (false == status) {
      that.setCartNum(item.productNum, item.productNum, function(data) {
        console.log(123)
        var itemData = "cratList[" + index + "]";
        that.setData({
          [itemData]: item
        });
        that.switchSelect();
      });
    }
  },
  addCart: function(event) { //添加商品数量
    var that = this;
    var index = event.currentTarget.dataset.index;
    var item = that.data.cratList[index];
    item.productNum = item.productNum + 1;
    that.setCartNum(item.productNum, item.productNum, function(data) {
      var itemData = "cratList[" + index + "]";
      that.setData({
        [itemData]: item
      });
      that.switchSelect();
    });
    // var productInfo = item.productInfo;
    // if (productInfo.hasOwnProperty('attrInfo') && item.cart_num >= item.productInfo.attrInfo.stock) {
    //   item.cart_num = item.productInfo.attrInfo.stock;
    //   item.numAdd = true;
    //   item.numSub = false;
    // } else if (item.cart_num >= item.productInfo.stock) {
    //   item.cart_num = item.productInfo.stock;
    //   item.numAdd = true;
    //   item.numSub = false;
    // } else { item.numAdd = false; item.numSub = false; }
    // that.setCartNum(item.id, item.cart_num, function (data) {
    //   var itemData = "cartList.valid[" + index + "]";
    //   that.setData({ [itemData]: item });
    //   that.switchSelect();
    // });
  },

  //商品数量
  setCartNum(goodsId, num, callback) {
    var that = this;
    wx.request({
      url: app.globalData.urlCart + '/cart/updateCartNum',
      method: 'get',
      data: {
        goodsId: goodsId,
        num: num,
        userId: that.data.userId
      },
      success(res) {
        if (res.data.data == '修改数量失败') {
          wx.showToast({
            title: '修改数量失败',
            icon: 'none'
          })
        } else {
          callback && callback(res.data)
        }
      }
    })
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