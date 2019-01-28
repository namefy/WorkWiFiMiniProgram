//index.js
var qcloud = require('../../wafer-client-sdk/index.js');
var config = require('../../config.js');
var utils = require('../../utils/util.js');
import wxWiFiError from '../../utils/wxWiFiError.js';
//获取应用实例
const app = getApp()

Page({
  data: {
    navTitle: "工地WiFi",
    curWiFi: {},
    getWifi: false,
    trustWifi: {
      'HappyBusWiFi': true,
      'Test-1WiFi': true
    },
    signalPic: {
      '0': '../../icons/network/wifi_noconnect.png',
      '1': '../../icons/network/wifi_1signal.png',
      '2': '../../icons/network/wifi_2signal.png',
      '3': '../../icons/network/wifi_3signal.png',
      '4': '../../icons/network/wifi_fullsignal.png'
    },
    tip: {
      0: '已连接工地WiFi',
      1: '未连接工地WiFi',
      2: '未连接任何WiFi'
    },
    tipindex: 2,
    connectWiFi: false,
    havaTime: false,
    iPhone: false
  },

  onLoad: function() {
    this.initNerwork();
    this.onWifiList();
    this.onWifiConnected();
    this.onNetworkChange();
    this.setData({
      iPhone: app.globalData.iPhone
    })
  },
  //连接wifi
  connectWiFi: function() {
    var that = this;
    wx.startWifi({
      success: () => {
        wx.getWifiList({
          success: res => {
            that.setData({
              getWifi: true
            })
          },
          fail: res => {
            wxWiFiError.show(res);
          }
        });
      },
      fail: res => {
        wxWiFiError.show(res);
      }
    })
  },
  //监听wifi列表
  onWifiList: function() {
    var that = this;
    wx.onGetWifiList(function(res) {
      var wifiList = res.wifiList.filter(item => {
        return that.data.trustWifi[item.SSID]
      })
      var obj = {};
      var wifiArray = wifiList.reduce(function(item, next) {
        obj[next.SSID] ? '' : obj[next.SSID] = true && item.push(next.SSID);
        return item;
      }, []);
      //console.log(that.data.getWifi);
      if (!that.data.getWifi) {
        return;
      }
      wx.showActionSheet({
        itemList: wifiArray,
        success: res => {
          var wifi = wifiList[res.tapIndex];
          wx.connectWifi({
            SSID: wifi.SSID,
            BSSID: wifi.BSSID,
            password: '',
            success: res => {
              that.setData({
                getWifi: false
              });
              that.showWiFiInfo();
            },
            fail: res => {
              wxWiFiError.show(res);
            }
          })
        }
      });
    })
  },
  //连上wifi后展示信息
  showWiFiInfo: function() {
    wx.getConnectedWifi({
      success: res => {
        var curWiFi = res.wifi;
        curWiFi.signal = this.signalToPic(curWiFi.signalStrength);
        this.setData({
          curWiFi: curWiFi,
          connectWiFi: true,
          tipindex: this.data.trustWifi[curWiFi.SSID] ? 0 : 1
        })
      },
      fail: res => {
        wxWiFiError.show(res);
      }
    })
  },
  //信号强度转换
  signalToPic: function(signal) {
    var temp = Math.ceil(signal * 4);
    temp = temp > 4 ? 4 : temp;
    var src = this.data.signalPic[temp];
    return src;
  },
  //监听wifi连接事件
  onWifiConnected: function() {
    var that = this;
    wx.startWifi({
      success: function() {
        wx.onWifiConnected(function(res) {
          //console.log('wifi change', res)
          var curWiFi = res.wifi;
          curWiFi.signal = that.signalToPic(curWiFi.signalStrength);
          that.setData({
            curWiFi: curWiFi,
            connectWiFi: true,
            tipindex: that.data.trustWifi[curWiFi.SSID] ? 0 : 1
          })

        })
      },
      fail: res => {
        wxWiFiError.show(res);
      }
    })

  },
  //监听网络变化
  onNetworkChange: function() {
    var that = this;
    wx.onNetworkStatusChange(function(res) {
      //console.log('net change', res)
      that.setData({
        connectWiFi: res.networkType == 'wifi',
        tipindex: res.networkType == 'wifi' ? that.data.tipindex : 2
      });
      if (res.networkType == 'wifi') {
        that.showWiFiInfo();
      }
    })
  },
  //网络信息初始化
  initNerwork: function() {
    var that = this;
    wx.getNetworkType({
      success: function(res) {
        that.setData({
          connectWiFi: res.networkType == 'wifi',
          tipindex: res.networkType == 'wifi' ? that.data.tipindex : 2
        });
        if (res.networkType == 'wifi') {
          that.showWiFiInfo();
        }
      },
    })
  }
})