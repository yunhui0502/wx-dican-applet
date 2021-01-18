// pages/seek/seek.js
const app = getApp();
import userApi from '../../services/hf-user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputval: '',
    list: [
    ],
  },
  // 搜索
  getsousuo(e) {
    var that = this;
    console.log(e)
    that.setData({
      inputval: e.detail.value
    })
    if (e.detail.value == '') { return }
    userApi.getCategoryByNameOrLevel( {projectId: wx.getStorageSync('projectId'),name:this.data.inputval}, (res) => {
			let arr=res.data.data;
			console.log(arr)
			this.setData({
        list:arr,
			});
		});
  },
  swiTab: function (e) {
    console.log(e.currentTarget.dataset)
      if (e.currentTarget.dataset.type== 2 ) {
        console.log('category')
        wx.navigateTo({   
          url:"../TreeS/index?id="+e.currentTarget.dataset.id
         });
      }else if(e.currentTarget.dataset.type== 4) {
        console.log('详情')
        wx.navigateTo({   
        url:"../design/design?id=" + e.currentTarget.dataset.id
       });
      } else {
        wx.navigateTo({   
          url:"../design/design?id=" + e.currentTarget.dataset.id
         });
      }
  },
  // 取消
  quxiao() {
    var that = this;
    that.setData({
      inputval: ''
    })
    wx.switchTab({
      url: '../seckill',
    })
  },
  onSeletedProduct: function (e) {
    console.log(e.currentTarget.dataset)
    let dataset = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/pages/product/detail?productId=' + dataset.id + '&stoneId=' + dataset.stoneId
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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