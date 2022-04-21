// pages/publish/adopt/dopt.js
var api = require("../../../config/api")
const util = require("../../../utils/util")
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      animalid:'',
      name:'',
      age:'',
      work:'',
      experience:'',
      married:'', 
      salary:'',
      address:'',
      phone:'',
      adoptdetail:'',
      userid:''

    },
    bindwork:function(e){
      this.setData({
        work:e.detail.value
      })
    },
    bindname:function(e){
      this.setData({
        name:e.detail.value
      })
    },
    bindage:function(e){
      this.setData({
        age:e.detail.value
      })
    },
    bindexperience:function(e){
      this.setData({
        experience:e.detail.value
      })
    },
    bindmarried:function(e){
      this.setData({
        married:e.detail.value
      })
    },
    bindsalary:function(e){
      this.setData({
        salary:e.detail.value
      })
    },
    bindaddress:function(e){
      this.setData({
        address:e.detail.value
      })
    },
    bindphone:function(e){
      this.setData({
        phone:e.detail.value
      })
    },
    binddetail:function(e){
      this.setData({
        adoptdetail:e.detail.value
      })
    },
    adoptPost:function(e){
      var date=util.formatDate(new Date())
      wx.request({
        url: api.adoptInfo,
        data:{
          name:this.data.name,
          age:this.data.age,
          work:this.data.work,
          experience:this.data.experience,
          married:this.data.married, 
          salary:this.data.salary,
          address:this.data.address,
          phone:this.data.phone,
          adoptdetail:this.data.adoptdetail,
          status:'1',
          date:date,
          animal_id:this.data.animalid,
          user_id:app.globalData.userInfo.id,
        },
        method:'POST',
        dataType:'json',
        success:function (res) {
          wx.showToast({
            title: '提交成功',
            icon:'success'
          })
          wx.navigateBack({
            delta: 0,
          })
          
        }
      })

    },
      /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var animalid = options.animalid
      this.setData({
        animalid:animalid
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