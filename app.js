
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
App({  
  globalData: {
    bossId:'1',
    height:48
  },
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        console.log(res.model)
        if (res.model.indexOf('iPhone X') >= 0) {
          this.globalData.height = 84
        }else if(res.model.indexOf('iPhone 11') >= 0) {
          this.globalData.height = 84
        }
        console.log(this.globalData.height)
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 46;
        console.log(this.globalData.navHeight, 'this.globalData.navHeight')
      }, fail(err) {
        console.log(err);
      }
    })
  },

  endpoint: {
    dichan: 'https://swcloud.tjsichuang.cn:1445/api/dichan',
    file: 'https://swcloud.tjsichuang.cn:1445/api/dichan',
    
  }
})