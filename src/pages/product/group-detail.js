// src / pages / product / group - detail.js
const app = getApp();

import requestUtils from '../../services/request-utils.js';
import productApi from '../../services/hf-product.js';
import goodsApi from '../../services/hf-goods.js';
import util from '../../utils/util.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accession:'',//判断是不是加入拼团进入的
    activityId:'',//活动ID
    groupid:'',//拼团ID
    priceArea: '',
    goodsId: '',
    activityState: '',// 活动状态
    countdown: '',
    eventStatus: '限时秒杀',
    startTime: '',
    endTime: '',
    endDate2: '2020-03-030 14:41:00',
    groupList: [],//团购列表两条
    groupLists: [],//团购列表全部
    collects: false,// 点赞按钮
    showModal: false,
    slideNumber: '1', //详情滑动跳动数字
    current: 0,
    seckillActivity: false, //秒杀
    groupActivity: false,// 团购
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    selectedGoods: {},
    quantity: 1,
    product: {},
    showModalSelectionSpecification: false,
    showModalCreateOrder: false,
    showModalShopPayment: false


  },
  // 查询正在更多开团
  more: function (e) {
    console.log(this.data.productId)
    let params = {
      bossId: 1,
      productId: this.data.productId,
    }
    goodsApi.getListGrou(params, (res) => {
      console.log('团购列表', res.data.data)
      let groupLists = res.data.data
      requestUtils.groupFileId(groupLists)
      // for (let item of groupLists) {
      //   if (util.isRealNum(item.groupFileId)) {
      //     if (leftTime >= 0) {
      //       d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      //       h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      //       m = Math.floor(leftTime / 1000 / 60 % 60);
      //       s = Math.floor(leftTime / 1000 % 60);
      //       ms = Math.floor(leftTime % 1000);
      //       // ms = ms < 100 ? "0" + ms : ms
      //       s = s < 10 ? "0" + s : s
      //       m = m < 10 ? "0" + m : m
      //       h = h < 10 ? "0" + h : h
      //       that.setData({
      //         countdown: d + "天" + h + "时" + m + "分" + s + "秒",
      //       })
      //       //递归每秒调用countTime方法，显示动态时间效果
      //       that.setData({
      //         loading: setTimeout(that.countTime, 1000)
      //       })
      //     } else {
      //       console.log('已截止')
      //         countdown: '0天0时0分0秒'
      //     }
      //   }
      // }
      this.setData({
        groupLists: groupLists
      })
      console.log(this.data.groupList)
    })
    console.log(e)
    var that = this;
    that.setData({
      showModal: true,
      // number: res.data
    })
    // wx.request({
    //   url: app.globalData.urlpuzzle + '/group/selectAllGroup',
    //   method: 'Get',
    //   success: function (res) {
    //     console.log(res)

    //   },
    //   data: {
    //     id: that.data.dataid
    //   }
    // })
  },
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },
  guigeshow:function (e) {
    console.log(e.currentTarget.dataset.groupid)
    console.log(e.currentTarget.dataset.type)
    console.log(wx.getStorageInfoSync('userId'))
     let groupId = e.currentTarget.dataset.groupid
     let userId = wx.getStorageSync('userId')

    productApi.groupStatus(groupId, userId, (res) => {
      console.log(res)
      // wx.showToast({
      //   title: '',
      // });
    })
    this.setData({
      groupid: e.currentTarget.dataset.groupid,
      accession: e.currentTarget.dataset.type,
      showModalSelectionSpecification: true
    })
  },
  /**
   * 生命周期函数--监听页面加载 activityId
   */
  onLoad: function (options) {
    var that = this;
    that.data.priceArea = options.priceArea;
    that.data.activityId = options.activityId;
    console.log(options)
    if (options.action == 'groupActivity') {
      console.log('拼团')
      this.data.groupActivity = true
    }
    if (options.action == 'seckillActivity') {
      console.log('秒杀')
      this.data.seckillActivity = true
    }
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        options.scrollH = scrollH;
        options.imgWidth = imgWidth;
        this.setData({ ...this.data, ...options });
      }
    });
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
    let productId = this.data.productId;
    let stoneId = this.data.stoneId;
    if (typeof (productId) == 'undefined') {
      wx.showToast({
        title: '商品ID不存在',
        icon: 'warn',
        duration: 2000,
        mask: true
      });
    } else {
      productApi.getProductDetail(productId, stoneId, (res) => {
        console.log(res)
        let goods = res.data.data;
        console.log('商品图', goods)
        let imgageUrls = [];

        for (let fileId of goods.fileIds) {
          imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
        }
        let product = res.data.data;
        this.updateSelectedGoods(product.defaultGoodsId, product);
        this.setData({ imgageUrls: imgageUrls });
      })
    }
  },

  updateSelectedGoods: function (goodsId, product) {
    goodsApi.getGoodsDetail({ goodsId: goodsId, quantity: this.data.quantity }, (res) => {
      let goods = res.data.data;
      let imgageUrls = [];

      for (let fileId of goods.fileIds) {
        imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
      }
      if (goods.quantity > this.data.quantity) {
        goods.quantity = this.data.quantity;
      } else {
        // 库存不足
        goods.quantity = 0;
      }
      this.setData({ product: product, imgageUrls: imgageUrls, selectedGoods: goods });
    });
  },

  onSelectedGoodsSpec: function (e) {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();

    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.type == "selectionSpecification") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalSelectionSpecification: true
      });
    } else if (e.currentTarget.dataset.type == "createOrder") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalCreateOrder: true
      });

    } else if (e.currentTarget.dataset.type == "shopPayment") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalShopPayment: true
      });
    }
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()  // export 方法每次调用后会清掉之前的动画操作。
      });
      console.log(this.data);
    }, 200);
  },
  onCloseGoodsSpec: function (e) {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step();
      if (e.currentTarget.dataset.type == "selectionSpecification") {
        this.setData({
          animationData: animation.export(),
          showModalSelectionSpecification: false
        });
      } else if (e.currentTarget.dataset.type == "createOrder") {
        this.setData({
          animationData: animation.export(),
          showModalCreateOrder: false
        });
      } else if (e.currentTarget.dataset.type == "shopPayment") {
        this.setData({
          animationData: animation.export(),
          showModalShopPayment: false
        });
      }
      console.log(this)
    }.bind(this), 200)
  },

  // //详情滑动跳动数字
  // current: function (e) {
  //   console.log(e)
  //   // var that = this
  //   // that.setData({
  //   //   slideNumber: e.detail.current + 1
  //   // })
  // },

  //关注
  collect: function () {
    var that = this;
    if (that.data.collects) {
      that.setData({
        collects: !that.data.collects,
      })
      wx.showToast({
        title: '取消关注',
      });
    } else {
      that.setData({
        collects: !that.data.collects,
      })
      wx.showToast({
        title: '关注成功',
      });
    }
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
    let productId = this.data.productId;
    let stoneId = this.data.stoneId;
    if (typeof (productId) == 'undefined') {
      wx.showToast({
        title: '商品ID不存在',
        icon: 'warn',
        duration: 2000,
        mask: true
      });
    } else {
      productApi.getProductDetail(productId, stoneId, (res) => {
        let goods = res.data.data;
        console.log('商品图', goods)
        let imgageUrls = [];

        for (let fileId of goods.fileIds) {
          imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
        }
        let product = res.data.data;
        this.updateSelectedGoods(product.defaultGoodsId, product);
        this.setData({ imgageUrls: imgageUrls });
      })
    }
  },

  updateSelectedGoods: function (goodsId, product) {
    goodsApi.getGoodsDetail({ goodsId: goodsId, quantity: '1' }, (res) => {
      let goods = res.data.data;
      console.log('详情', res.data.data)
      let imgageUrls = [];

      for (let fileId of goods.fileIds) {
        imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
      }
      this.setData({ product: product, selectedGoods: goods });
      // this.setData({ product: product, imgageUrls: imgageUrls, selectedGoods: goods }); 
      if (this.data.groupActivity) {
        console.log(goods.productId)
        console.log(goods)
        let params = {
          bossId:1,
          productId: goods.productId,
          sum:2
        }
        goodsApi.getListGrou(params, (res) => {
          console.log('团购列表', res.data.data)
          let groupList = res.data.data
          requestUtils.groupFileId(groupList)
          this.setData({
            groupList: groupList
          })
          console.log(this.data.groupList)
        })
      }
    });
  },
  onSelectedGoodsSpec: function (e) {
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();

    console.log(e.currentTarget.dataset);
    if (e.currentTarget.dataset.type == "selectionSpecification") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalSelectionSpecification: true
      });
    } else if (e.currentTarget.dataset.type == "createOrder") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalCreateOrder: true
      });

    } else if (e.currentTarget.dataset.type == "shopPayment") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalShopPayment: true
      });
    }
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()  // export 方法每次调用后会清掉之前的动画操作。
      });
      console.log(this.data);
    }, 200);
  },
  onCloseGoodsSpec: function (e) {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step();
      if (e.currentTarget.dataset.type == "selectionSpecification") {
        this.setData({
          animationData: animation.export(),
          showModalSelectionSpecification: false
        });
      } else if (e.currentTarget.dataset.type == "createOrder") {
        this.setData({
          animationData: animation.export(),
          showModalCreateOrder: false
        });
      } else if (e.currentTarget.dataset.type == "shopPayment") {
        this.setData({
          animationData: animation.export(),
          showModalShopPayment: false
        });
      }
      console.log(this)
    }.bind(this), 200)
  },
  listenChooseGoodsCommitEvent: function (e) {
    e.currentTarget.dataset.type = "selectionSpecification";
    this.setData(e.detail);
    this.onCloseGoodsSpec(e);
  },
  onConfirmSelectedGoods: function (e) {
    this.onCloseGoodsSpec(e);
    let userId = wx.getStorageSync('userId');

    if (util.isEmpty(userId)) {
      //  跳转到登录页
      wx.navigateTo({ url: '/pages/login/index' });
    } else {
      let paymentType = e.currentTarget.dataset.type;
      if (paymentType == "shopPayment") {
        this.shoppingPayment(paymentType, userId);
      } else {
        this.createOrder(paymentType, userId);
      }
    }
  },
  // 创建订单
  createOrder: function (paymentType, userId) {
    console.log(this.data.selectedGoods, paymentType);
    if (this.data.selectedGoods.sellPrices == undefined) {
      this.data.selectedGoods.sellPrices = this.data.selectedGoods.sellPrice
    }
    this.data.selectedGoods.quantitys = this.data.quantity
    console.log(this.data.selectedGoods)
    console.log(paymentType)
    console.log(this.data.groupActivity)
    let params = {
      selectedGoods: this.data.selectedGoods,
      paymentType: paymentType,
      userId: userId,
      stoneId: this.data.product.stoneId,
      groupActivity: this.data.groupActivity,
      activityId: this.data.activityId,
      quantity: this.data.quantity,
      groupid: this.data.groupid
    };
    wx.navigateTo({
      url: '/pages/payment/index?params=' + encodeURIComponent(JSON.stringify(params))
    });
  },
  // 到店支付
  shoppingPayment: function (paymentType, userId) {
    let params = {
      paymentType: paymentType,
      stoneId: this.data.product.stoneId,
      stoneName: this.data.product.stoneName
    };
    wx.navigateTo({
      url: '/pages/payment/shopping?params=' + encodeURIComponent(JSON.stringify(params)),
    })
  },
})