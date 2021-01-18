// pages/login/login.js
const app = getApp();

import userApi from '../../services/hf-user.js';
import util from '../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false,
    mobile:'',
    code:'',
    btntxt: '获取验证码',
    timer:"",
    disabled:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: (res) => {
              this.setData({ isAuth: true, userInfo: res.userInfo });
            }
          });
        } else {
          this.setData({ isAuth: false });
        }
      }
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
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      wx.setStorageSync('isAuth', true);
      wx.setStorageSync('userInfo', e.detail.userInfo);
      this.setData({isAuth: true, userInfo: e.detail.userInfo });
    } else {
      // 用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      });
    }
  },

  onWechartLogin: function(e) {
    wx.login({
      success: (res) => {
        let code = res.code;
        if (res.code) {
        wx.getUserInfo({
          success: (res) => userApi.login({
              code: code,
              encryptedData: res.encryptedData,
              iv: res.iv,
            }, (response) => {
              let result = response.data.data;
              result.isBindPhone = util.isEmpty(result.user.phone);
              result.isAuth = true;
              result.userInfo = res.userInfo;
              console.log(result);
              wx.setStorageSync("userId", result.userId);
              wx.getStorage({
                key: 'userId',
                success: function (res) {
                  console.log(res);
                },
              });
              wx.setStorageSync("token", result.token);
              wx.getStorage({
                key: 'token',
                success: function (res) {
                  console.log(res);
                },
              });
              this.setData(result);
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000
              })
              // 返回上一页
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              // beforePage.getAddress();//触发父页面中的方法
              wx.navigateBack({
                delta: 1,
              })
            }), 
        });
      } else {
        console.log('登录失败！' + res.errMsg)
          wx.showToast({
            title: '登录失败！',
            icon: 'none',
            duration: 2000
          })
      }
      }
    });
  },
  // 输入框事件
  bindModel(e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    });
  },
  bindCode(e) {
    console.log(e.detail.value)
    this.setData({
      code: e.detail.value
    });
  },
  code () {
    // clearInterval(this.timer);
    if (!/^1[3456789]\d{9}$/.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号码格式错误',
        icon: 'none',
      });
      return;
    }else if(this.data.disabled=='true'){
      let time = 60;
      this.timer = setInterval(() => {
        console.log(1);
        if (time === 0) {
          clearInterval(this.timer);
          this.setData({
            btntxt: '获取验证码',
            disabled:'true'
            });
        } else {
          this.setData({
            btntxt: time + '秒后重试',
            disabled:'false'
            });
          time--;
        }
        // eslint-disable-next-line no-magic-numbers
      }, 1000);
      userApi.code( {phone: this.data.mobile}, (res) => {
        let arr=res.data.data;
        console.log(arr)
        if (arr=='手机号有误'){
          wx.showToast({
            title: '手机号有误!',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.setData({
        //  code:arr,
        });
      });
    }
	
  },
  logining() {
    userApi.loginCode( {phone: this.data.mobile,passwd: this.data.code}, (res) => {
      console.log(res)
      if  ( res.data.data =='验证码不正确') {
        wx.showToast({
          title: '验证码有误!',
          icon: 'none',
          duration: 2000
        })
        return
      }
	     if(res.statusCode==200 && res.data.data !=='验证码不正确') {
        var data =res.data.data
        wx.setStorageSync("useData", data[0]);
        wx.getStorage({
          key: 'useData',
          success: function (res) {
            console.log(res);
          },
        });
        var pages = getCurrentPages();
        var beforePage = pages[pages.length - 2];
        // beforePage.getAddress();//触发父页面中的方法
        wx.navigateBack({
          delta: 1,
        })
        console.log(wx.getStorageSync('useData').id)
       }else if(res.statusCode==401){
        wx.showToast({
          title: '无访问权限!',
          icon: 'none',
          duration: 2000
        })
       }else {
        console.log('登录失败！' + res.errMsg)
        wx.showToast({
          title: '登录失败！',
          icon: 'none',
          duration: 2000
        })
       }
		});
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
    clearInterval(this.timer);
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