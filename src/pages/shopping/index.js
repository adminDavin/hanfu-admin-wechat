// pages/shopping/shopping.js
const app = getApp();
import projectUtils from '../../utils/project-utils.js';
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
  toggle:function(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({
      bannertoggle: e.currentTarget.dataset.index,
    })
    let obj={
      type:1,
      userId: wx.getStorageSync('userId'),
    }
    var that=this;
   car.checkcar(obj, (res) => {
      console.log(res);
      // that.setData({
      //   shangjiagoods:res.data.data
      // })
    let arr=res.data.data;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        arr[i].goodList[j].check=0;
        arr[i].goodList[j].productPrice=(arr[i].goodList[j].productPrice/100).toFixed(2)
      }
    }
    that.setData({
      shangjiagoods:arr
    })
      console.log(that.data.shangjiagoods);
    })   
  },
  concern:function(e){
    
    let obj={
      stoneId:e.currentTarget.dataset.stontid,
      productId :e.currentTarget.dataset.goodsid,
      userId: wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.cartconcern(obj, (res) => {
      if(res.data.status==200){
        wx.showToast({
          title: '已关注',
        })
       
      }else{
        wx.showToast({
          title: '关注失败',
          icon:'none'
        })
      }
    });
  },
  oftenbuy:function(e){
    let obj={
      num:1,
      type:1,
      goodsId:e.currentTarget.dataset.goodsid,
      stoneId:e.currentTarget.dataset.stontid,
      userId : wx.getStorageSync('userId'),
    }
    console.log(obj)
    car.buy(obj, (res) => {
      console.log(res)
      if(res.data.status==200){
        wx.showToast({
          title: '设置成功',
        })
        
      }else{
        wx.showToast({
          title: '设置失败',
          icon:'none'
        })
      }
    });
  },
       //删除商品
       delGoods(e) {
         console.log(e)
    
        var that = this;
        let obj={
          type:0,
          stoneId:e.currentTarget.dataset.stontid,
          productId :e.currentTarget.dataset.goodsid,
          userId: wx.getStorageSync('userId'),
        }
        if(that.data.bannertoggle==1){
          obj.type=0;
        }else if(that.data.bannertoggle==3){
          obj.type=1;
        }
     
        car.delGoods(obj, (res) => {
          var that = this;
          if(res.data.status==200){
            wx.showToast({
              title: '删除成功',
            })
            if(that.data.bannertoggle==1){
              that.checkcar();
            }else if(that.data.bannertoggle==3){
              console.log(3)
              let obj={
                type:1,
                userId: wx.getStorageSync('userId'),
              }
              var that=this;
             car.checkcar(obj, (res) => {
                console.log(res);
                // that.setData({
                //   shangjiagoods:res.data.data
                // })
              let arr=res.data.data;
              for(var i=0;i<arr.length;i++){
                for(var j=0;j<arr[i].goodList.length;j++){
                  arr[i].goodList[j].check=0;
                  arr[i].goodList[j].productPrice=(arr[i].goodList[j].productPrice/100).toFixed(2)
                }
              }
              that.setData({
                shangjiagoods:arr
              })
                console.log(that.data.shangjiagoods);
              }) 
            }
           
          }else{
            wx.showToast({
              title: '删除失败',
              icon:'none'
            })
          }
        });
      },
      
       //删除商品
       delGoodsmore() {
     
       var that = this;
       let arr =this.data.shangjiagoods;
       let arr1=[];
     
      for(var i=0;i<arr.length;i++){
        for(var j=0;j<arr[i].goodList.length;j++){
          // console.log('xuan1')
        if(arr[i].goodList[j].check==1){
          let obj={
            productId:'',
            stoneId:'',
           }
          obj.productId=arr[i].goodList[j].productId;
          obj.stoneId=arr[i].goodList[j].stoneId;
          arr1.push(obj)
        }
      }
    }
    console.log(arr1);
       let obj={
        type:0,
         productStoneId :JSON.stringify(arr1),
         userId: wx.getStorageSync('userId'),
       }
       console.log(obj)
       car.deletemore(obj, (res) => {
         console.log(res)
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
      type:0,
      userId: wx.getStorageSync('userId'),
    }
    var that=this;
    that.setData({
      bannertoggle: 1,
    })
   car.checkcar(obj, (res) => {
      console.log(res);
      // that.setData({
      //   shangjiagoods:res.data.data
      // })
    let arr=res.data.data;
    for(var i=0;i<arr.length;i++){
      for(var j=0;j<arr[i].goodList.length;j++){
        arr[i].goodList[j].check=0;
        arr[i].goodList[j].productPrice=(arr[i].goodList[j].productPrice/100).toFixed(2)
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
        count+=Number(arr[i].goodList[j].productNum*arr[i].goodList[j].productPrice);
      }
    }
  }
   
  count=count.toFixed(2);
    that.setData({
      shangjiagoods:arr,
      count:count
    })
    console.log(this.data.shangjiagoods);
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
          count=count.toFixed(2);
        }
      
        arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum=arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productNum-1;
        // count=count.toFixed(2);
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
       count=count.toFixed(2);
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
        count= Number(count)+Number(arr[e.currentTarget.dataset.index].goodList[e.currentTarget.dataset.indexs].productPrice-0);
        count=count.toFixed(2);
      }
      // count= count-0;
     
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
      // count=(count-0).toFixed(2);
      that.setData({
        shangjiagoods:arr,
        count:count
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
    // if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    //   this.getTabBar().setData({
    //     selected: 2
    //   })
    // }
    projectUtils.activeTabBar(this, 3);
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