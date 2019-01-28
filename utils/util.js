var qcloud = require('../wafer-client-sdk/index.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var showTip = msg => {
  wx.showToast({
    title: msg,
    icon: 'none'
  });
};
var showSuccess = msg => {
  wx.showToast({
    title: msg
  });
};

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
};

//重构request请求
const request = function(url, data, method, {
  successFN = () => {},
  failFN = () => {},
  completeFN = () => {}
}, showLoading = true) {
  if (showLoading) {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
  }
  qcloud.request({
    url: url,
    data: data,
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        successFN(res.data);
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        wx.showModal({
          title: '错误提示',
          content: res.data,
          showCancel: false,
          success: (res) => {
            failFN();
          }
        })
      } else if (res.statusCode >= 500 && res.statusCode < 600) {
        wx.showModal({
          title: '异常提示',
          content: res.data,
          showCancel: false,
          success: (res) => {
            failFN();
          }
        })
      }
    },
    fail: function(res) {
      console.error(res);
      wx.showModal({
        title: '请求失败',
        content: res.errMsg,
        showCancel: false
      })
    },
    complete: function(res) {
      completeFN();
      setTimeout(() => {
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }, 500);

    },
  });
};
//重构局域网的request请求
const requestLAN = function(url, data, method, {
  successFN = () => {},
  failFN = () => {},
  completeFN = () => {}
}, showLoading = true) {
  if (showLoading) {
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
  };
  wx.request({
    url: url,
    data: data,
    method: method,
    success: function(res) {
      successFN(res.data);
    },
    fail: function(res) {
      console.error(res.errMsg);
      failFN(res);
    },
    complete: function(res) {
      completeFN();
      setTimeout(wx.hideLoading, 500);
      wx.stopPullDownRefresh();
    },
  });

};


module.exports = {
  formatTime: formatTime,
  showTip: showTip,
  showSuccess: showSuccess,
  randomNum: randomNum,
  request: request,
  requestLAN: requestLAN
}