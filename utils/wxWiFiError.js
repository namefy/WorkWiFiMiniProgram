var wxWiFiError = {
  wifiErrorList: {
    '12000': '未先调用 startWifi 接口',
    '12001': '当前系统不支持相关能力',
    '12002': 'Wi-Fi	密码错误',
    '12003': '连接超时',
    '12004': '重复连接 Wi-Fi',
    '12005': 'Android 特有，未打开 Wi-Fi 开关',
    '12006': 'Android 特有，未打开 GPS 定位开关',
    '12007': '用户拒绝授权链接 Wi-Fi',
    '12008': '无效 SSID',
    '12009': '系统运营商配置拒绝连接 Wi-Fi',
    '12010': '系统其他错误，需要在 errmsg 打印具体的错误原因',
    '12011': '应用在后台无法配置 Wi-Fi',
		'12012': '连接超时',
		'12013': '连接 deviceId 为空或者是格式不正确'
  },
  show: function(res) {
		if (res.errCode){
			wx.showToast({
				title: res.errCode != '12010' ?
					this.wifiErrorList[res.errCode] : res.errMsg,
				icon: 'none',
				duration:2500
			});
		}else{
			wx.showToast({
				title: res.errMsg,
				icon: 'none',
				duration: 2500
			});
		}

  }
}



export default wxWiFiError;