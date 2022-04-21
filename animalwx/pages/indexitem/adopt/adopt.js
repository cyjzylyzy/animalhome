// pages/adopt/adopt.js
// var api = require('../../../config/api')
const app = getApp()
var api = require("../../../config/api")
Page({
    data: {
      animalList:[],
      maxId:0,
      minId:0,
    },
    getanimalinfo:function (roll) {
      var condition = {};
      if (roll) {
        condition['minId'] = this.data.minId;
      }
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
    getLatesInfo:function () {
      if (!this.data.maxId) {
        this.getaniamlinfo;
        return
      }
      wx.request({
        url: api.animalApi,
        data:{
          maxId:this.data.maxId
        },
        method:'GET',
        dateType:'json',
        responseType:'text',
        success:(res)=>{
          if (res.statusCode == 200) {
            var result = res.data.result.reverse();
            if (result.length<=0) {
              wx.showToast({
                title: '没有新的数据了',
              })
              return
            }
            this.setData({
              animalList:result.concat(this.data.animalList),
              maxId:result[0].id
            })
          }
        },complete:(res)=>{
          wx.stopPullDownRefresh();
        }
  
      })
    },
    onPullDownRefresh: function () {
      this.getLatesInfo(true);
    },
    animalbottom:function(){
      wx.request({
        url: api.animalApi,
        data:{
          min_id : this.data.minId
        },
        method:'GET',
        dateType:'json',
        responseType:'text',
        success:(res)=>{
          if (!res.data.length) {
            wx.showToast({
              title: '已到底部',
              icon:'none'
            })
            return
          }
          console.log(res);
          this.setData({
            animalList : this.data.animalList.concat(res.data),
            minId:res.data[res.data.length-1].id,
          })
        }
      })
    },
            /**
       * 页面上拉触底事件的处理函数
       */
      onReachBottom: function () {
        this.animalbottom(true)
      }, 
     /**
       * 生命周期函数--监听页面加载
       */
    onLoad: function (options) {
      this.getanimalinfo(true);
    },
  
})