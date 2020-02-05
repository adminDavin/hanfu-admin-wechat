const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idw:[],
    id:[],
    activeKey: 0,
    arr:[],
    arrs:[],
    parentCategoryId:"",
    images:'',
    firstId:'',
  },
  sousuo: function () {
    wx.navigateTo({
      url: '../seckill/seek/seek',
    })
  },
  // 跳转到列表
  goThreeLevel:function(e){
    console.log(e)
    let categoryId = e.currentTarget.dataset.categoryid;
    wx.navigateTo({
      url: `/pages/product/list?categoryid=${categoryId}`,
    })
  },
  // 首次加载二级类目
  firstGetSec() {
    var that = this;
    wx.request({
      url: app.endpoint.product + '/product/category',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data.data;
        console.log('fileId首次', list)
        for (var index in list) {
          for (var j in list[index].categories) {
            list[index].categories[j].img = app.endpoint.product + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
            console.log('fileId首次值', list[index].categories[j].fileId)
          }
        }
        that.setData({
          arrs: list
        })
      },
      data: {
        parentCategoryId: that.data.firstId,
        type: 1
      }
    })
  },
  //查询类目页面图片
  images: function (e) {
    var that = this;
    wx.request({
      url: app.endpoint.product + '/product/findCategoryPagePicture',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let list = res.data.data;
        console.log('fileId列表1',list)
        for (var index in list) {
          list[index].img = app.endpoint.product + '/goods/getFile?fileId=' + list[index].id;
          console.log('fileId值1', list[index].id)
        }
        that.setData({
          images:list
        })
      },
    })
  },
  
  //一级类目
  morecategory: function (e) {
    var that = this;
    wx.request({
      url: app.endpoint.product + '/product/category',
      method: 'Get',
      success: function (res) {
        console.log(res)
        let firstId=res.data.data[0].id
        let shu = res.data.data[0]
        that.setData({
           arr:res.data.data,
           firstId:firstId,
        })
        console.log(that.data.arr)
      },
    })
  },
  //二级类目
  morecategorys: function () {
    var that = this;
    wx.request({
      url: app.endpoint.product + '/product/category',
      method: 'Get',
      success: function (res) {
        let list = res.data.data;
        console.log('fileId列表2', list)
        for (var index in list) {
          for(var j in list[index].categories){
            list[index].categories[j].img = app.endpoint.product + '/goods/getFile?fileId=' + list[index].categories[j].fileId;
            console.log('fileId值2', list[index].categories[j].fileId)
          }
        }
        that.setData({
          arrs: list
        })
        console.log(that.data.arrs)
      },
      data:{
        parentCategoryId: that.data.id,
        type: 1
      }
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstGetSec()
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
    this.images()
    this.morecategory()
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

  },
 //点击类目
  onChange: function (e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id
    console.log(id)
    that.setData({
      id: id
    })
    that.morecategorys();
  },
})