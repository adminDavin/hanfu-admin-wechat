// src/pages/product/detail.js
const app = getApp();

import productApi from '../../services/hf-product.js';
import goodsApi from '../../services/hf-goods.js';
import util from '../../utils/util.js';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        current: 0,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 800,
        circular: true,
        selectedGoods: {},
        quantity: 1,
        product: {},
        showModalSelectionSpecification: false,
        showModalCreateOrder: false,
        showModalShopPayment: false


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                options.scrollH = scrollH;
                options.imgWidth = imgWidth;
                this.setData({ ...this.data, ...options });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        let productId = this.data.productId;
        if (typeof (productId) == 'undefined') {
            wx.showToast({
                title: '商品ID不存在',
                icon: 'warn',
                duration: 2000,
                mask: true
            });
        } else {
            productApi.getProductDetail(productId, (res) => {
                let product = res.data.data;
                this.updateSelectedGoods(product.defaultGoodsId, product);
            })
        }
    },

    updateSelectedGoods: function (goodsId, product) {
        goodsApi.getGoodsDetail({ goodsId: goodsId, quantity: this.data.quantity }, (res) => {
            let goods = res.data.data;
            let imgageUrls = [];

            for (let fileId of goods.fileIds) {
                imgageUrls.push(app.endpoint.file + '/goods/getFile?fileId=' + fileId);
            }
            this.setData({ product: product, imgageUrls: imgageUrls, selectedGoods: goods });
        });
    },
    onSelectedGoodsSpec: function (e) {
        let animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        });
        this.animation = animation;
        animation.translateY(300).step();

        console.log(e.currentTarget.dataset);
        if (e.currentTarget.dataset.type == "selectionSpecification") {
            this.setData({
                animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
                showModalSelectionSpecification: true
            });
        } else if (e.currentTarget.dataset.type == "createOrder") {
            this.setData({
                animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
                showModalCreateOrder: true
            });

        } else if (e.currentTarget.dataset.type == "shopPayment") {
            this.setData({
                animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
                showModalShopPayment: true
            });
        }
        setTimeout(() => {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()  // export 方法每次调用后会清掉之前的动画操作。
            });
            console.log(this.data);
        }, 200);
    },
    onCloseGoodsSpec: function (e) {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "ease",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function () {
            animation.translateY(0).step();
            if (e.currentTarget.dataset.type == "selectionSpecification") {
                this.setData({
                    animationData: animation.export(),
                    showModalSelectionSpecification: false
                });
            } else if (e.currentTarget.dataset.type == "createOrder") {
                this.setData({
                    animationData: animation.export(),
                    showModalCreateOrder: false
                });
            } else if (e.currentTarget.dataset.type == "shopPayment") {
                this.setData({
                    animationData: animation.export(),
                    showModalShopPayment: false
                });
            }
            console.log(this)
        }.bind(this), 200)
    },
    listenChooseGoodsCommitEvent: function (e) {
        e.currentTarget.dataset.type = "selectionSpecification";
        this.setData(e.detail);
        this.onCloseGoodsSpec(e);
    },
    onConfirmSelectedGoods: function (e) {
        this.onCloseGoodsSpec(e);
        if (util.isEmpty(wx.getStorageSync('userId'))) {
            wx.navigateTo({
                url: '/pages/login/index',
            });

        } else {
            let userId = wx.getStorageSync('userId');
            let paymentType = e.currentTarget.dataset.type;
            console.log(this.data.selectedGoods, paymentType);
            let params = {
                selectedGoods: this.data.selectedGoods,
                paymentType: paymentType,
                userId: userId
            };
            wx.navigateTo({
                url: '/pages/payment/index?params=' + encodeURIComponent(JSON.stringify(params))
            });
        }
    }

})