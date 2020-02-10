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
    onSelectedMore: function(e) {
      console.log(e);
      wx.navigateTo({
        url: '/pages/product/group/list',
      })
    }
  },
  lifetimes:{
    ready:function(){
      productApi.getProductGroup({}, (res) => {
        let productGroups = res.data.data;
        requestUtils.setImageUrls(productGroups);
        this.setData({
          productGroups: productGroups,
        });
      });
    }
  }
})
