const app = getApp();
// 登录
function login(params = {}, handleResult,) {
  wx.request({
    url: app.endpoint.dichan + '/login/wechart',
    data: params,
    header: {
      'bossId': app.globalData.bossId,
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 分类
function getCategoryByInfo(params = {}, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/findDownCategory',
    // url: app.endpoint.dichan + '/category/getCategoryByInfo',
    data: params,
    header: {
      'bossId': app.globalData.bossId,
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// wx.getStorageSync('userId')

function getCode(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/login/getCode',
    method: 'post',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 获取项目
function getRatation(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/project/getProject',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 轮播图
function getcarousel(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/ratation/getRatation',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 项目概况
function selectProject(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/company/selectProject',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 发送验证码 

function code(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/login/code',
    method: 'post',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 登录
function loginCode(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/login/loginCode',
    method: 'post',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 获取点赞数量
function findPraise(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/findPraise',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 点赞 
function categoryDetailPraise(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/categoryDetailPraise',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 获取评论
function findcategoryDetailComment(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/findcategoryDetailComment',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 评论
function categoryDetailComment(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/categoryDetailComment',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
//搜索
function getCategoryByNameOrLevel(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/getCategoryByNameOrLevel',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
//搜索
function getCategoryByNameOrLevel(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/category/getCategoryByNameOrLevel',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 获取项目概况富文本 和 获取类目详情
function selectText(params, handleResult) {
  wx.request({
    url: app.endpoint.dichan + '/company/selectText',
    data: params,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'bossId': app.globalData.bossId,
      // 'token': wx.getStorageSync('token')
    },
    success: res => handleResult(res),
    fail: (res) => {
      console.log(params, res);
    }
  });
}
// 获取类目详情
// function selectText(params, handleResult) {
//   wx.request({
//     url: app.endpoint.dichan + '/company/selectText',
//     data: params,
//     header: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'bossId': app.globalData.bossId,
//       // 'token': wx.getStorageSync('token')
//     },
//     success: res => handleResult(res),
//     fail: (res) => {
//       console.log(params, res);
//     }
//   });
// }
export default {
  login: login,
  getCategoryByInfo: getCategoryByInfo,
  getCode: getCode,
  getRatation: getRatation,
  getcarousel: getcarousel,
  selectProject:selectProject,
  code:code,
  loginCode:loginCode,
  findPraise:findPraise,
  categoryDetailPraise:categoryDetailPraise,
  findcategoryDetailComment:findcategoryDetailComment,
  categoryDetailComment:categoryDetailComment,
  getCategoryByNameOrLevel:getCategoryByNameOrLevel,
  selectText:selectText
};