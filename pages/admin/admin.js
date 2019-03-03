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
    }
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
  tryUpdateToken: function () {
    if (this.data.password_in === this.data.password) {
      this.setData({
        'dialog.hidden': false,
        'dialog.title': 'Done',
        'dialog.content': 'Copy done'
      })
      app.globalData.todays_token = this.data.token_in
    }
    else {
      this.setData({
        'dialog.hidden': false,
        'dialog.title': 'oops',
        'dialog.content': 'seems not to be the right one'
      })
    }
  },
  confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})
