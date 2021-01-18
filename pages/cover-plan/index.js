// pages/activeList/activeList.js


import userApi from '../../services/hf-user.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:'',
    popup:'',
    curNav: 1,
    activeList: [],
    user: "",
    show: false,
    pingweishow: false,
    phoneHeight:'',
    control:true,
    cont:false,
    controlNo:true,
    auto:'',
    auto1:'',
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
   this.setData({
     auto:autoHeight
   })
  },

  switchRightTab: function(e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
      curNav: id
    });
  },
  
	swiTab1: function () {
    console.log(1)
		wx.switchTab({   
			url:"../building/building"
	});
	},
  showPopup() {
    console.log( this.popup)
    this.popup.showPopup();
  },
 
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.getCode();

  },
  onMyevent () {
    this.setData({
      control: false,
      cont: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      phoneHeight: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    this.popup = this.selectComponent("#popup");
     
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      phoneHeight: wx.getSystemInfoSync().windowHeight,
      width: wx.getSystemInfoSync().windowWidth
    })
    //获得popup组件
    this.popup = this.selectComponent("#popup");
     //5s后跳转
     this.data.Time = setInterval(() => {
      this.setData({
        time: --this.data.time
      })
      if (this.data.time <= 0) {
        clearInterval(this.data.Time)
        this.goHome()
      }
    }, 3000)
  },

  goHome() {
    clearInterval(this.data.Time)
    wx.reLaunch({
      url: '../project/index'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    console.log(that.data.user);
    wx.getStorage({
      key: "user",
      success: function(res) {
        console.log("缓存", res);
        that.setData({
          user: res.data.userId
        });
        that.list();
        console.log(that.data.user);
      },
      fail: function() {
        that.setData({
          show: true
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},
  swiTab () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
// pages/activeList/activeList.js
