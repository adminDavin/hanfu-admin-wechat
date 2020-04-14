// components/star/star.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showModalStatus: false,
    tatle: "您对这次服务的评价",
    // 星星
    evaluate_contant: ['一', ],
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../img/wuxing1.png',
    selectedSrc: '../../img/wuxing.png',
    score: 0,
    scores: [0],
    evaluation:'　　',
    plain:true
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 星星颗数start
    // 提交事件
    submit_evaluate: function() {
      console.log('评价得分' + this.data.scores)
    },
    //点击星
    selectRight: function(e) {
      var score = e.currentTarget.dataset.score
      console.log(score)
      this.data.scores[e.currentTarget.dataset.idx] = score

      let evaluation = score == 1 ? '很不满意' : (score == 2 ? '不满意' : (score == 3 ? '一般' : (score == 4 ? '还不错' : (score == 5 ? '很满意' : ''))))

      this.setData({
        scores: this.data.scores,
        score: score,
        evaluation: evaluation
      })
    },
    // 星星颗数end
    // onLoad: function (options) {
    //   console.log(options.id)
    // },
    showBuyModal() {
      // 显示遮罩层
      var animation = wx.createAnimation({
        duration: 200,
        /**
         * http://cubic-bezier.com/ 
         * linear 动画一直较为均匀
         * ease 从匀速到加速在到匀速
         * ease-in 缓慢到匀速
         * ease-in-out 从缓慢到匀速再到缓慢
         * 
         * http://www.tuicool.com/articles/neqMVr
         * step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
         * step-end 保持 0% 的样式直到动画持续时间结束 一闪而过
         */
        timingFunction: "ease",
        delay: 0
      })
      this.animation = animation
      animation.translateY(300).step()
      this.setData({
        animationData: animation.export(), // export 方法每次调用后会清掉之前的动画操作。
        showModalStatus: true
      })
      setTimeout(() => {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export() // export 方法每次调用后会清掉之前的动画操作。
        })
        
      }, 200)
    },

    hideBuyModal() {
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
      setTimeout(function() {
        animation.translateY(0).step()
        this.setData({
          animationData: animation.export(),
          showModalStatus: false
        })
        // console.log(this)
      }.bind(this), 200)
    }


  }
})
