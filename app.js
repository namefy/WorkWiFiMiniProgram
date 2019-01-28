//app.js
var qcloud = require('wafer-client-sdk/index.js');
var config = require('config.js');
App({
  onLaunch: function() {
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '../auth/auth',
          })
        } else {
          that.login();
        }
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        that.globalData.systemInfo = res;
        if (res.system.includes('iOS')) {
          that.globalData.iPhone = true;
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    iPhone: false,
    systemInfo: {}
  },
  login: function() {
    qcloud.setLoginUrl(config.service.init.url);
    qcloud.login({
      success: res => {
        console.log('登陆成功');
      },
      fail: err => {
        console.log('登陆失败', err);
      }
    })
  }
})