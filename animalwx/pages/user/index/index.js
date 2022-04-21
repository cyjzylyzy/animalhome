// index.js
// 获取应用实例
var app = getApp();
const api=require('../../../config/api')

Page({
  data: {
    usermessage:'0',
    userInfo:null
  },
  onLoad:function (options) {
    wx.request({
      url: api.loginUrl,
      method:'GET',
      dataType:'json',
      success:(res)=>{
        
      }
    })
  },

  onShow:function () {
    this.setData({
     userInfo: app.globalData.userInfo
    })
    console.log(app.globalData.userInfo)
  },
  /**用户注销 */
  onClickLogout:function () {
    app.delUserInfo();
    this.setData({
      userInfo:null
    })
  }

})
