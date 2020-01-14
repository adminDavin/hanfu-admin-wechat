// pages/classify/particulars/comp/choose-spec.js
const app = getApp();
import particularsUtil from '../particulars-util.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    productId: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsSpec: [],
    productSpec: {},
    selectedGoods: {
      goodsNum: 0,
      totalprice: 0,
      spec: { 色彩: "红色", 大小: "6.5寸"},
      goodsId: 5,
    },
    productSpec: new Map(),
    // 保持被点击的元素的值
    value: '',
    spec:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onInputNum(e) {
      this.setData({
       goodsNum : e.detail.value
      })

    },
    onSelectSpecValue(e) {
      console.log
     let thit = this
      let selectedGoods = this.data.selectedGoods;
      let spec = this.data.spec;
      console.log(e.currentTarget.dataset);

      let productSpecId = this.data.productSpec.get(e.currentTarget.dataset.name);
      spec[productSpecId] = e.currentTarget.dataset.value;
      console.log(spec)
      selectedGoods.spec[productSpecId] = e.currentTarget.dataset.value;
   
      console.log(selectedGoods);
      // TODO 检查库存是否有库存 goodsSpe.includes(fruit)
      selectedGoods.goodsId = 5;
      selectedGoods.totalprice = 1000;
      selectedGoods.goodsNum = 1;
      console.log(selectedGoods);
      // TODO 检查库存是否有库存 
      wx.request({
        url: app.globalData.urlparticulars + '/goods/checkResp',
        method: 'POST',
        data: {
          productId:this.properties.productId,
          goodsNum: selectedGoods.goodsNum,
          respList: JSON.stringify(selectedGoods.spec),
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success(res) {
          console.log(res.data);
          selectedGoods.goodsId = data.id;
          selectedGoods.goodsNum = data.goodsNum;
          selectedGoods.totalprice = money;
        }
      })
      this.setData({
        selectedGoods: selectedGoods,
        value: e.currentTarget.dataset.value,
      });
       console.log(this.data.goodsSpec)

    },
    onSubmitSelectedGoods() {
      this.triggerEvent('chooseGoodsCommitEvent', { selectedGoods: this.data.selectedGoods });
    },
    getGoodsByProductId() {
      particularsUtil.getGoodsByProductId({
        productId: this.data.productId
      }, (res) => {
        let goodsSpec = new Map();
        let productSpec = new Map();
        
        res.data.data.forEach(s => {
          if (goodsSpec.has(s.productSpecName)) {
            goodsSpec.get(s.productSpecName).push(s.hfValue);
          } else {
            let values = new Array();
            values.push(s.hfValue);
            goodsSpec.set(s.productSpecName, values);
            productSpec.set(s.productSpecName, s.id)


          }
        });
        this.setData({
          goodsSpec: [...goodsSpec],
          productSpec: productSpec
        })
      });
    }
  },
  lifetimes: {
    // 组件的生命周期函数，用于声明组件的生命周期
    ready: function () {
      this.getGoodsByProductId();
    },
    detached: () => {
      console.log("退出")
    }

  }
})