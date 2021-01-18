var app = getApp();
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
Component({
  
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Car'
    }
  },

  /* 组件的初始数据 */
  data: {
    Urllist:'',
    auto:{},
    htmlSnip:''
  },

  /* 组件声明周期函数 */
  lifetimes: {
    
    attached: function () {
      setTimeout(() => {
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
      }, 20);
  
    },
    moved: function () { 

    },
    detached: function () { 
      console.log('3')

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
  }
  
})