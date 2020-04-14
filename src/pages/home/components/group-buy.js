// pages/home/components/group-buy.js
import productApi from '../../../services/hf-product.js';
import requestUtils from '../../../services/request-utils.js';
import util from '../../../utils/util.js';
import projectUtils from '../../../utils/project-utils.js';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    productGroups: [],
    scrollH: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectedMore: function (e) {
      wx.navigateTo({
        url: '/pages/product/group/list',
      })
    },
    onSeletedProduct:function(e) {
      console.log(e.currentTarget.dataset)
      let dataset = e.currentTarget.dataset.item
      wx.navigateTo({
        url: '/pages/product/group-detail?action=groupActivity&productId=' + dataset.id + '&stoneId=' + dataset.stoneId + '&activityId=' + dataset.activityId + '&priceArea=' + dataset.priceArea + '&stoneName=' + dataset.stoneName
      })
    }
  },
  lifetimes: {
    ready: function () {
      productApi.getProductGroup((res) => {
        let productGroups = [];
        console.log(res.data.data)
        for (let i = 0; i < res.data.data.length; i++) {
          // console.log(res.data.data[i].productList)
          let productList = res.data.data[i].productList
          for (let j = 0; j < productList.length; j++) {
            productGroups.push(productList[j])
          }
        }
        console.log(productGroups)
        requestUtils.setImageUrls(productGroups);
        this.setData({
          productGroups: productGroups,
        });
        console.log(this.data.productGroups);
      });
    }
  }
})
