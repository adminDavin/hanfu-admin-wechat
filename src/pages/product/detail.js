// src/pages/product/detail.js
const app = getApp();
import requestUtils from '../../services/request-utils.js';
import productApi from '../../services/hf-product.js';
import goodsApi from '../../services/hf-goods.js';
import util from '../../utils/util.js';
import car from '../../services/car.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    activityId: '',//活动ID
    activityIds: '',//活动ID
    datatype:'',//判断点击的是购买还是加入购物车
    imgageUrls:[],
    img:'',
    evaluateRatio:0,
    evaluateCount:0,
    stars: [0, 1, 2, 3, 4],
    pinglist:false,
    productId:'',
    introduceimgurl: [], //介绍图
    stoneId: '',
    goods: '',
    linePrice: '', // 下线价格
    loading: '',
    priceArea: '',
    instanceId:'',
    goodsId: '',
    activityState: '', // 活动状态
    countdown: '',
    eventStatus: '限时秒杀',
    startTime: '',
    endTime: '',
    endDate2: '2020-03-030 14:41:00',
    groupList: [],
    collects: false, // 点赞按钮
    collecte: false, //收藏
    showModal: false,
    slideNumber: '1', //详情滑动跳动数字
    amount: '', //图片总数
    current: 0,
    seckillActivity: false, //秒杀
    groupActivity: false, // 团购
    competitive: false, // 精选
    indicatorDots: true,
    inquire: [{
        sum: '1',
        open: [{
          name: '1'
        }, {
          name: '2'
        }],
      }

    ], //查询正在开团
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    selectedGoods: {},
    quantity: 1,
    product: {},
    showModalSelectionSpecification: false,
    showModalCreateOrder: false,
    showModalShopPayment: false,


  },
  zan:function(e){
    let obj={
      type:'evaluate',
      id:e.currentTarget.dataset.id,
      userId:wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.zan(obj, (res) => {
      console.log(res);
      if(res.data.status==200){
        this.ping();
      }
  })
  },
  gopingdetail:function(e){
    console.log(e);
    wx.navigateTo({
      url: '../myself/allPingdetail/allPingdetail?id='+e.currentTarget.dataset.item.id+'&item='+JSON.stringify(e.currentTarget.dataset.item),
    })
},
  // externalClasses: ['i-class'],
  // 查询正在更多开团
  more: function(e) {
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
  close_mask: function() {
    this.setData({
      showModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载 priceArea
   */
  onLoad: function(options) {
    var that = this;
    console.log(options)
    that.setData({
      evaluateCount: options.evaluateCount,
      evaluateRatio: options.evaluateRatio,
      stoneId: options.stoneId,
      productId:options.productId,
    })
    that.ping();
    that.data.activityState = options.activityState;
    that.data.startTime = options.startTime;
    that.data.priceArea = options.priceArea;
    that.data.activityId = options.activityId;
    that.data.activityIds = options.activityId;
    that.data.stoneName = options.stoneName;
    that.data.endTime = options.endTime;
    that.data.instanceId = options.instanceId;

    // that.data.sellPrices = options.sellPrices
    console.log(options)
    that.countTime()
    if (options.action == 'groupActivity') {
      console.log('拼团')
      this.data.groupActivity = true
    }
    if (options.action == 'seckillActivity') {
      console.log('秒杀')
      this.data.seckillActivity = true
    }
    if (options.action == 'competitive') {
      console.log('精选')
      this.data.competitive = true
    }
    if (options.action == 'rotation') {
      console.log('轮播')
      this.data.competitive = true
    }
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        options.scrollH = scrollH;
        options.imgWidth = imgWidth;
        this.setData({ ...this.data,
          ...options
        });
      }
    });
  },
  cha:function(){
    wx.navigateTo({
      url: '../myself/allPing/allPing?stoneId='+this.data.stoneId+'&productId='+this.data.productId+'&evaluateCount='+this.data.product.evaluateCount+'&evaluateRatio='+this.data.product.evaluateRatio,
    })
  },
  ping:function(){
    console.log(this.data.product)
    let obj = {
      stoneId:this.data.stoneId,
      pageNum:1,
      pageSize:1,
      productId:this.data.productId,
      userId:wx.getStorageSync('userId'),
      type:'evaluate'
    }
    console.log(obj)
    car.selectInstanceEvaluate(obj, (res) => {
      console.log(res);

      for(var i=0;i<res.data.data.list.length;i++){
        res.data.data.list[i].parentEvaluate.hfDesc=JSON.parse(res.data.data.list[i].parentEvaluate.hfDesc)
      }
      if(res.data.data.list.length>0){
        this.setData({
          pinglist:res.data.data.list
        })
      }
   
      console.log(this.data.pinglist)
    });
  },
  // 加入购物车
  addcar: function(e) {
    console.log(e);
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    this.setData({
      datatype: e.currentTarget.dataset.type,
      //  animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
      showModalSelectionSpecification: true
    });
    
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
   
    let productId = this.data.productId;
    let stoneId = this.data.stoneId;
    if (typeof(productId) == 'undefined') {
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
        console.log('商品图', goods);

        let imgageUrls = [];

        for (let fileId of goods.fileIds) {
          imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
        }
        let product = res.data.data;
        console.log(product);
        this.updateSelectedGoods(product.defaultGoodsId, product);
        this.setData({
          // imgageUrls: imgageUrls
        });
      })
    
    }
  },

  updateSelectedGoods: function(goodsId, product) {
    goodsApi.getGoodsDetail({
      goodsId: goodsId,
      quantity: '1'
    }, (res) => {
      let goods = res.data.data;
      let imgageUrls = [];
      console.log('1111111', goods);
      for (let fileId of goods.fileIds) {
        imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
      }
      if (goods.quantity > this.data.quantity) {
        goods.quantity = this.data.quantity;
      } else {
        // 库存不足
        goods.quantity = 0;
      }
      this.setData({
        product: product,
        // imgageUrls: imgageUrls,
        selectedGoods: goods
      });
    });
  },

  onSelectedChoice: function(e) {
    console.log(this.data.selectedGoods)
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "ease",
      delay: 0
    });
    this.animation = animation;
    animation.translateY(300).step();
    
    console.log(e.currentTarget.dataset);

    if (e.currentTarget.dataset.type == 'purchased') {
      console.log('单独购买')
      this.setData({
        activityId: 0,
        showModalSelectionSpecification: true
      })
    }
    if (e.currentTarget.dataset.type == "selectionSpecification") {
      this.setData({
        datatype: '',
        activityId: this.data.activityIds,
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
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      });
      console.log(this.data);
    }, 200);
  },
  onCloseGoodsSpec: function(e) {
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
    setTimeout(function() {
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

  //详情滑动跳动数字
  current: function(e) {
    // console.log(e)
    var that = this
    that.setData({
      slideNumber: e.detail.current + 1
    })
  },

  //关注
  collect: function() {
    var that = this;
    if (that.data.collects) {
      let params = {
        stoneId: this.data.stoneId,
        userId: wx.getStorageSync('userId')
      }
      productApi.deleteStoneConcern(params, (res) => {
        console.log(res)
        that.setData({
          collects: !that.data.collects,
        })
        wx.showToast({
          title: '取消关注',
        });
      })
    } else {
      let params = {
        stoneId: this.data.stoneId,
        userId: wx.getStorageSync('userId')
      }
      productApi.addStoneConcern(params, (res) => {
        console.log(res)
        that.setData({
          collects: !that.data.collects,
        })
        wx.showToast({
          title: '关注成功',
        });
      })
    }
  },
  //收藏、
  eventCollect() {
    var that = this;
    console.log(that.data.stoneId)
    if (that.data.collecte) {
      let params = {
        productId: this.data.productId,
        userId: wx.getStorageSync('userId'),
        stoneId: that.data.stoneId
      }
      console.log(params)
      productApi.deleteProductCollect(params, (res) => {
        console.log(res)
        that.setData({
          collecte: !that.data.collecte,
        })
        wx.showToast({
          title: '取消收藏',
        });
      })
    } else {
      let params = {
        stoneId: that.data.stoneId,
        productId: this.data.productId,
        userId: wx.getStorageSync('userId'),
        stoneId: that.data.stoneId
      }
      productApi.addProductCollect(params, (res) => {
        console.log(res)
        that.setData({
          collecte: !that.data.collecte,
        })
        wx.showToast({
          title: '收藏',
        });
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onHide: function() {
    //写在onHide()中，切换页面或者切换底部菜单栏时关闭定时器。
    clearInterval(this.data.loading);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      img: app.endpoint.file
     })
    let productId = this.data.productId;
    let stoneId = this.data.stoneId;
    if (typeof(productId) == 'undefined') {
      wx.showToast({
        title: '商品ID不存在',
        icon: 'warn',
        duration: 2000,
        mask: true
      });
    } else {
      let params = {
        userId: wx.getStorageSync('userId'),
        productId: this.data.productId,
        stoneId: this.data.stoneId
      }
      productApi.getProductDetail(params, (res) => {
        let goods = res.data.data;
        // let imgageUrls = res.data.data;
        // requestUtils.setImageUrls(goods.fileIds);
        console.log('商品图', goods);

        let imgageUrls = [];
        for (let fileId of goods.fileIds) {
          imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
        }
        console.log(goods)
        console.log('商品图imgageUrls',imgageUrls)
        if (res.data.data.isConcern == 1) {
          console.log('关注')
          this.setData({
            collects: !this.data.collects,
          })
        }
        if (res.data.data.isCollect == 1) {
          console.log('收藏')
          this.setData({
            collecte: !this.data.collecte,
          })
        }
        let product = res.data.data;
        this.updateSelectedGoods(product.defaultGoodsId, product);
        this.setData({
          amount: goods.fileIds.length,
          imgageUrls: imgageUrls,
          linePrice: goods.linePrice,
          goods: goods
        });
      })

      productApi.selectProductIntroducePictrue({ productId: productId}, (res) => {
        let evaluation = res.data.data;
        requestUtils.setImageUrls(evaluation);
        console.log('商品介绍', evaluation);
        this.setData({
          introduceimgurl: evaluation
        });
      })
    }
  },
  onUnload: function() {
    clearInterval(this.data.loading)
    console.log('结束', this.data.loading)
  },
  updateSelectedGoods: function(goodsId, product) {
    let userId = wx.getStorageSync('userId')
    goodsApi.getGoodsDetail({
      goodsId: goodsId,
      quantity: '1',
      userId: userId
    }, (res) => {
      let goods = res.data.data;
      console.log('详情', res.data.data)
      let imgageUrls = [];
      // this.setData({  });
      for (let fileId of goods.fileIds) {
        imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
      }
      this.setData({
        product: product,
        selectedGoods: goods
      });
      this.setData({ product: product, selectedGoods: goods }); 
    });
  },
  onSelectedGoodsSpec: function(e) {
    console.log(this.data.selectedGoods)
    let params = {
      instanceId: this.data.instanceId,
      GoodsNum: this.data.quantity,
      goodsId: this.data.selectedGoods.id
    }
    // productApi.checkResp(params, (res) => {
    //   if (res.data.data == 'understock') {
    //     wx.showToast({
    //       title: '库存不足',
    //       icon: 'none'
    //     });
    //     return
    //   }
    //   // if (e.currentTarget.dataset.type == "createOrder") {
    //   //   this.setData({
    //   //     animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
    //   //     showModalCreateOrder: true
    //   //   });
    //   // }

    // })
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
    } else if (e.currentTarget.dataset.type == "shopPayment") {
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalShopPayment: true
      });
    }
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
      });
      console.log(this.data);
    }, 200);
  },
  onCloseGoodsSpec: function(e) {
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
    setTimeout(function() {
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
  listenChooseGoodsCommitEvent: function(e) {
    e.currentTarget.dataset.type = "selectionSpecification";
    this.setData(e.detail);
    this.onCloseGoodsSpec(e);
  },
  onConfirmSelectedGoods: function(e) {
    console.log(e)
    console.log(this.data.goods)
    let userId = wx.getStorageSync('userId');

    if (util.isEmpty(userId)) {
      //  跳转到登录页
      wx.navigateTo({
        url: '/pages/login/index'
      });
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
  createOrder: function(paymentType, userId) {
    console.log(this.data.selectedGoods, paymentType);
    console.log(this.data.quantity);
    console.log(this.data.competitive);
    console.log(this.data.stoneName);
    this.data.selectedGoods.quantitys = this.data.quantity
    // if (this.data.selectedGoods.sellPrices == undefined) {
    //   this.data.selectedGoods.sellPrices = this.data.selectedGoods.sellPrices
    // }
    let params = {
      selectedGoods: this.data.selectedGoods,
      paymentType: paymentType,
      userId: userId,
      stoneId: this.data.product.stoneId,
      // groupActivity: this.data.groupActivity,
      activityId: this.data.activityId,
      quantity: this.data.quantity,
      competitive: this.data.competitive,
      stoneName: this.data.stoneName,
      instanceId: this.data.instanceId
    };
    console.log(params);
    wx.navigateTo({
      // url: '/pages/payment/index?params=' + encodeURIComponent(JSON.stringify(params))
    });
  },
  // 到店支付
  shoppingPayment: function(paymentType, userId) {
    let params = {
      paymentType: paymentType,
      stoneId: this.data.product.stoneId,
      stoneName: this.data.product.stoneName,
      stoneAddress: this.data.goods.stoneAddress
    };
    wx.navigateTo({
      url: '/pages/payment/shopping?params=' + encodeURIComponent(JSON.stringify(params)),
    })

  },
  countTime() {
    var that = this;
    var date = new Date();
    var now = date.getTime();
    var endDate = new Date(that.data.endTime); //设置截止时间
    var end = endDate.getTime();
    console.log(now)
    console.log(end)
    var leftTime = end - now; //时间差                           
    var d, h, m, s, ms;
    if (this.data.activityState == -1) {
      console.log(1)
      var staDate = new Date(that.data.startTime); //设置截止时间
      var sta = staDate.getTime();
      var leftTime = sta - now; //时间差   
      if (leftTime >= 0) {
        console.log(2)
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        ms = Math.floor(leftTime % 1000);
        // ms = ms < 100 ? "0" + ms : ms
        s = s < 10 ? "0" + s : s
        m = m < 10 ? "0" + m : m
        h = h < 10 ? "0" + h : h
      }
      this.setData({
        eventStatus: '距活动开始时间',
        countdown: d + "天" + h + "时" + m + "分" + s + "秒"
      })
      console.log('活动未开始')
      //递归每秒调用countTime方法，显示动态时间效果
      // setTimeout(that.countTime, 1000);
    }
    if (this.data.activityState !== -1) {
      console.log(3)
      if (leftTime >= 0) {
        console.log(4)
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        ms = Math.floor(leftTime % 1000);
        // ms = ms < 100 ? "0" + ms : ms
        s = s < 10 ? "0" + s : s
        m = m < 10 ? "0" + m : m
        h = h < 10 ? "0" + h : h
        that.setData({
          countdown: d + "天" + h + "时" + m + "分" + s + "秒",
        })
        //递归每秒调用countTime方法，显示动态时间效果
        that.setData({
          loading: setTimeout(that.countTime, 1000)
        })
      } else {
        console.log(5)

        console.log('已截止')
        that.setData({
          eventStatus: '活动已结束',
          countdown: '0天0时0分0秒'
        })
      }
    }
  },
})