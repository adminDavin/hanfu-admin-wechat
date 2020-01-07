// pages/shopping/shopping.js
const app = getApp();
var util = require('../../utils/util.js')
const apiCart = require('../../utils/api/cart.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    bannertoggle: 1,
    tiphidden: false,
    servehidden: true,
    editshow: true,
    isGuanzhu: true,
    isOftenBuy: true,
    cratList: [],
    cartPrice: 0,
    cartNum: 0,
    checkgoods: '',
    goodsarr: [],
    shangjiagoods: [],
    xiajiagoods: [],
    selectCountPrice: 0.00,
    isAllSelect: true, //全选
    selectValue: [], //选中的数据
  },

  // banner切换
  toggle(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    that.setData({
      bannertoggle: index
    })
    if (index == 1) {
      that.getCart();
    } else if (index == 2) {
      that.setData({
        shangjiagoods: []
      })
    } else if (index == 3) {
      that.getOftenBuy();
    }
  },

  // 去结算
  submit() {
    var that = this;
    let cartPrice = that.data.selectCountPrice;
    if (cartPrice == 0) {
      wx.showToast({
        title: '请选择商品',
        mask: true,
        icon: 'none'
      })
      return;
    }
    let cart = that.data.shangjiagoods
    var checkgoods = [];
    var price = {};
    price.sum = that.data.selectCountPrice;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].check == 1) {
        checkgoods.push(cart[i])
      }
    }
    checkgoods.push(price)
    console.log(checkgoods)
    apiCart.toSettle(app.globalData.urlCart, '/cart/Settlemen', {
      productMessage: checkgoods,
      userId: that.data.userId,
    }, (res) => {
      if (res.data.status == 200) {
        wx.navigateTo({
          url: '../order/order?goodsid=' + res.data.data,
        })
      }
    });
  },


  // 切换选中状态
  checkboxChange: function(event) {
    var that = this;
    console.log(event)
    var value = event.detail.value;
    console.log(value.length)
    var cart = that.data.shangjiagoods;
    for (var index in cart) {
      if (that.inArray(cart[index].productId, value)) cart[index].check = 1;
      else cart[index].check = 0;
    }
    this.setData({
      shangjiagoods: cart,
      isAllSelect: value.length == that.data.shangjiagoods.length,
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
    var validList = that.data.shangjiagoods;
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
        selectCountPrice: selectCountPrice
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
    var valid = that.data.shangjiagoods;
    if (valid.length > 0) {
      for (var index in valid) {
        if (status == 1) {
          valid[index].check = 1;
          selectValue.push(valid[index].productId);
        } else valid[index].check = 0;
      }
      // var validData = "cartList.valid";
      that.setData({
        shangjiagoods: valid,
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
    apiCart.getCartList(app.globalData.urlCart, '/cart/getCartList', {
      userId: that.data.userId,
    }, (res) => {
      console.log('购物车', res)
      var shangjiagoods = [];
      var xiajiagoods = [];
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
      for (var index in cartList) {
        cartList[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + cartList[index].productIcon;
      }
      var valid = cartList;
      for (var index in valid) {
        if (valid[index].productStatus == 1) {
          shangjiagoods.push(valid[index])
        } else {
          xiajiagoods.push(valid[index])
        }
      }
      if (valid.length > 0) {
        that.setData({
          cratList: valid,
          shangjiagoods: shangjiagoods,
          xiajiagoods: xiajiagoods
        });
        var selectCountPrice = 0.00;
        let shangjia = that.data.shangjiagoods
        for (var index in shangjia) {
          selectCountPrice = Number(selectCountPrice) + Number(shangjia[index].productNum) * Number(shangjia[index].productPrice)
        }
        that.setData({
          selectCountPrice:selectCountPrice
        });
      }
      let num = JSON.stringify(res.data.data.length)
      app.globalData.cartNum = num;
      that.setData({
        cartNum: num
      })
      wx.setTabBarBadge({
        index: 3,
        text: app.globalData.cartNum
      })
    });
  },
//批量删除
  submitdel(){
    var that=this;
    let cart = that.data.shangjiagoods
    var checkgoods = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].check == 1) {
        let productId = Number(cart[i].productId)
        checkgoods.push(productId)
      }
    }
    apiCart.toSettle(app.globalData.urlCart, '/cart/delGoods', {
      productId: checkgoods,
      userId: that.data.userId,
    }, (res) => {
     that.getCart();
    });
  },
  //删除商品
  delGoods(e) {
    var that = this;
    var goodslist = [];
    var cart = that.data.shangjiagoods;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    apiCart.toSettle(app.globalData.urlCart, '/cart/delGoods', {
      productId: e.currentTarget.dataset.goodsid,
      userId: that.data.userId,
    }, (res) => {
      that.getCart();
    });
  },

  //常买
  oftenbuy(e) {
    var that = this;
    var cart = that.data.shangjiagoods;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    apiCart.toSettle(app.globalData.urlCart, '/cart/OftenBuy', {
      goodsId: e.currentTarget.dataset.goodsid,
      userId: that.data.userId,
    }, (res) => {
      console.log(res)
      if (res.data.data == '设置成功') {
        that.setData({
          isOftenBuy: false
        })
      }
    });
  },
  delOftenBuy(e) {
    var that = this;
    var cart = that.data.shangjiagoods;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    apiCart.toSettle(app.globalData.urlCart, '/cart/delOftenbuy', {
      goodsId: e.currentTarget.dataset.goodsid,
      userId: that.data.userId,
    }, (res) => {
      console.log(res)
      if (res.data.data == '取消成功') {
        that.setData({
          isOftenBuy: true
        })
      }
    });
  },
  getOftenBuy() {
    var that = this;
    apiCart.toSettle(app.globalData.urlCart, '/cart/selectOftenBuy', {
      userId: that.data.userId,
    }, (res) => {
      console.log(res)
      var cartList = res.data.data;
      for (var index in cartList) {
        cartList[index].img = app.globalData.urlGoods + '/goods/getFile?fileId=' + cartList[index].productIcon;
      }
      that.setData({
        shangjiagoods: cartList
      })
      that.switchSelect();
    });
  },
  //关注
  concern(e) {
    var that = this;
    var cart = that.data.shangjiagoods;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          openId: res.data.userInfo.openId
        })
      },
    })
    apiCart.toSettle(app.globalData.urlCart, '/cart/Concern', {
      goodsId: e.currentTarget.dataset.goodsid,
      openId: that.data.openId
    }, (res) => {
      console.log(res)
      if (res.data.data == '设置成功') {
        that.setData({
          isGuanzhu: false
        })
      }
    });
  },
  delconcern(e) {
    var that = this;
    var cart = that.data.shangjiagoods;
    console.log(e)
    let goodsid = e.currentTarget.dataset.goodsid
    wx.getStorage({
      key: 'user',
      success: function(res) {
        that.setData({
          openId: res.data.userInfo.openId
        })
      },
    })
    apiCart.toSettle(app.globalData.urlCart, '/cart/delConcern', {
      goodsId: e.currentTarget.dataset.goodsid,
      openId: that.data.openId
    }, (res) => {
      console.log(res)
      if (res.data.data == '取消成功') {
        that.setData({
          isGuanzhu: true
        })
      }
    });
  },
  getConcern() {
    var that = this;
    let goodsList = [];
    apiCart.toSettle(app.globalData.urlCart, '/cart/selectConcern', {
      userId: that.data.userId
    }, (res) => {
      console.log(res)

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
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
    if (app.globalData.toCartTag == true) {
      that.getOftenBuy();
      that.setData({
        bannertoggle: 3
      })
      app.globalData.toCartTag = false;
    } else {
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
    }
  },

  //修改商品数量
  subCart: function(event) { //减少商品数量
    var that = this;
    var status = false;
    var index = event.currentTarget.dataset.index;
    var item = that.data.shangjiagoods[index];
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
    var item = that.data.shangjiagoods[index];
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