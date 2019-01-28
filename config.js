// 小程序配置文件
var host = 'https://localhost:5001/api/';

var config = {
  service: {
    //微信用户登录
    init: {
      method: 'GET',
      url: host + 'init'
    },
    //发送验证码
    sendCode: {
			method: 'PUT',
      url: host + 'login'
    }
  }
}

module.exports = config;