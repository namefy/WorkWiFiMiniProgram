// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payArray: [{
      info1: '按天套餐',
      info2: '1 天 | 1.00元',
      info3: '付费开始后24小时可用',
      money: '1.00',
      checked: false
    }, {
      info1: '按周套餐',
      info2: '7 天 | 6.00元',
      info3: '按周购买，享受8.5折优惠',
      money: '6.00',
      checked: false
    }, {
      info1: '按月套餐 ',
      info2: '30 天 | 25.00元',
      info3: '相当于包月使用无限量流量',
      money: '25.00',
      checked: false
    }],
    payIndex: -1,
    canPay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  //选择套餐
  radioChange: function(e) {
    this.setData({
      payIndex: e.detail.value,
      canPay: true
    })
  },
  //再次点击取消
  tapRadio: function(e) {
    var index = this.data.payIndex;
    var sel = this.data.payArray[index];
    var payArray = this.data.payArray;
    for (var i = 0; i < payArray.length; i++) {
      payArray[i].checked = i == index ? !payArray[i].checked : false;
    }
    if (!payArray[index].checked) {
      this.setData({
        canPay: false
      })
    }
    this.setData({
      payArray: payArray
    })
  },
  //微信付款
  pay: function(e) {
    console.log(e.detail.value);
  }
})