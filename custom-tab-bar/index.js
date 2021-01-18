Component({
  data: {
    selected: 0,
    iPhoneX: false,
    color: "#7A7E83",
    selectedColor: "#FB7C3D",
    list: [{
      "pagePath": "/pages/general-situation-survey/index",
      "iconPath": "/image/loupan.png",
      "selectedIconPath": "/image/loupan_remenl.png",
      "text": "项目概况"
    },
    {
      "pagePath": "/pages/TreeSelect/TreeSelect",
      "iconPath": "/image/shiyongshouce2.png",
      "selectedIconPath": "/image/02.png",
      "text": "产品手册"
    }]
  },
  attached() {
    var self = this
    wx.getSystemInfo({
      success(res) {
        console.log(res.model)
        if (res.model.indexOf('iPhone X') >= 0) {
          self.setData({
            iPhoneX: true
          })
        }
      }
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})