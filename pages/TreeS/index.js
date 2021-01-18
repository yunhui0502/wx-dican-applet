
const app = getApp();
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
		ifPages:true,
		phoneHeight:'',
    curNav: 26,
    activeList: [],
    user: "",
    show: false,
		pingweishow: false,
		slist1:[
			// {
			// 	imageUrl:'../../static/img/14.jpg',
			// 	hfName:'规划及产品设计',
			// },
			// {
			// 	imageUrl:'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=129',
			// 	hfName:'建造标准',
			// },
			// {
			// 	imageUrl:'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=126',
			// 	hfName:'构造做法',
			// },
			// {
			// 	imageUrl:'../../static/img/3.jpeg',
			// 	hfName:'成本限额',
			// },
			// {
			// 	imageUrl:'../../static/img/9.jpg',
			// 	hfName:'装配式专篇',
			// },
			// {
			// 	imageUrl:'../../static/img/4.jpeg',
			// 	hfName:'绿建专篇',
			// },
			// { 
			// 	imageUrl:'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=125',
			// 	hfName:'静音住宅专篇',
			// },
			// { 
			// 	imageUrl:'../../static/img/6.jpeg',
			// 	hfName:'精装专篇',
			// },
			// {
			// 	imageUrl:'../../static/img/7.jpg',
			// 	hfName:'景观专篇',
			// },
			// {
			// }
		],
	},
	sousuo() {
		// wx.navigateTo({   
		// 	url:"../seek/seek"
		//  });
		this.setData({
			ifPages: false
		});
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
// 取消 
cancel() {
	this.setData({
		ifPages: true
	});
},
 // 新分类
bindtapclassify () {
   wx.navigateTo({   
			url:"../seek/seek"
		 });
},
pagesTab: function (e) {
	console.log(e.currentTarget.dataset)
		if (e.currentTarget.dataset.type== 2 ) {
			console.log('category')
			wx.navigateTo({   
				url:"../TreeS/index?id="+e.currentTarget.dataset.categoryId
			 });
		}else if(e.currentTarget.dataset.type== 4) {
			console.log('详情')
			wx.navigateTo({   
			url:"../design/design?id=" + e.currentTarget.dataset.categoryId
		 });
		} else {
			wx.navigateTo({   
				url:"../design/design?id=" + e.currentTarget.dataset.categoryId
			 });
		}
},
switchRightTab: function(e) {
		// this.setData({
		// 	loadingHidden: false
		// });
		console.log(e.target.dataset.id)
    let id = e.target.dataset.id;
		console.log(id);
		userApi.getCategoryByInfo( {parentCategoryId: id}, (res) => {
			let arr=res.data.data;
			reuqestUtils.setImageUrls(arr);
			console.log(arr)
			this.setData({
			 slist1:arr,
			//  loadingHidden: true
			});
		});
    this.setData({
      curNav: id
    });
	},
	swiTab: function (e) {
		userApi.getCategoryByInfo({parentCategoryId: e.currentTarget.dataset.item.categoryId,}, (res) => {
			let arr=res.data.data;
			console.log(arr)

			if (e.currentTarget.dataset.item.type=='2') {
				console.log('category')
				wx.navigateTo({   
					url:"../TreeS/index?id="+e.currentTarget.dataset.item.categoryId
				 });
			}else if (e.currentTarget.dataset.item.type=='4'){
				console.log('详情')
				wx.navigateTo({   
				url:"../design/design?params=" + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item)) 
			 });
			} else {
				wx.showToast({
					title: '暂无详情或类目',
					icon: 'success',
					duration: 2000
				})
			}
		});
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
		this.setData({
			loadingHidden: false
		});

		console.log(options)

		 userApi.getCategoryByInfo( {parentCategoryId:options.id,projectId:'1'}, (res) => {
			let arr = res.data.data;
			console.log(arr)
			userApi.getCategoryByInfo( {parentCategoryId:arr[0].categoryId}, (res) => {
				let arr=res.data.data;
				reuqestUtils.setImageUrls(arr);
				console.log(arr)
				this.setData({
				 slist1:arr,
				 loadingHidden: true
				});
			});
			this.setData({
				activeList:arr,
			});
		 
		});
		this.setData({
      phoneHeight: wx.getSystemInfoSync().windowHeight-48,
      width: wx.getSystemInfoSync().windowWidth
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

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
