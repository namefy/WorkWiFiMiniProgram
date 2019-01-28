// pages/login/login.js
var utils = require('../../utils/util.js');
var config = require('../../config.js');
import WxValidate from '../../utils/WxValidate.js';
var validate = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canSend: true,
    sendText: '获取验证码',
    register: false,
    code: -1,
    phone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initValidate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //初始化校验
  initValidate: function() {
    const rules = {};
    const message = {};
    if (!this.data.register) {
      rules['sex'] = {
        required: true
      };
      rules['name'] = {
        required: true
      };
      message['sex'] = {
        required: '请选择性别'
      };
      message['name'] = {
        required: '请输入姓名'
      };
    }
    rules['phone'] = {
      required: true,
      tel: true
    };
    rules['code'] = {
      required: true
    };
    message['phone'] = {
      required: '请输入手机号'
    };
    message['code'] = {
      required: '请输入验证码'
    };

    validate = new WxValidate(rules, message);
  },
  //输入手机号
  phoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //发送验证码
  sendCode: function() {
    var phone = this.data.phone;
    if (!/^1[34578]\d{9}$/.test(phone)) {
      utils.showTip('请输入正确的手机号');
      return;
    }
    var code = utils.randomNum(100000, 999999);
    this.setData({
      canSend: false,
      code: code
    })
    var time = 60;
    var interid = setInterval(() => {
      this.setData({
        sendText: time + 's后重试'
      })
      time--;
      if (time == -1) {
        clearInterval(interid);
        this.setData({
          canSend: true,
          sendText: '获取验证码'
        })
      }
    }, 1000);
    var sendCode = config.service.sendCode;
    var data = {
      phone: phone,
      code: code,
    }
    utils.request(sendCode.url, data, sendCode.method, {
      successFN: res => {
        console.log(res);
      }
    });

  },
  //登录
  submit: function(e) {
    const params = e.detail.value;
    if (!validate.checkForm(e.detail.value)) {
      var msg = validate.errorList[0].msg;
      utils.showTip(msg);
    } else {}
  }
})