 const app = getApp();
import productApi from '../../services/hf-product.js';
import util from '../../utils/util.js';
import projectUtils from '../../utils/project-utils.js';
import requestUtils from '../../services/request-utils.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    idw: [],
    id: [],
    activeKey: 0,
    parentCategoryId: "",
    firstId: '',
    selectedLeftMenu: {},
    winHeight:''
  },
  sousuo: function () {
    wx.navigateTo({
      url: '/pages/product/seek/seek',
    })
  },
  // 跳转到列表
  goThreeLevel: function (e) {
    let categoryId = e.currentTarget.dataset.categoryid;
    console.log(categoryId)
    wx.navigateTo({
      url: `/pages/product/list?action=category&cagetoryId=${categoryId}`,
    })
  }, 
  chongqingjzb: function () {
    // wx.checkIsSoterEnrolledInDevice({
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })
    console.log(122)
    wx.navigateTo({
      url: '/pages/scan/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    productApi.getCategory({}, (res) => {
      requestUtils.setImageUrls(res.data.data);
      let selectedLeftMenu = res.data.data[0];
      this.setData({
        leftMenus: res.data.data,
        selectedLeftMenu: selectedLeftMenu
      });
      this.updateRightMenu(selectedLeftMenu);
    });
    console.log(app.globalData.winHeight)
    this.setData({
      winHeight: app.globalData.winHeight -
        wx.getSystemInfoSync().screenWidth / 750 * (155)
    })
    console.log(this.data.winHeight)
  },

  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    projectUtils.activeTabBar(this, 1);
  },

  //点击类目
  onSelectedLeftMenu: function (e) {
    this.updateRightMenu(e.currentTarget.dataset.selected);
  },
  updateRightMenu: function (selectedLeftMenu) {
    setTimeout(() => {
      productApi.getCategory({
        parentCategoryId: selectedLeftMenu.id,
        type: 1
      }, (res) => {
        for (let item of res.data.data) {
          requestUtils.setImageUrls(item.categories);

          if (typeof (item.categories) == undefined) {
            item.categories = [];
          }
        }

        if (this.data.selectedLeftMenu.id == selectedLeftMenu.id) {
          this.setData({
            rightMenu: res.data.data
          });
        } else {
          if (typeof (selectedLeftMenu.fileId) == 'undefined') {
            if (res.data.data.length > 0) {
              let category = res.data.data[0].categories[0];
              selectedLeftMenu.fileId = category.fileId;
              selectedLeftMenu.imageUrl = category.imageUrl;
            }
          }
          this.setData({
            rightMenu: res.data.data,
            selectedLeftMenu: selectedLeftMenu
          });
        }
      });
    }, 300);
  },

})