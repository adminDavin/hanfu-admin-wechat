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
    goodsList: [],
    selectedGoods: {
      goodsNum: 1,
      totalprice: 0,
      spec: { },
      goodsId: 1,
      productId: 0
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
      let thit = this
      let selectedGoods = this.data.selectedGoods;
      let spec = this.data.spec;
       // TODO 检查库存是否有库存 
      let that = this;
      console.log(e.currentTarget.dataset.goods[0]);
      wx.request({
        url: app.globalData.urlparticulars + '/goods/checkResp',
        method: 'POST',
        data: {
          productId:this.properties.productId,
          goodsNum: selectedGoods.goodsNum,
          goodId: e.currentTarget.dataset.goods[0]
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' 
        },
        success(res) {
          console.log(res)
          console.log(res.data.data, 'dfddsfsafd');
          selectedGoods.goodsId = res.data.data.id;
          selectedGoods.goodsNum = res.data.data.goodsNum;
          selectedGoods.totalprice = res.data.data.money;
          selectedGoods.productId = that.properties.productId;

          that.setData({
            selectedGoods: selectedGoods,
            value: e.currentTarget.dataset.value,
          });
        }
      })
       console.log(this.data.goodsSpec)

    },
    onSubmitSelectedGoods() {
      this.triggerEvent('chooseGoodsCommitEvent', { selectedGoods: this.data.selectedGoods });
    },
    getGoodsByProductId() {
      particularsUtil.getGoodsByProductId({
        productId: this.data.productId
      }, (res) => {
        let goodsMap = new Map();

        res.data.data.forEach(s => {
          if (goodsMap.has(s.id)) {
            goodsMap.get(s.id).push(s.hfValue);
          } else {
            let values = new Array();
            values.push(s.hfValue);
            goodsMap.set(s.id, values);
          }
        });
        this.setData({
          goodsMap: [...goodsMap],
        })
        console.log(this.data.goodsMap);
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