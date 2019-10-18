//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dinnerTime: '18:00',
    dinner_msg: '开饭时间:',
    dinner_msg_more: '',
    userInfo: {},
    hasUserInfo: false,
    button_disabled: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    location: {
      latitude: 0,
      longtitude: 0
    }
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
    
    wx.cloud.init({
      env: 'wyardt-ea-h9jxk',
      traceUser: true,
    });
    const db = wx.cloud.database({
      env: 'wyardt-ea-h9jxk'
    });
    db.collection('location').where({
      _id: 'myHouse'
    }).get({
      success: function (res) {
        // res.data 包含该记录的数据
        console.log(res.data[0].falseOne.latitude),
        console.log(res.data[0].falseOne.longtitude),
        latitude = res.data[0].falseOne.latitude,
        lontitude = res.data[0].falseOne.longtitude
      }
    });

    //小程序端调用方法
    wx.cloud.callFunction({
      // 需要调用的云函数名
      name: 'submitVisitors',
      // 传给云函数的参数
      data: {
        password: "5023",
        data: 'hello'
      },
      success: function (res) {
        console.log(res.result) // 3
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  onShow: function () {
    if (app.globalData.okok === true) {
      this.setData({ 
        dinner_msg: '开饭时间是' + this.data.dinnerTime,
        dinner_msg_more: '小程序会告诉你怎么过来',
        button_disabled: false
      })
    }
    else {
      this.setData({ 
        dinner_msg: '请先在<访客>页面登记~',
        dinner_msg_more: '',
        button_disabled: true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindVisitor: function () {
    wx.navigateTo({
      url: '../visitor/visitor'
    })
  },
  bindAdmin: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  openLocation() {
    if (app.globalData.okok === true){
      wx.openLocation({
        latitude: 23.094748,
        longitude: 113.323594,
        name: 'Kestrels House',
        address: 'West Rd. of ChiGang, No.27, 502'
      })
    }
    else{
      wx.openLocation({
        latitude: 23.194748,
        longitude: 113.423594,
        name: 'Kestrels House',
        address: 'Big daddy Road'
      })
    }
  },
  moveToMyLocation() {
    this.mapCtx.moveToLocation()
  },
  birdsEyeView() {
    this.mapCtx.includePoints({
      padding: [1],
      points: [{
        latitude: 23.06467,
        longitude: 113.330158,
      }, {
        latitude: 23.13467,
        longitude: 113.330158,
      }]
    })
  }
})
