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
    curNav: 1,
    activeList: [],
		slist1:[],
  },

  /* 组件声明周期函数 */
  lifetimes: {
    
    attached: function () {
      setTimeout(() => {
        userApi.getCategoryByInfo( {parentCategoryId:'-1',projectId:'1'}, (res) => {
          let arr=res.data.data.list;
          console.log(arr)
          userApi.getCategoryByInfo( {parentCategoryId:arr[0].id}, (res) => {
            let arr=res.data.data.list;
            reuqestUtils.setImageUrls(arr);
            console.log(arr)
            this.setData({
             slist1:arr,
            });
          });
          this.setData({
            activeList:arr,
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
    switchRightTab: function(e) {
      let id = e.target.dataset.id;
      console.log(id);
      userApi.getCategoryByInfo( {parentCategoryId: id}, (res) => {
        let arr=res.data.data.list;
        reuqestUtils.setImageUrls(arr);
        console.log(arr)
        this.setData({
         slist1:arr,
        });
      });
      this.setData({
        curNav: id
      });
    },
    sousuo() {
      wx.navigateTo({   
        url:"../seek/seek"
       });
    },
    swiTab: function (e) {
      userApi.getCategoryByInfo({parentCategoryId: e.currentTarget.dataset.item.id,}, (res) => {
        let arr=res.data.data;
        console.log(arr)
  
        if (arr.type=='category') {
          console.log('category')
          wx.navigateTo({   
            url:"../TreeS/index?id="+e.currentTarget.dataset.item.id
           });
        }else {
          console.log('详情')
          wx.navigateTo({   
          url:"../design/design?id=" + e.currentTarget.dataset.item.id
         });
        }
      });
    }
  }
  
})