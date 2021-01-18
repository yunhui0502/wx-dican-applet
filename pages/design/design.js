// pages/design/design.js
import userApi from '../../services/hf-user.js';
import reuqestUtils from '../../services/request-utils.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auto:{},
    activeList: [],
    countList:{
      count: 0,
      isPraise: 2
    },
    count:0,
    form:{
      categoryDetailId:'',
      comment:'',
      type:'categoryDetail',
      userId:'',
      parentCommtentId:'-1',
      typeContent:'heart',
    },
    commentList:[],
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(decodeURIComponent(options.params))
   console.log(params)
   this.setData({
    'form.categoryDetailId':params.categoryDetailId
  })
  // //  获取详情
  //  userApi.getCategoryByInfo( {parentCategoryId:options.id}, (res) => {
  //   let arr=res.data.data.list;
  //   reuqestUtils.setImageUrls(arr);
  //   if(arr[0].categoryDetailId !== undefined) {
  //     //  获取点赞数量
  //     userApi.findPraise( {categoryDetailId:arr[0].categoryDetailId,userId:wx.getStorageSync('useData').id}, (res) => {
  //       let arr=res.data.data;
  //       console.log('获取点赞数量',arr)
  //       this.setData({
  //         countList:arr,
  //       });
  //     });
  //       //  获取评论
  //       userApi.findcategoryDetailComment({categoryDetailId:arr[0].categoryDetailId}, (res) => {
  //         let arr=res.data.data.list;
  //         console.log('获取评论',arr)
  //         this.setData({
  //           commentList:arr,
  //           count:res.data.data.count
  //         });
  //       });
  //   }
  //   console.log(arr)
  //   this.setData({
  //     activeList:arr,
  //   });
  // });
  //  获取详情
  userApi.selectText( {projectId:params.categoryId,type:'category'}, (res) => {
    let arr=res.data.data;
    arr = arr.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ')
          .replace(/px;/g,'rpx;')
          .replace(/<section/g, '<div').replace(/\/section>/g, '/div>');
        console.log('富文本',arr)
        this.setData({
          htmlSnip: arr,
        });
  });
       //  获取点赞数量
       userApi.findPraise( {categoryDetailId:this.data.form.categoryDetailId,userId:wx.getStorageSync('useData').id}, (res) => {
        let arr=res.data.data;
        console.log('获取点赞数量',arr)
        this.setData({
          countList:arr,
        });
      });
        //  获取评论
        userApi.findcategoryDetailComment({categoryDetailId:this.data.form.categoryDetailId}, (res) => {
          let arr=res.data.data.list;
          console.log('获取评论',arr)
          this.setData({
            commentList:arr,
            count:res.data.data.count
          });
        });
  },

  Praise () {
    userApi.categoryDetailPraise( {categoryDetailId:this.data.form.categoryDetailId,userId:wx.getStorageSync('useData').id ,type:'categoryDetail'}, (res) => {

      userApi.findPraise( {categoryDetailId:this.data.form.categoryDetailId,userId:wx.getStorageSync('useData').id}, (res) => {
        let arr=res.data.data;
        console.log('获取点赞数量',arr)
        this.setData({
          countList:arr,
        });
      });

    });
  },
  pingjia () {
    this.data.form.categoryDetailId = this.data.form.categoryDetailId
    this.data.form.userId = wx.getStorageSync('useData').id
    userApi.categoryDetailComment(this.data.form , (res) => {
    console.log(res)
        this.setData({
          'form.comment':''
        });
     //  获取评论
        userApi.findcategoryDetailComment({categoryDetailId:this.data.form.categoryDetailId}, (res) => {
          let arr=res.data.data.list;
          console.log('获取评论',arr)
          this.setData({
            commentList:arr,
            count:res.data.data.count
          });
        });

    });
  },
  bind (e) {
   console.log(e.detail.value)
    this.setData({
      'form.comment':e.detail.value,
    });
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