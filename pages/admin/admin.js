// pages/admin/admin.js
//获取应用实例
const app = getApp()

Page({
  data: {
    password: '1212',
    token_in: '',
    password_in: '',
    dialog: {
      title: '',
      content: '',
      hidden: true
    },
    date: '2019-10-01',
    time: '18:00',
    updateSuccess: false
  },

  onReady: function (e) {
    
  },
  inputNewToken: function (e) {
    this.data.token_in = e.detail.value
    if (e.detail.value.length === 4) {
      // 收起键盘
      wx.hideKeyboard()
    }
  },

  inputPassword: function (e) {
    this.data.password_in = e.detail.value
  },

  updateSuccess: function () {
    this.data.updateSuccess = true
  },

  updateFail: function () {
    this.data.updateSuccess = false
  },

  
  tryUpdateToken: function () {
    //小程序端调用方法
    var that = this;
    

    if (true) {
      this.setData({
        'dialog.hidden': false,
        'dialog.title': '成功',
        'dialog.content': '开饭时间已更新'
      })
      app.globalData.todays_token = this.data.token_in
      
    }
    else {
      this.setData({
        'dialog.hidden': false,
        'dialog.title': '嘿',
        'dialog.content': '密码不正确'
      })
    }
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})
