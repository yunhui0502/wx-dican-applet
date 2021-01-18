// pages/tabbar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: -1,
    items: [
      {
        "iconPath": "../../static/loupan.png",
        "selectedIconPath": "../../static/loupan_remenl.png",
        "text": "项目概况"
      },
      {
        "iconPath": "../../static/shiyongshouce2.png",
        "selectedIconPath": "../../static/02.png",
        "text": "产品手册"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    console.log(e)
    // if (this.data.currentTab === e.target.dataset.current) {
    //   return false;
    // } else {
    //   that.setData({
    //     currentTab: e.target.dataset.current
    //   })
    // }
    if(e.target.dataset.current==0) {
      wx.reLaunch({
        url: '../general-situation-survey/index'
        // url: '../tabbar/index?currentTab=0'
      })
      //  // 设置导航栏为对应导航
      // wx.setNavigationBarTitle({
      //   title:'项目概况'
      // })
    }else {
      wx.reLaunch({
        url: '../TreeSelect/TreeSelect'
        // url: '../tabbar/index?currentTab=1'
      })
      //  // 设置导航栏为对应导航
      //  wx.setNavigationBarTitle({
      //   title:'项目信息'
      // })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.currentTab)
    this.setData({
      currentTab: options.currentTab
    })
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})