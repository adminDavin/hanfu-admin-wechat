// const app = getApp()
Page({
    data: {
        cateItems: [{
                cate_id: 1,
                cate_name: "一级分类",
                ishaveChild: true,
            },
            {
                cate_id: 2,
                cate_name: "一级分类",
                ishaveChild: true,
            },
            {
                cate_id: 3,
                cate_name: "一级分类",
                ishaveChild: true,
            }
        ],
        curNav: 1,
        curIndex: 0
    },
    //事件处理函数  
    switchRightTab: function(e) {
        // 获取item项的id，和数组的下标值  
        let id = e.target.dataset.id,
            index = parseInt(e.target.dataset.index);
            console.log(index)
        // 把点击到的某一项，设为当前index  
        this.setData({
            curNav: id,
            curIndex: index
        })
    }
})