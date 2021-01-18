// // component/index/index.js
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },

  /* 组件的初始数据 */
  data: {
    auto:{},
    activeList: [],
    phoneHeight:'',

    indicatorDots: true, //面板指示点
    vertical: true, //是否纵向
    autoplay: false, //是否自动切换
    interval: 2000, //切换时间间隔
    duration: 500  //滑动动画时长
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      setTimeout(() => {
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
          width: wx.getSystemInfoSync().windowWidth
        })
      }, 0);
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
 
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

  }

})
// const order = ['demo1', 'demo2', 'demo3']

// Page({
//   onShareAppMessage() {
//     return {
//       title: 'scroll-view',
//       path: 'page/component/pages/scroll-view/scroll-view'
//     }
//   },

//   data: {
//     toView: 'green'
//   },

 


// })