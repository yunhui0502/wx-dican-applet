// pages/general-situation-survey/index.js
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Urllist:'',
    auto:{},
    htmlSnip:'',
    height:48
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      height:app.globalData.height,
    });
     // userApi.selectProject({projectId:wx.getStorageSync('projectId'),type:'general'},(res) => {
        //   let arr = res.data.data;
        //   reuqestUtils.setImageUrls(arr);
        //   console.log(arr)
        //   this.setData({
        //     Urllist:arr,
        //   });
        // });
        userApi.selectText({projectId:wx.getStorageSync('projectId'),type:'general'},(res) => {
          let arr = res.data.data;
          arr = arr.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
          .replace(/px;/g,'rpx;')
          .replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
          // reuqestUtils.setImageUrls(arr);
          console.log(arr)
          this.setData({
            htmlSnip:arr,
          });
        });
  },
  homePage () {
     wx.reLaunch({
        url: '../index/index'
      })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getTabBar().setData({
      selected: 0
    })
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