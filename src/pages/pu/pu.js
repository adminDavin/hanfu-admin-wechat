const app = getApp();
import quan from '../../services/hf-tequan.js';


Page({
  data: {
    hfName:'',
    price:0,
    img:'',
    listpro:[],
    id:'',
    sort: '',
    scrollH: 0,
    imgWidth: 0,
    lists: false,
    clickprice: false,
    currentTab: 0, //切换
    mosthigher: '',
    mostlower: '',
  },
  onSeletedProduct: function (e) {
    let selected = e.currentTarget.dataset.item;
    console.log(selected)
    if (selected.productActivityType == 'groupActivity') {
      wx.navigateTo({
        url: '/pages/product/group-detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea*100 + '&stoneName=' + selected.stoneName + '&action=' + selected.productActivityType + '&activityId=' + selected.activityId + '&stoneName=' + selected.stoneName+'&evaluateRatio='+selected.evaluateRatio+'&evaluateCount='+selected.evaluateCount
      });
    } else if (selected.productActivityType == 'seckillActivity') {
      wx.navigateTo({
        url: '/pages/product/detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea*100 + '&stoneName=' + selected.stoneName + '&action=' + selected.productActivityType + '&activityId=' + selected.activityId + '&stoneName=' + selected.stoneName+'&evaluateRatio='+selected.evaluateRatio+'&evaluateCount='+selected.evaluateCount
      });
    } else {
      wx.navigateTo({
        url: '/pages/product/detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&action=' + 'competitive' + '&priceArea=' + selected.priceArea*100+ '&stoneName=' + selected.stoneName+'&evaluateRatio='+selected.evaluateRatio+'&evaluateCount='+selected.evaluateCount
      });
    }

  },
  diseaseNameInput: function(e) {
    this.setData({
      hfName: e.detail.value
    })
   },
  //列表切换
  list: function () {
    this.setData({
      lists: !this.data.lists,
    })
  },
  onShow(){
    this.setData({
      img: app.endpoint.file
    })
  },
  name:function(){
    let obj={
      stoneId:this.data.id,
      hfName:this.data.hfName
    }
    console.log(obj);
    quan.name(obj, (res) => {
      console.log(res);
      this.setData({
        listpro: res.data.data.list
      })
      let arr=this.data.listpro;
      if(arr.length>0){
        for(var i=0;i<arr.length;i++){
          arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
        }
      }
    
      this.setData({
        listpro: arr
      })
    });
  },
  // 切换目录
  clickTab: function (e) {
    console.log(e)
    // this.setData({ currentTab: e.currentTarget.dataset.id, sort: '' });
    // 点击父组件传值给子组件
    // var header = this.selectComponent("#product-id");
    // header.getPro()
    if(e.currentTarget.dataset.id=='0'){
      let obj={
        stoneId:this.data.id,
       
      }
      quan.getstoneproduct(obj, (res) => {
        console.log(res);
        this.setData({
          listpro: res.data.data.list
        })
        let arr=this.data.listpro;
        if(arr.length>0){
          for(var i=0;i<arr.length;i++){
            arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
          }
        }
        this.setData({
          listpro: arr
        })
      });
      this.setData({ currentTab: e.currentTarget.dataset.id, sort: '0' });
    }   else if(e.currentTarget.dataset.id=='1'){
     
        let obj={
          stoneId:this.data.id,
          sort :1
        }
console.log(obj)
        quan.getstoneproduct(obj, (res) => {
          console.log(res);
          this.setData({
            listpro: res.data.data.list
          })
          let arr=this.data.listpro;
          if(arr.length>0){
            for(var i=0;i<arr.length;i++){
              arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
            }
          }
          this.setData({
            listpro: arr
          })
        });
        this.setData({ currentTab: e.currentTarget.dataset.id, sort: '1' });
      
    }
    else if(e.currentTarget.dataset.id==2){
      if(this.data.price==0){
        let obj={
          stoneId:this.data.id,
          sort :0
        }
        quan.getstoneproduct(obj, (res) => {
          console.log(res);
          this.setData({
            listpro: res.data.data.list
          })
          let arr=this.data.listpro;
          if(arr.length>0){
            for(var i=0;i<arr.length;i++){
              arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
            }
          }
          this.setData({
            listpro: arr
          })
        });
        this.setData({
          price:1
        })
      }else{
        let obj={
          stoneId:this.data.id,
          sort :-1
        }
        quan.getstoneproduct(obj, (res) => {
          console.log(res);
          this.setData({
            listpro: res.data.data.list
          })
          let arr=this.data.listpro;
          if(arr.length>0){
            for(var i=0;i<arr.length;i++){
              arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
            }
          }
          this.setData({
            listpro: arr
          })
        });
        this.setData({
          price:0
        })
      }
      this.setData({ currentTab: e.currentTarget.dataset.id, sort: '2' });
    }
  
   
  },
  // 切换价格
  clickprice: function (e) {
    if (this.data.clickprice) {
      console.log('小大')
      this.setData({ currentTab: e.currentTarget.dataset.id, clickprice: false, sort: '-1' });
      // 点击父组件传值给子组件
      var header = this.selectComponent("#product-id");
      // header.getPro()
    } else {
      console.log('大小')
      this.setData({ clickprice: true })
      this.setData({ currentTab: e.currentTarget.dataset.id, clickprice: true, sort: '0' })
      // 点击父组件传值给子组件
      var header = this.selectComponent("#product-id");
      // header.getPro()
    }
  },
  // 切换销量
  clickSales: function (e) {
    console.log(e)
    this.setData({ currentTab: e.currentTarget.dataset.id, sort: '1' });
    // 点击父组件传值给子组件
    var header = this.selectComponent("#product-id");
    // header.getPro()
  },

  // 获取滚动条当前位置
  onPageScroll: function (e) {
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  // 回到顶部
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({ scrollTop: 0 });
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 最低价
  mostlower(e) {
    this.setData({ mostlower: e.detail.value });
  },
  // 最高价
  mosthigher(e) {
    this.setData({ mosthigher: e.detail.value });
  },

  // 筛选
  onReady: function () {
    this.animation = wx.createAnimation()
  },
  translate: function (event) {
    this.setData({ isRuleTrue: true });
  },

  success: function () {
    this.setData({ isRuleTrue: false });
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({ id: options.id });
    let obj={
      stoneId:this.data.id
    }
      // wx.setNavigationBarTitle({
      //   title: options.name
      // })
    quan.getstoneproduct(obj, (res) => {
      console.log(res);
      this.setData({
        listpro: res.data.data.list
      })
      let arr=this.data.listpro;
      if(arr.length>0){
        for(var i=0;i<arr.length;i++){
          arr[i].priceArea=(arr[i].priceArea/100).toFixed(2);
        }
      }
      this.setData({
        listpro: arr
      })
    });
  }
})