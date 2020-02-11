const app = getApp();
import util from '../utils/util.js';


function activeTabBar(mine, index) {
  if (typeof mine.getTabBar === 'function' && mine.getTabBar()) {
    mine.getTabBar().setData({ selected: index });
  }
}

function adjustSystemInfo(mine) {
  wx.getSystemInfo({
    success: (res) => {
      let ww = res.windowWidth;
      let wh = res.windowHeight;
      let imgWidth = ww * 0.48;
      let scrollH = wh;

      mine.setData({
        winWidth: res.windowWidth,
        winHeight: res.windowHeight,
        scrollH: scrollH,
        imgWidth: imgWidth
      });
    }, fail: (res) => {
      console.log(res);
      mine.setData({
        winWidth: 0,
        winHeight: 0,
        scrollH: 0,
        imgWidth: 0
      });
    }
  });
}

export default {
  activeTabBar: activeTabBar,
  adjustSystemInfo: adjustSystemInfo
};