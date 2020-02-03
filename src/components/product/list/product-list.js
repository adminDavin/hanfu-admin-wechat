// components/product/list/product-list.js

const app = getApp();
import productApi from '../../../services/hf-product.js';
import util from '../../../utils/util.js';
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
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
        rotationQuantity: 3,
        chosenData: [],
        loadingCount: 0,
        scrollH: 0,
        imgWidth: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPullDownRefresh: function (e) {
            console.log(e);
        },
        onSeletedProduct: function (e) {
            let selected = e.currentTarget.dataset.item;
            wx.navigateTo({
                url: '/pages/product/detail?productId=' + selected.id
            });
        },
        loadImages: function () {},
       
    },

    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            productApi.getProductForRotation(this.data.rotationQuantity, (res) => {
                let products = res.data.data;
                for (let product of products) {
                    if (util.isRealNum(product.fileId)) {
                        product.imageUrl = app.endpoint.file + '/goods/getFile?fileId=' + product.fileId;
                        product.newPrice = typeof (product.priceArea) == 'undefined' ? '商品异常' : "￥" + product.priceArea;
                        product.oldPrice = 500;
                        product.discount = 7;
                    }
                }
                console.log(products);
                this.setData({
                    chosenData: products,
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