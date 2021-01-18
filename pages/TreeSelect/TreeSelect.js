
const app = getApp();
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
		height:48,
		inputval: '',
		phoneHeight:'',
    curNav: 1,
    activeList: [],
    user: "",
		show: false,
		ifPages:true,
		pingweishow: false,
		slist1:[],
		slist2:[
			{
				imageUrl:'../../static/img/13.jpg',
				hfName:'建筑设计',
			},
			{
				imageUrl:'../../static/img/8.jpg',
				hfName:'材料部品',
			},
			{
				imageUrl:'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=130',
				hfName:'构造做法',
			},
			{
				imageUrl:'../../static/img/9.jpg',
				hfName:'装配式专篇',
			},
			{
				imageUrl:'../../static/img/15.jpg',
				hfName:'绿建专篇',
			},
			{
				imageUrl:'../../static/img/6.jpeg',
				hfName:'精装专篇',
			},
			{
				imageUrl:'',
				hfName:'',
			}
		],
		slist3:[
			{
				imageUrl:'https://www.tjsichuang.cn:1443/api/product/goods/getFile?fileId=124',
				hfName:'设计篇',
			},
			{
				imageUrl:'../../static/img/10.jpg',
				hfName:'构造专篇',
			},
			{
				imageUrl:'../../static/img/11.jpg',
				hfName:'防水专篇',
			},
			{
			}
		]
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
		let arr = res.data.data;
		console.log(arr)
		this.setData({
			list: arr,
		});
	});
},
// 取消 
cancel() {
	this.setData({
		ifPages: true,
		inputval:'',
		list:[],
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
	e.currentTarget.dataset.item.id = e.currentTarget.dataset.item.categoryId
		if (e.currentTarget.dataset.type== 2 ) {
			console.log('category')
			wx.navigateTo({   
				url:"../TreeS/index?id="+e.currentTarget.dataset.id
			 });
		}else if(e.currentTarget.dataset.type== 4) {
			console.log('详情')
			wx.navigateTo({
				url:"../design/design?params=" + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item))
		 });
		} else {
			wx.navigateTo({  
				url:"../design/design?params=" + encodeURIComponent(JSON.stringify(e.currentTarget.dataset.item))
			 });
		}
},
  switchRightTab: function(e) {
		// this.setData({
		// 	loadingHidden: false
		// });
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
	sousuo() {
		this.setData({
			ifPages: false
		});
	},
	swiTab: function (e) {
		userApi.getCategoryByInfo({parentCategoryId: e.currentTarget.dataset.item.categoryId,}, (res) => {
			let arr=res.data.data;
			console.log()

			if (e.currentTarget.dataset.item.type=='2') {
				console.log('category')
				wx.navigateTo({
					url:"../TreeS/index?id="+e.currentTarget.dataset.item.categoryId
				 });
			}else if(e.currentTarget.dataset.item.type=='4'){
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
	activeNav(e) {
	
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {;
		this.setData({
			loadingHidden: false,
			height:app.globalData.height,
		});
		// var hasClike = false;
		// if(hasClike){
		// 	return;
		// }
		// hasClike=true;
		// wx.showLoading({
		// 		title: '正在加载中',
		// });

		console.log(1)

		 userApi.getCategoryByInfo( {parentCategoryId:'-1',projectId:'1'}, (res) => {
			let arr=res.data.data;
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
		let Height=wx.getSystemInfoSync().windowHeight
		console.log(Height-48)
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
		this.getTabBar().setData({
      selected: 1
    })
  },
  homePage () {
		wx.reLaunch({
			url: '../index/index'
		})
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
