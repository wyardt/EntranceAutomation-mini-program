// pages/visitor/visitor.js
//获取应用实例
const app = getApp()

Page({
  data: {
    has_token: false,
    token_in: '',
    token_validation: false,
    countDown30s: false,
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },

  inputToken: function (e){
    this.data.token_in = e.detail.value
    if (e.detail.value.length === 4) {
      // 收起键盘
      this.data.has_token = true
      wx.hideKeyboard()
    }
    else{
      this.data.has_token = false
    }
  },
  checkVisitorToken: function(){
    this.data.token_validation = false
    app.globalData.okok = false
    if (this.data.token_in === app.globalData.todays_token){
        this.data.token_validation = true
        app.globalData.okok = true
      }
    if (this.data.token_validation === true){
      this.setData({
        'dialog.hidden': false,
        'dialog.title': 'Be my guest',
        'dialog.content': 'Welcome'
      })
    }
    else{
      this.setData({
        'dialog.hidden': false,
        'dialog.title': 'oops',
        'dialog.content': 'maybe the token is not for today'
      })
    }
  },
  readyToOpenTheGate(){
    setData({
      countDown30s: true
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
