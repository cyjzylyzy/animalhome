// pages/publish/rear/rear.js
var api = require("../../../config/api")
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        animal:[],
        money:'0'
    },
    doPayment:function(){
      wx.request({
        url:api.payment,
        data:{
          animalid:this.data.animal.id,
          user_id:app.globalData.userInfo.id,
          openid:app.globalData.userInfo.openid,
          money:this.data.money
        },
        method:'POST',
        dataType:'json',
        responseType:'text',
        success:function(res){
            console.log(res.data);
            wx.requestPayment({
              'nonceStr': res.data.nonceStr,
              'package': res.data.package,
              'paySign': res.data.paySign,
              'timeStamp': res.data.timeStamp,
              'signType': res.data.signType,
              success:function(res){}

            })
        },
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var animalId = options.animalId
        console.log(animalId);
        wx.request({
          url: api.animalApi + animalId +"/",
          method:'GET',
          dateType:'json',
          responseType:'text',
          success:(res)=> {
              this.setData({
                animal:res.data
              })
          }
        })
    },
    bindmoney:function(e){
      this.setData({
        money:e.detail.value
      })

    },
    dopayment:function(e){
      
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