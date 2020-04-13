// src/pages/pay/pay.js
// src/pages/payment/index.js

const app = getApp();

import userAddressApi from '../../services/hf-user-address.js';
import orderApi from '../../services/hf-order.js';
import util from '../../utils/util.js';
import discount from '../../services/discount.js';
import car from '../../services/car.js';
import tequan from '../../services/hf-tequan.js';

Page({
  data: {
    elevalue:'',
    textshow:true,
    count1:'',
    item:{},
    shangjiagoods:{},
    img:'',
    count:'',
    competitive:true,
    CouponId:'',
    showModalCreateOrder: false,
    tequan:[],//可用优惠
    mistake: [],// 不可用优惠
    useLimit: { full: "", minus: "" },//选中的优惠
    quantity:'',
    selectedAddress: {},
    pickUp: {
      wayOfPickUp: 'selfPickUp',
      wayOfPickUpDesc: '自提',
      freight: 0
    },
    paymentMethod: [{
      checked: true,
      desc: '微信支付',
      name: 'wechart'
    }, {
      checked: false,
      desc: '余额支付',
      name: 'balance'
    }]
  },
  /**
   * 生命周期函数--监听页面加载 quantity
   */
  getVal: function(e) {
    this.setData({
      elevalue: e.detail.value
    })
   },
  onLoad: function (options) {
    
    this.setData(
      {
        count1:options.count,
        count:options.count,
        shangjiagoods:JSON.parse(options.arr)
      }
    )
    
    userAddressApi.query(wx.getStorageSync('userId'), (res) => {
      console.log(res.data.data, res.data.data.length);
      if (res.data.data.length > 0) {
        this.setData({
          selectedAddress: res.data.data[0]
        });
      }
    });
    let arr =this.data.shangjiagoods;
    let list=[];
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        if(arr[i].goodList[j].check==1){
          let arr1={};
          arr1.goodsId=arr[i].goodList[j].productId;
          arr1.quantity=arr[i].goodList[j].productNum;
          arr1.stoneId=arr[i].goodList[j].stoneId;
          list.push(arr1);
        }
      }
     }
    let obj={
      userId: wx.getStorageSync('userId'),
      state:0,
      goodsList:JSON.stringify(list) 
    }
    var that=this;
   car.getquan(obj, (res) => {
      console.log(res);
      for(var i=0;i<res.data.data.length;i++){
        res.data.data[i].useLimit= JSON.parse(res.data.data[i].useLimit);
      }
     that.setData({
      tequan:res.data.data
     })
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
    // console.log(this.data);
    var that=this;
    that.setData({
      img: app.endpoint.file
    })
  },
  // 选择地址 跳到地址栏
  selectLocation(){
    wx.navigateTo({
      url: '/pages/myself/address/list?action=Gotoaddress',
    })
  },

  onAddUserAddress(e) {
    console.log(this.data.userId);
    wx.navigateTo({
      url: '/pages/myself/address/detail?action=addAddress&userId=' + this.data.userId,
    })
  },
  changeMethod: function (e) {
    if (this.data.pickUp.wayOfPickUp == 'selfPickUp') {
      this.setData({
        pickUp: {
          wayOfPickUp: 'delivery',
          wayOfPickUpDesc: '邮寄',
          freight: 10
        }
      });
    } else if (this.data.pickUp.wayOfPickUp == 'delivery') {
      this.setData({
        pickUp: {
          wayOfPickUp: 'selfPickUp',
          wayOfPickUpDesc: '自提',
          freight: 0
        }
      });
    }
  },
  changeCoupon(e) {
      this.setData({
        showModalCreateOrder: true
      });
  },
  changeCoupons(e) {
    let a1=this.data.count1;
    let arr3=[];
    arr3.push(e.currentTarget.dataset.item.id);
    console.log(e.currentTarget.dataset.item);
    this.setData({
      count: a1-e.currentTarget.dataset.item.useLimit.minus,
      item:e.currentTarget.dataset.item,
      CouponId:arr3,
      ['useLimit.full']: e.currentTarget.dataset.item.useLimit.full,
      ['useLimit.minus']: e.currentTarget.dataset.item.useLimit.minus,
      showModalCreateOrder: false
    });
   
  },
  onCloseGoodsSpec: function (e) {
    // 隐藏遮罩层
    if (e.currentTarget.dataset.type == "createOrder") {
      this.setData({
        showModalCreateOrder: false
      });
    }
  },
  generateUUID:function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
      return uuid ;
    },

  onPaymentMethod: function (e) {
    let paymentMethod = this.data.paymentMethod;
    for (let payment of this.data.paymentMethod) {
      if (e.detail.value == payment.name) {
        payment.checked = true;
      } else {
        payment.checked = false;
      }
    }
    this.setData({ paymentMethod: paymentMethod });
  },
  shenback:function(){

  },
  onCreateOrder: function (e) {
 
   let arr =this.data.shangjiagoods;
   let list=[];
   for(var i=0;i<arr.length;i++){
    for(var j=0;j<arr[i].goodList.length;j++){
      if(arr[i].goodList[j].check==1){
        let arr1={};
        arr1.goodsId=arr[i].goodList[j].productId;
        arr1.hfDesc=arr[i].goodList[j];
        arr1.quantity=arr[i].goodList[j].productNum;
        arr1.stoneId=arr[i].goodList[j].stoneId;
        list.push(arr1);
      }
    }
   }
   console.log(list);
   let str =this.generateUUID();
   console.log(str);
    let params = {
      requestId: str,
      disconuntId:this.data.CouponId,
      takingType:this.data.pickUp.wayOfPickUp,
      userId:wx.getStorageSync('userId'),
      userAddressId:'',
      orderType: 'nomalOrder',
      paymentName:'wechart',
      hfRemark: this.data.elevalue,
      goodsList :JSON.stringify(list) 
    };
    if (typeof (this.data.selectedAddress.id) != 'undefined') {
      params.userAddressId = this.data.selectedAddress.id;
    }
    for (let payment of this.data.paymentMethod) {
      if (payment.checked) {
        params.paymentName = payment.name;
      }
    }
    console.log(params.paymentName)
    let pay= params.paymentName;
    console.log(params );
    if(params.paymentName=='balance'){
      tequan.findInfoByUserId(wx.getStorageSync('userId'), (res) => {
        console.log(res);
        if(res.data.data.surplus<this.data.count*100){
          wx.showToast({
            title: '余额不足',
            icon:'none'
          })
          return false;
        }else{
         
          car.createOrder(params, (res) => {
            console.log(res);
            if(res.data.data.goodsId){
              wx.showToast({
                title:'商品'+res.data.data.goodsName+ '库存不足',
                icon:'none'
              })
              return false;
            }
            if(res.data.status==200){
                wx.navigateTo({
                  url: '/pages/paysubmit/paysubmit?outTradeNo=' + res.data.data+'&paymentName='+pay+'&count='+this.data.count+'&str='+str,
               })
            }
          });
        }
        
       });
    }else{
      console.log(params)
      car.createOrder(params, (res) => {
        console.log('创建订单',res);
        if(res.data.data.goodsId){
          wx.showToast({
            title:'商品'+res.data.data.goodsName+ '库存不足',
            icon:'none'
          })
          return false;
        }
        if(res.data.status==200){
            wx.navigateTo({
              url: '/pages/paysubmit/paysubmit?outTradeNo=' + res.data.data+'&paymentName='+pay+'&str='+str+'&count='+this.data.count,
           })
        }
      });
    }

  }
})

