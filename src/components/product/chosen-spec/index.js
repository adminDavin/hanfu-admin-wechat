// components/product/chosen-spec/index.js
const app = getApp();

import productApi from '../../../services/hf-product.js';
import goodsApi from '../../../services/hf-goods.js';
import util from '../../../utils/util.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    selectedGoodsId: {
      type: Number,
      value: 0
    },
    productId: {
      type: Number,
      value: 1
    },
    quantity: {
      type: Number,
      value: 1
    },
    imgageUrls: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    goodsList: [],
    selectedGoods: {},
    minusStatus: 'disabled' 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* 点击减号 */
    onBindMinus: function () {
      var quantity = this.data.quantity;
      // 如果大于1时，才可以减  
      if (quantity > 1) {
        quantity--;
      }
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = quantity <= 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        quantity: quantity,
        minusStatus: minusStatus
      });
    },
    /* 点击加号 */
    onBindPlus: function () {
      var quantity = this.data.quantity;
      // 不作过多考虑自增1  
      quantity++;
      // 只有大于一件的时候，才能normal状态，否则disable状态  
      var minusStatus = quantity < 1 ? 'disabled' : 'normal';
      // 将数值与状态写回  
      this.setData({
        quantity: quantity,
        minusStatus: minusStatus
      });
    },
    /* 输入框事件 */
    onBindManual: function (e) {
      var quantity = e.detail.value;
      // 将数值与状态写回  
      this.setData({
        quantity: quantity
      });
    },
    onSubmitSelectedGoods() {
      console.log(this.data);
      this.triggerEvent('chooseGoodsCommitEvent', { selectedGoods: this.data.selectedGoods, quantity: this.data.quantity });
    },

    onCheckboxChange(e) {
      let selectedGoods = e.currentTarget.dataset.item;
      // TODO 获取物品价格及库存检查
      if (selectedGoods.id != this.data.selectedGoods.id) {
        this.setData({
          selectedGoods:selectedGoods
        });
      }
    }
  },
  lifetimes: {
    ready: function() {
      goodsApi.getGoodDetailByProductId({productId: this.properties.productId, quantity: this.properties.quantity}, (res) => {
        let goodsList = res.data.data;
        console.log(res.data.data)
        for (let goods of goodsList) {
          for (let index in goods.fileIds) {
            goods.fileIds[index] = app.endpoint.file + '/goods/getFile?fileId=' + goods.fileIds[index]
          }
        }

        let selectedGoods = goodsList.filter(item => this.properties.selectedGoodsId==item.id)[0];
        this.setData({ ...this.data, ...this.properties, ...{ goodsList: goodsList, selectedGoods: selectedGoods } });
        console.log(this.data.goodsList)
      });
    },
    detached: () => console.log("退出")
  }
})
