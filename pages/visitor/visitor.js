// pages/visitor/visitor.js
//获取应用实例
const app = getApp()

Page({
  data: {
    guestName: '',
    guestMatched: false,
    countDown30s: false,
    dialog: {
      title: '',
      content: '',
      hidden: true
    }
  },

  inputToken: function(e) {
    this.data.guestName = e.detail.value
    console.log(this.data.guestName)
  },

  checkVisitorToken: function() {
    //小程序端调用方法
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'checkVisitor',
      // 传给云函数的参数
      data: {
        guestName: this.data.guestName
      },
      complete: res => {
        console.log('good', res.result.data.length)

        if (res.result.data.length > 0) {
          this.setData({
            guestMatched: true,
            'dialog.hidden': false,
            'dialog.title': '已通知主人~',
            'dialog.content': '欢迎'
          })
        } else {
          this.setData({
            guestMatched: false,
            'dialog.hidden': false,
            'dialog.title': '哎呀',
            'dialog.content': '聚餐似乎不在今天'
          })
        }
      }
    })
  },
  /*readyToOpenTheGate(){
    this.setData({
      countDown30s: true
    })
  },*/
  confirm() {
    this.setData({
      'dialog.hidden': true,
      'dialog.title': '',
      'dialog.content': ''
    })
  }
})