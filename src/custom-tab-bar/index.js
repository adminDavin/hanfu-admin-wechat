const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#FF2929",
      list: [{
          pagePath: "/pages/home/index",
          iconPath: "/images/home.png",
          selectedIconPath: "/images/home-selected.png",
          text: "首页",
          isSpecial: false
        },
        {
          pagePath: "/pages/category/index",
          iconPath: "/images/category.png",
          selectedIconPath: "/images/category-selected.png",
          text: "分类",
          isSpecial: false
        },
        {
          pagePath: "/pages/discover/index",
          iconPath: "/images/discover.png",
          selectedIconPath: "/images/discover-selected.png",
          text: "发现",
          isSpecial: false
        },
        {
          pagePath: "/pages/shopping/index",
          iconPath: "/images/gouwus.png",
          selectedIconPath: "/images/gouwu.png",
          text: "购物车",
          isSpecial: true
        },
        // {
        //   pagePath: "",
        //   iconPath: "/images/gouwus.png",
        //   selectedIconPath: "/images/gouwu.png",
        //   text: "",
        //   isSpecial: false
        // },
        {
          pagePath: "/pages/myself/index",
          iconPath: "/images/myself.png",
          selectedIconPath: "/images/myself-selected.png",
          text: "我的",
          isSpecial: false
        }
      ],
    // 适配IphoneX的屏幕底部横线
    isIphoneX: app.globalData.isIphoneX
  },
  attached() {},
  methods: {
    switchTab(e) {
      let dataset = e.currentTarget.dataset;
      let path = dataset.path;
      let index = dataset.index;
      // 如果是特殊跳转界面
      console.log(dataset);
      if (this.data.list[index].isSpecial) {
        console.log(dataset);

        wx.navigateTo({
          url: path
        });
      } else {
        // 正常的tabbar切换界面
        wx.switchTab({
          url: path
        });
      }
    }
  }
})