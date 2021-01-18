// pages/project/index.js
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';

var model = require('../../model/model.js')

var show = false;
var item = {};

Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneHeight:'',
    phoneHeight2:'',
    Itemslist:'',
    item: {
      show: show
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.setData({
      phoneHeight: wx.getSystemInfoSync().windowHeight,
    })
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
   //点击选择城市按钮显示picker-view
   translate: function (e) {
    model.animationEvents(this, 0, true,400);  
  },
    //隐藏picker-view
    hiddenFloatView: function (e) {
      console.log("id = " + e.target.dataset.id)
      model.animationEvents(this, 200, false,400);
      //点击确定按钮更新数据(id=444是背后透明蒙版 id=555是取消按钮)
      if (e.target.dataset.id == 666){
        this.updateShowData()
      }
    },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    //如果想滑动的时候不实时更新，只点确定的时候更新，注释掉下面这行代码即可。
    this.updateShowData()
  },
  //更新顶部展示的数据
  updateShowData:function(e){
    item = this.data.item;
      if (item.citys[item.value[1]].name!= '天津公司') {
        wx.showToast({
					title: '暂无数据更新',
					icon: 'success',
					duration: 2000
				})
      }
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideHomeButton()
    userApi.getRatation({},(res) => {
      let arr = res.data.data;
      reuqestUtils.setImageUrls(arr);
      this.setData({
        Itemslist:arr,
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

	// swiTab: function () {
	// 		wx.navigateTo({   
	// 			url:"../manual/manual"
  //     })
  // },
  goHome(e) {
    console.log(wx.getStorageSync('useData'))
    if(wx.getStorageSync('useData')=='') {
      wx.navigateTo({   
        url:"../login/login"
      })
    }else {
      wx.setStorageSync("projectId", e.currentTarget.dataset.id);
      wx.getStorage({
        key: 'projectId',
        success: function (res) {
          console.log(res);
        },
      });
      clearInterval(this.data.Time)
      // wx.reLaunch({
      //   url: '../tabbar/index?currentTab=-1'
      // })
      wx.navigateTo({   
        url:"../index/index"
			 });
    }
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