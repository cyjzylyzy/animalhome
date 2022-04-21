// rear.js
// 获取应用实例
var api = require("../../config/api")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animalList:[]
  },
  getanimalinfo:function () {
    wx.request({
        url: api.animalApi,
        method:'GET',
        header:{
            Authorization:app.globalData.userInfo ? app.globalData.userInfo.token:null
        },
        dateType:'json',
        responseType:'text',
        success:(res)=> {
          console.log(res)
          this.setData({
            animalList:res.data,
            maxId:res.data[0].id,
            minId:res.data[res.data.length-1].id
          })
        }
        })
  },
  onLoad: function (options) {
    this.getanimalinfo(true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
