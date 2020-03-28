import productApi from '../../../services/hf-product.js';
import requestUtils from '../../../services/request-utils.js';
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
    onClickRanking: function (e) {
      let selected = e.currentTarget.dataset.item;
      // console.log(selected.id)
      wx.navigateTo({
        url: '/pages/product/list?action=chosen&activityId=' + selected.id
      });
    }
  },
  lifetimes: {
    attached: function () {
      productApi.getTopRanking((res) => {
        let rankings = res.data.data;
        
        requestUtils.setImageUrls(rankings);

        this.setData({
          rankingData: rankings,
          scrollH: this.properties.scrollH,
          imgWidth: this.properties.imgWidth
        });
      });
    },
    detached: function () { },
  }
})
