// pages/index/index.js
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
 const app = getApp();
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heightlimit:48,
    auto:{},
    activeList: [],
    phoneHeight:'',
    classify: false,

    indicatorDots: true, //面板指示点
    vertical: true, //是否纵向
    autoplay: false, //是否自动切换
    interval: 2000, //切换时间间隔
    duration: 500,  //滑动动画时长
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      heightlimit:app.globalData.height,
    })
    userApi.getcarousel({projectId:wx.getStorageSync('projectId'),type:'homePage'},(res) => {
      let arr = res.data.data;
      reuqestUtils.setImageUrls(arr);
      console.log(arr)
      this.setData({
        activeList:arr,
      });
    });
    this.setData({
      phoneHeight: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth,
    })
  },
  swichNav: function (e) {
    let that = this;
    console.log(e)
    if(e.target.dataset.current==0) {
      wx.reLaunch({
        url: '../general-situation-survey/index'
      })
    }else {
      wx.reLaunch({
        url: '../TreeSelect/TreeSelect'
      })
    }
  },
    autoImage: function (e) {
      console.log(e)
      var imageWidth = e.detail.width;
      var imageHeight = e.detail.height;
      var imagescale = imageWidth / imageHeight;
  
      var autoWidth = "";
      var autoHeight = "";
  
      wx.getSystemInfo({
        success: (res) => {
          autoWidth = res.windowWidth;
          autoHeight = autoWidth /  imagescale;
        },
      })
      var image = this.data.auto;
      image[e.target.dataset.index] = {
          width:autoWidth,
          height:autoHeight
      };
      console.log(image)
      console.log(e.target.dataset.index)
     this.setData({
       auto:image
     })
    },
    switchRightTab: function(e) {
      let id = e.target.dataset.id;
      console.log(id);
      this.setData({
        curNav: id
      });
    },
    classifyClick(){
      this.setData({
        classify: !this.data.classify
      });
    },
    navMasked () {
      this.setData({
        classify: !this.data.classify
      });
    },
    navClick(e){
      console.log(e.currentTarget.dataset.index)
      if(e.currentTarget.dataset.index==0){
        wx.reLaunch({
          url: '../general-situation-survey/index'
          // url: '../tabbar/index?currentTab=0'
        })
      } else {
        wx.reLaunch({
          url: '../TreeSelect/TreeSelect'
          // url: '../tabbar/index?currentTab=1'
        })
      }
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
    // wx.reLaunch({
    //   url: '../project/index'
    // })
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