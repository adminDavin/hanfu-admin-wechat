const app = getApp();

import productApi from '../../../services/hf-product.js';
import util from '../../../utils/util.js';


Component({
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollH: 0,
    imgWidth: 0,
    rankingData: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClickRanking: function(e) {
      let selected = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: '/pages/product/list?rankingId=' + selected.id
      });
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
     productApi.getTopRanking((res) => {
        let rankings = res.data.data;
        for (let ranking of rankings) {
          if (util.isRealNum(ranking.fileId)) {
            ranking.imageUrl = app.endpoint.file + '/goods/getFile?fileId=' + ranking.fileId;
          }
        }
        
        this.setData({
          rankingData: rankings,
          scrollH: this.properties.scrollH,
          imgWidth: this.properties.imgWidth
        });
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})