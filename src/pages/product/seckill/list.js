import productApi from '../../../services/hf-product.js';
import requestUtils from '../../../services/request-utils.js';
import util from '../../../utils/util.js';
import projectUtils from '../../../utils/project-utils.js';

Page({

  /**
   * Page initial dataccc
   */
  data: {
    slotLen:true,
    isCloseTimingTask: false,
    scrollH: 0,
    slots: [
      {sTime: "10:00", isActivity: true, startTime: "2020-02-10T07:26:29.357Z", desc: '抢购中' },
      { sTime: "14:00", isActivity: true, startTime: "2020-02-10T09:26:29.357Z", desc: '即将开始' },
      { sTime: "16:00", isActivity: true, startTime: "2020-02-10T09:26:29.357Z", desc: '即将开始' }
    ],
    selectedSlot: {},
    productSecKillData: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    projectUtils.adjustSystemInfo(this);
    this.updateTimeBar();
    this.updateData(new Date());
  },

  updateData: function (selectedTime) {
    productApi.getProductSeckill({ currentTime: selectedTime }, (res) => {
      let productSecKillData = res.data.data;
      console.log(productSecKillData)
      if (productSecKillData.length>4){
        this.setData({slotLen:false})
      }else{
        this.setData({slotLen: true})
      }
      requestUtils.setImageUrls(productSecKillData[0].productList);
      this.setData({
        productSecKillData: productSecKillData[0].productList,
        slots: productSecKillData,
      });
    });
  },

  // 定时任务
  timingTask: function () {
    setTimeout(() => {
      let slots = this.data.slots;
      let isContinue = true;
      for (let slot of this.data.slots) {
        let slotTime = new Date(util.myTimeToLocal(slot.startTime));
        let currentTime = new Date();
        let intervalMin = util.getInterveMinSecond(currentTime, slotTime);
        if (intervalMin < -120) {
          console.log(this);
          this.updateTimeBar();
          isContinue = false;
          break;
        } else {
          slot.desc = intervalMin < 0 ? "即将开始" : "进行中";
        }
      }
      if (isContinue) {
        this.setData({ slots });
      }
      if (!this.data.isCloseTimingTask) {
        this.timingTask();
      }
    }, 10000);
  },

  updateTimeBar: function() {
    productApi.getSeckillTimeBar((res) => {
      console.log(res);
    });
  },
  onSelectedTime: function (e) {
    let index=e.currentTarget.dataset.ind;
    console.log(e)
    this.setData({ currentTab:index})
    let selectedSlot = e.currentTarget.dataset.item.productList;
    console.log(selectedSlot)
    requestUtils.setImageUrls(selectedSlot);
    let updateData = this.data.selectedSlot.sTime == selectedSlot.sTime ? {} : { selectedSlot: selectedSlot };
    this.setData({
      productSecKillData: selectedSlot,
    });
    // productApi.getProductSeckill(selectedSlot, (res) => {
    //   let productSecKillData = res.data.data;
    //   requestUtils.setImageUrls(productSecKillData);
    //   updateData.productSecKillData = productSecKillData;
    //   this.setData(updateData);
    // });
  },
  onSeletedProduct: function (e) {
    let selected = e.currentTarget.dataset.item;
    console.log(selected)
    wx.navigateTo({
      url: '/pages/product/detail?productId=' + selected.id + '&stoneId=' + selected.stoneId + '&priceArea=' + selected.priceArea + '&stoneName=' + selected.stoneName
    });
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    this.timingTask();
  },

  onUnload: function () {
    this.setData({ isCloseTimingTask: true });
  }

})