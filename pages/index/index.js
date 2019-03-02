//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    dinnerTime: '18:00',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
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
    wx.openLocation({
      latitude: 23.194748,
      longitude: 113.423594,
      name: 'Kestrels House',
      address: 'Big daddy Road'
    })
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
