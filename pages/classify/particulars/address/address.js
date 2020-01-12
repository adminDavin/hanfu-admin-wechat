// pages/classify/particulars/address/address.js
const app = getApp();
import particularsUtil from '../particulars-util.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userId: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tsiteshow: false,
    addressList: [],
    selectedAddress: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tsiteguanbi() {
      this.onSubmitSelectedAddress(false);
    },
    onSubmitSelectedAddress(isSeleted=true) {
      this.triggerEvent('selectAddressEvent', { selectedAddress: this.data.selectedAddress });      
    },
    //展示地址
    getsitelist() {
      particularsUtil.getSitelist({
        userId: 2,
        token: 2
      }, (res) => {
        this.setData({
          addressList: res.data.data
        });
      });
      },
    // 点击选择地址
    editadd(e) {
      let id = e.currentTarget.dataset.addid
      particularsUtil.getAddressDetail({
        id: id
      }, (res) => {
        let list = res.data.data;

        this.setData({
          selectedAddress: { siteDetail: list.hfProvince + list.hfCity + list.hfAddressDetail, id: id }
        })
      }); 
    }
  },


  lifetimes: {
    // 组件的生命周期函数，用于声明组件的生命周期
    ready: function () {
      this.getsitelist();
    },
    detached: () => {
      console.log("退出")
    }
  } 

})
