// pages/home/components/flash-sale.js
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
    isCloseTimingTask: false,
    scrollH: 0,
    slots: [
      { sTime: "10:00", isActivity: true, startTime: "2020-02-10T07:26:29.357Z", desc: '抢购中' },
      { sTime: "14:00", isActivity: true, startTime: "2020-02-10T09:26:29.357Z", desc: '即将开始' },
      { sTime: "16:00", isActivity: true, startTime: "2020-02-10T09:26:29.357Z", desc: '即将开始' }
    ],
    selectedSlot: {},
    productSecKillData: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectedMore: function (e) {
      console.log(e);
      wx.navigateTo({
        url: '/pages/product/seckill/list',
      })
    },
    updateData: function (selectedTime) {
      console.log(selectedTime)
      productApi.getProductSeckill({ currentTime: selectedTime }, (res) => {
        let productSecKillData = res.data.data;
        console.log(productSecKillData)
        requestUtils.setImageUrls(productSecKillData);
        this.setData({
          productSecKillData: productSecKillData,
        });
      });
    },
    onSelectedTime: function (e) {
      let index = e.currentTarget.dataset.ind;
      console.log(e)
      this.setData({ currentTab: index })
      let selectedSlot = e.currentTarget.dataset.item;
      console.log(selectedSlot)
      let updateData = this.data.selectedSlot.sTime == selectedSlot.sTime ? {} : { selectedSlot: selectedSlot };
      productApi.getProductSeckill(selectedSlot, (res) => {
        let productSecKillData = res.data.data;
        requestUtils.setImageUrls(productSecKillData);
        updateData.productSecKillData = productSecKillData;
        this.setData(updateData);
      });
    },
  },

  lifetimes: {
    attached: function () {
      this.updateData(new Date());
      console.log('dddsdfadfaf', this);
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  }
})
