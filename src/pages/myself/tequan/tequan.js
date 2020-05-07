// src/pages/myself/tequan/tequan.js
import quan from '../../../services/hf-tequan.js';
import car from '../../../services/car.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    str:'',
    quanlist:[],
    hui:'',
    num:0,
    id:'',
    levellist:[],
    userId:'',
    tequan:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hui:options.hui
    })
    this.getlevelList();
    // console.log(111);
    var that = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        that.setData({
          userId: res.data
        })
        that.couponHall();
        // console.log(res);
        quan.getquan(that.data.userId ,(res) => {
          // let list = res.data.data;
          // console.log(res);
          that.setData({
            tequan: res.data.data
          })
          if(that.data.tequan.length>0){
            that.setData({
              num:1
            })
          }
        });
      },
    })
   
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
  
  couponHall:function(){
    var that=this;
    let obj={
      scope :1,
      userId :that.data.userId 
    }
    quan.couponHall(obj,(res) => {
    //  var that=this;
      console.log(res);
      that.setData({
        quanlist: res.data.data
      })
      let arr=that.data.quanlist;
      if(arr){
        for(var i=0;i<arr.length;i++){
          arr[i].useLimit= JSON.parse(arr[i].useLimit) ;
        
         if(arr[i].discountCouponType==1){
          arr[i].useLimit.minus= (arr[i].useLimit.minus/100).toFixed(2);
          }else{
            arr[i].useLimit.minus= arr[i].useLimit.minus/10;
          }
          arr[i].useLimit.full= (arr[i].useLimit.full/100).toFixed(2);
        }
        that.setData({
          quanlist: arr
         })
      }
      
       console.log(that.data.quanlist)
    });
  },
  goquan:function(){
    wx.navigateTo({
      url: '../quan/quan',
    })
  },
  getlevelList:function(){
    quan.getlevelList((res) => {
     var that=this;
      console.log(res);
      that.setData({
       levellist: res.data.data
      })
      let arr=that.data.levellist;
      for(var i=0;i<arr.length;i++){
        arr[i].change=0;
      }
      arr[0].change=1;
      that.setData({
        levellist: arr
       })
      //  console.log(that.data.levellist)
    });
  },
  changlevel:function(e){
    var that=this;
    // console.log(e.currentTarget.dataset.id);
    let arr=that.data.levellist;
    for(var i=0;i<arr.length;i++){
      arr[i].change=0;
    }
   
    arr[e.currentTarget.dataset.id].change=1;
    that.setData({
      levellist: arr
     })
  },
  pay:function(){
    let str ='';
    if(this.data.str==''){
     str =this.generateUUID();
     this.setData({
       str: str
      })
    }else{
     str=this.data.str;
    }
    var that=this;
    let kai=0;
    let amount=0;
    let ids='';
    let arr=that.data.levellist;
    for(var i=0;i<arr.length;i++){
     if(arr[i].change==1){
       kai=1;
       amount=arr[i].amount;
       ids=arr[i].id;
     }
    }
    // console.log( '1',kai)
    if(kai==0){
      wx.showToast({
        title: '请选择会员等级',
        icon:'none'
      })
      return false;
    }

    let obj={
      requestId: str,
      sellPrice:amount*100,
      hfRemark :'充值订单',
      orderType :'rechargeOrder',
      paymentName :'wechart',
      userId :that.data.userId,
    }
    console.log(obj)
    car.createOrder(obj ,(res) => {
    console.log('1',res);
    if(res.data.status==200){
      that.setData({
        id:res.data.data.id,
      })
      let obj1={
        requestId: str,
        payOrderId :that.data.id,
        userId :that.data.userId,
        type:1,
      }
      console.log(obj1)
      quan.pay(obj1 , (res) => {
        console.log('2',res);
        if(res.data.status==200){
          wx.requestPayment({
            timeStamp: res.data.data.timeStamp,
            nonceStr: res.data.data.nonce_str,
            package: res.data.data.package,
            signType: 'MD5',
            paySign: res.data.data.paySign,
            success (res) { 
              // console.log(res);
              let obj2={
                transactionType:'rechargeOrder',
                payOrderId :that.data.id,
                userId :that.data.userId,
                level:ids,
                requestId: str,
              }
              console.log(obj2);
              quan.complate(obj2, (res) => {
                quan.getquan(that.data.userId ,(res) => {
                  // let list = res.data.data;
                  // console.log(res);
                  that.setData({
                    tequan: res.data.data
                  })
                  if(that.data.tequan.length>0){
                    that.setData({
                      num:1
                    })
                  }
                });
               });
            },
            fail (res) { }
          })
        }
      });
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
    wx.setNavigationBarTitle({
      title: "PLUS会员",
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