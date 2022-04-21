// pages/user/myadopt/myadopt.js
var app = getApp()
var api = require('../../../config/api')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        adopt:[],
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
        wx.request({
          url: api.adoptInfo,
          data:{
            animalid:this.data.animalid,
            users_id:app.globalData.userInfo.id,
            name:this.data.name,
            age:this.data.age,
            work:this.data.work,
            experience:this.data.experience,
            married:this.data.married, 
            salary:this.data.salary,
            address:this.data.address,
            phone:this.data.phone,
            adoptdetail:this.data.adoptdetail
          },
          method:'POST',
          dataType:'json',
          success:function (res) {
            console.log(this.data)
          }
        })
      },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var userid = app.globalData.userInfo.id
        console.log(userid)
        wx.request({
          url: api.adoptInfo,
          data:{
            userid:userid
          },
          method:'POST',
          dataType:'json',
          responseType:'text',
          success:(res)=>{
              console.log(res.data)
              this.setData({
                  adopt: res.data[0]
              })
          },
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