// components/product/chosen-spec/index.js
const app = getApp();

import productApi from '../../../services/hf-product.js';
import goodsApi from '../../../services/hf-goods.js';
import car from '../../../services/car.js';
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
    },
    activityId: {
      type: Number,
      value: 0
    },
    groupId: {
      type: Number,
      value: 0
    },
    accession: {
      type: String,
      value: ''
    },
    stoneId: {
      type: String,
      value: ''
    },
    instanceId: {
      type: String,
      value: ''
    },
    stoneName: {
      type: String,
      value: ''
    },
    competitive: {
      type: String,
      value: 'false'
    },
     dataType: {
      type: String,
      value: ''
    },
    groupActivity: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    accessions: '',
    goodsList: [],
    selectedGoods: {},
    minusStatus: 'disabled'
  },
  /**
    * 生命周期函数--监听页面加载
    */
  onShow: function (options) {
    console.log('12333')
    that.setData({
      accessions: this.properties.accession
    })
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
    // 加入购物车
    addcar: function () {
      console.log(this.data.selectedGoods.id);
      console.log(wx.getStorageSync('userId'))
      console.log(this.data.quantity);
      console.log(this.properties.dataType);
      var that = this;
      let obj = {
        type: 0,
        goodsId: this.data.selectedGoods.id,
        num: that.data.quantity,
        userId: wx.getStorageSync('userId'),
        stoneId: that.data.stoneId,
      }
      console.log(obj)
      car.addcar(obj, (res) => {
        console.log(res);
        if (res.data.data == "成功加入购物车") {
          wx.showToast({
            title: '加入购物车成功',
          })
        } else {
          wx.showToast({
            title: '加入购物车失败',
            icon: 'none'
          })
        }
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
      console.log(this.properties.selectedGoodsId);
      if (this.properties.groupId !== 0) {
        this.data.selectedGoods.groupid = this.properties.groupId
      }
      console.log(this.data.selectedGoods)
      let that = this
      // TODO 获取物品价格及库存检查
      console.log('活动ID', that.properties.activityId)
      console.log('团购活动ID', that.properties.groupId)
      console.log('instanceId', this.properties.instanceId)
      console.log('校验')
      let params = {
        instanceId: this.properties.instanceId,
        activityId: this.properties.activityId,
        GoodsNum: this.data.quantity,
        goodsId: this.data.selectedGoods.id
      }
      productApi.checkResp(params, (res) => {
        console.log(res)
        console.log(res.data.data, 'dfddsfsafd');
        if (res.data.data == 'understock') {
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          });
          return
        }
        that.setData({
          selectedGoods: res.data.data,
        });
        that.data.selectedGoods.sellPrice = res.data.data.money
        console.log(that.data.selectedGoods)
        console.log('参加拼团', that.properties.accession)
        console.log('参加拼团data', that.data.accession)
        if (that.data.accession == 'accession') {
          console.log('跳订单页')
          console.log(this.data.selectedGoods)
          // 创建订单
          console.log(this.data.groupActivity)
          let params = {
            selectedGoods: this.data.selectedGoods,
            userId: wx.getStorageSync('userId'),
            stoneId: this.data.stoneId,
            groupActivity: this.data.groupActivity,
            activityId: that.properties.activityId,
            quantity: this.data.quantity,
            groupid: that.properties.groupId
          };
          console.log(params)
          wx.navigateTo({
            url: '/pages/payment/index?params=' + encodeURIComponent(JSON.stringify(params))
          });
        } else {
          // console.log(this.data.quantity)
          console.log(this.data.competitive)
          console.log(this.properties.groupActivity)
          // console.log(this.data.instanceId)
          let params = {
            selectedGoods: this.data.selectedGoods,
            paymentType: 'createOrder',
            userId: wx.getStorageSync('userId'),
            stoneId: this.data.stoneId,
            groupActivity: this.properties.groupActivity,
            activityId: that.properties.activityId,
            quantity: this.data.quantity,
            competitive: this.data.competitive,
            stoneName: this.data.stoneName,
            instanceId: this.data.instanceId
          };
          console.log(params);
          wx.navigateTo({
            url: '/pages/payment/index?params=' + encodeURIComponent(JSON.stringify(params))
          });
        }
      })
      
      this.triggerEvent('chooseGoodsCommitEvent', { selectedGoods: this.data.selectedGoods, quantity: this.data.quantity });
    },

    onCheckboxChange(e) {
      let that = this
      let selectedGoods = e.currentTarget.dataset.item
      // TODO 获取物品价格及库存检查
      console.log(e.currentTarget.dataset.item)
      console.log('活动ID', this.properties.activityId)
      console.log('instanceId', this.properties.instanceId)
      console.log('校验')
      console.log('校验')
      let params = {
        instanceId: this.properties.instanceId,
        activityId: this.properties.activityId,
        GoodsNum: this.data.quantity,
        goodsId: selectedGoods.id
      }
      productApi.checkResp(params, (res) => {
        console.log(res)
        console.log(res.data.data, 'dfddsfsafd');
        if (res.data.data == 'understock') {
          wx.showToast({
            title: '库存不足',
            icon: 'none'
          });
          that.setData({
            quantity: 1
          });
          console.log(that.data.quantity)
        } else {
          that.setData({
            selectedGoods: selectedGoods,
          });
          that.data.selectedGoods.sellPrice = res.data.data.money
          console.log(that.data.selectedGoods)
        }
      })
    }
  },
  lifetimes: {
   
    ready: function () {
      goodsApi.getGoodDetailByProductId({ productId: this.properties.productId, quantity: '1', stoneId: this.properties.stoneId, activityId: this.properties.activityId }, (res) => {
        let goodsList = res.data.data;
        console.log(res.data.data)
        for (let goods of goodsList) {
          for (let index in goods.fileIds) {
            console.log(index)
            goods.fileIds[index] = app.endpoint.file + '/goods/getFile?fileId=' + goods.fileIds[index]
          }
          goods.hfNames=[]
          for (let index in goods.hfGoodsSpecs) {
            console.log(index)
            goods.hfNames.push(goods.hfGoodsSpecs[index].hfValue + ':' + goods.hfGoodsSpecs[index].hfName)
          }
          goods.hfNames=goods.hfNames.join(" | ")
        }
       
        let selectedGoods = goodsList.filter(item => this.properties.selectedGoodsId == item.id)[0];
        this.setData({ ...this.data, ...this.properties, ...{ goodsList: goodsList, selectedGoods: selectedGoods } });
        console.log(this.data.goodsList)
      });
    },

    detached: function () {
      console.log("退出")
      this.setData({
        accession: ''
      });
      console.log(this.data.accession)
    }
  }
})
