// pages/user/mysupport/mysupport.js
var api = require('../../../config/api');
var app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        support:['你还没有云养动物喔'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
          url: api.support,
          data:{
              userid:app.globalData.userInfo.id
          },
          method:'POST',
          dataType:'json',
          responseType:'text',
          success:(res)=>{
              console.log(res.data)
              this.setData({
                  support:res.data
              })
          }

        })
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