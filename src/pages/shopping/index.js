// pages/shopping/shopping.js
const app = getApp();
import car from '../../services/car.js';
// var util = require('../../utils/util.js')
// const apiCart = require('../../utils/api/cart.js');
// import projectUtils from '../../utils/project-utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    count:0,
    carlist:[],
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
    shangjiagoods: [
    ],
    xiajiagoods: [],
    selectCountPrice: 0.00,
    isAllSelect: false, //全选
    selectValue: [], //选中的数据
  },
       //删除商品
       delGoods(e) {
         console.log(e)
        var that = this;
        let obj={
          stoneId:e.currentTarget.dataset.stontid,
          productId :e.currentTarget.dataset.goodsid,
          userId: wx.getStorageSync('userId'),
        }
        car.delGoods(obj, (res) => {
          if(res.data.status==200){
            wx.showToast({
              title: '删除成功',
            })
            that.checkcar();
          }else{
            wx.showToast({
              title: '删除失败',
              icon:'none'
            })
          }
        });
      },
  checkcar:function(){
    let obj={
      userId: wx.getStorageSync('userId'),
    }
    var that=this;
   car.checkcar(obj, (res) => {
      console.log(res);
      that.setData({
        shangjiagoods:res.data.data
      })
    let arr=that.data.shangjiagoods;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        arr[i].goodList[j].check=0;
      }
    }
    that.setData({
      shangjiagoods:arr
    })
      console.log(that.data.shangjiagoods);
    })   
  },
  submit:function(){
    var that=this;
    let arr=that.data.shangjiagoods;
  let shi=0;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        if(arr[i].goodList[j].check==1){
          arr[i].check1=1;
          shi=1;
          continue;
        }
      }
    }
    if(shi==0){
      wx.showToast({
        title: '请选择商品',
        icon:'none'
      })
      return false;
    }
    arr=JSON.stringify(arr);
    // for(var i=0;i<arr.length;i++){
    //   for(var j=0;j<arr[i].goodList.length;j++){
    //     arr[i].goodList[j].check=0;
    //   }
    // }
    
    wx.navigateTo({
      url: '../pay/pay?arr='+ arr +'&count='+that.data.count,
    })
  },
    check:function(e){
    var that=this;
    // console.log(e);
    // console.log(e.currentTarget.dataset.index);
    // console.log(e.currentTarget.dataset.indexs);
    let arr =that.data.shangjiagoods;
    if(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].check==0){
      arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].check=1;
    }else{
      arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].check=0;
    }
    let ischoose=1;
    // console.log(arr)
    for(var i=0;i<arr.length;i++){
      // console.log('xuan0')
      for(var j=0;j<arr[i].goodList.length;j++){
        //  console.log('xuan')
        if(arr[i].goodList[j].check==0){
          // console.log(1);
          ischoose=0;
          that.setData({
            isAllSelect:false,
          })
        }
      } 
    }
    if(ischoose==1){
      that.setData({
        isAllSelect:true,
      })
    }
    let count=0;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        // console.log('xuan1')
      if(arr[i].goodList[j].check==1){
        count+=arr[i].goodList[j].productNum*arr[i].goodList[j].productPrice;
      }
    }
  }
    that.setData({
      shangjiagoods:arr,
      count:count
    })
    },
    subCart: function(e) { //减少商品数量
      var that = this;
      var index = e.currentTarget.dataset.index;
      let arr =that.data.shangjiagoods;
      let count =that.data.count;
       console.log(e);
console.log(arr)
console.log(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs])
      if(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum>1){
        if(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].check==1){
          count= count-arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productPrice;
        }
        
        arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum=arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum-1;
       
        that.setData({
          shangjiagoods:arr,
          count:count
        })
        let obj={
          stoneId:arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].stoneId,
          goodsId:arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productId,
          num :arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum,
          userId :wx.getStorageSync('userId'),
        }
        car.updateCartNum(obj, (res) => {
          console.log(res);
        })   
      }
    },
          //全选
  checkboxAllChange: function(event) {
    var that=this;
    let arr =that.data.shangjiagoods;
   if(that.data.isAllSelect==true){
    that.setData({
      isAllSelect:false,
      count:0,
    })
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        arr[i].goodList[j].check=0;
      }
    }
    }else{
      let count=0;
      for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].goodList.length;j++){
          arr[i].goodList[j].check=1;
           count+=arr[i].goodList[j].productNum*arr[i].goodList[j].productPrice;
        }
       }
      
       that.setData({
        count:count,
        isAllSelect:true
      })
   }
    that.setData({
      shangjiagoods:arr,
    })
  },
    addCart: function(e) { //添加商品数量
      var that = this;
      var index = e.currentTarget.dataset.index;
      let arr =that.data.shangjiagoods;
      arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum=arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum+1;
      let count =that.data.count;
      if(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].check==1){
        count= count+arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productPrice;
      }
      that.setData({
        shangjiagoods:arr,
        count:count
      })
      let obj={
        stoneId:arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].stoneId,
        goodsId:arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productId,
        num :arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum,
        userId :wx.getStorageSync('userId'),
      }
      console.log(obj);
      car.updateCartNum(obj, (res) => {
        console.log(res);
      })   
    },
 
 



 


 

  edit: function() {
    var that = this;
    that.setData({
      editshow: !that.data.editshow
    })
  },

  gobuy() {
    wx.switchTab({
      url: '../order/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    that.checkcar();

    // wx.getStorage({
    //   key: 'phone',
    //   success: function(res) {
    //     wx.getStorage({
    //       key: 'user',
    //       success: function(res) {
    //         that.setData({
    //           userId: res.data.userId
    //         })
    //         that.getCart();
    //       },
    //     })
    //   },
    //   fail: function(res) {
    //     that.setData({
    //       tiphidden: false,
    //     })
    //   }
    // })
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
    wx.setNavigationBarTitle({
          title: "购物车",
        
          
      })
      wx.setNavigationBarColor({
        frontColor: '#ffffff', // 必写项
        backgroundColor: '#FF3333', // 传递的颜色值

      })

    this.setData({
     img: app.endpoint.file
    })
   
    // projectUtils.activeTabBar(this, 3)
    // var that = this;
    // if (app.globalData.toCartTag == true) {
    //   that.getOftenBuy();
    //   that.setData({
    //     bannertoggle: 3
    //   })
    //   app.globalData.toCartTag = false;
    // } else {
    //   wx.getStorage({
    //     key: 'phone',
    //     success: function(res) {
    //       wx.getStorage({
    //         key: 'user',
    //         success: function(res) {
    //           that.setData({
    //             userId: res.data.userId
    //           })
    //           that.getCart();
    //         },
    //       })
    //     },
    //     fail: function(res) {
    //       that.setData({
    //         tiphidden: false,
    //       })
    //     }
    //   })
    // }
  },

  //修改商品数量
 


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