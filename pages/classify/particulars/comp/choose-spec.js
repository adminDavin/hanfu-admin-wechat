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
      dd:''
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
      spec: {},
      goodsId: 5,
    },
    // 保持被点击的元素的值
    value: '',
    isChecked: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test() {
      let goodsSpec = this.data.goodsSpec
      let value = this.data.value
      for (var i = 0; i <= goodsSpec.length;i++) {
        //  console.log(goodsSpec[i])
        for (var j = 0; j <= i+1;j++) {
          // console.log(goodsSpec[i][j])
          // rr.indexOf('nothing')
          if (goodsSpec[i][j].indexOf(value)){
            isChecked: true
          } else {
            isChecked: false
          }
        }
       }
    },
    onInputNum(e) {
      console.log(e);
    },
    onSelectSpecValue(e) {
     let thit = this
      let selectedGoods = this.data.selectedGoods;
      console.log(e.currentTarget.dataset);
      selectedGoods.spec[e.currentTarget.dataset.name] = e.currentTarget.dataset.value;
      selectedGoods.goodsId = 5;
      selectedGoods.totalprice = 1000;
      selectedGoods.goodsNum = 5;
      console.log(selectedGoods);
      // TODO 检查库存是否有库存 goodsSpe.includes(fruit)
      this.setData({
        selectedGoods: selectedGoods,
        value: e.currentTarget.dataset.value
      });
      this.test()
      console.log(this.test() == '0' ? 'active' : 'onSelect-Spec')

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
          }
        });
        this.setData({
          goodsSpec: [...goodsSpec]
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