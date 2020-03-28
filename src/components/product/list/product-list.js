// components/product/list/product-list.js

const app = getApp();
import reuqestUtils from '../../../services/request-utils.js';
import productApi from '../../../services/hf-product.js';
import util from '../../../utils/util.js';
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    scrollH: {
      type: Number,
      value: 0,
    },
    imgWidth: {
      type: Number,
      value: 0,
    },
    parameters: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rotationQuantity: 3,
    chosenData: [],
    loadingCount: 0,
    scrollH: 0,
    imgWidth: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPullDownRefresh: function (e) {
      console.log(e);
    },
    onSeletedProduct: function (e) {
      let selected = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '/pages/product/detail?productId=' + selected.id
      });
    },
    loadImages: function () { },
    getProducts: function (params) {
      console.log(params)
      productApi.getProducts(params, (res) => {
        let products = res.data.data.list;
        console.log(products)
        reuqestUtils.setImageUrls(products);
        for (let product of products) {
          console.log(product);
          if (typeof (product.priceArea) == 'undefined') {
            product.newPrice = '商品配置异常';
          }
        }
        this.setData({
          chosenData: products,
          scrollH: this.properties.scrollH,
          imgWidth: this.properties.imgWidth
        });
      });
    }

  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      setTimeout(() => {
        console.log(this.properties.parameters);
        let params = this.properties.parameters;
        if (typeof(params.action) != 'undefined') {
          this.getProducts(params); 
        }
      }, 20);
      
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})