// index.js
// 获取应用实例
const app = getApp()
var api = require('../../config/api')
Page({
  data: {
    notice:'',
    animalInfoList:[],
    minId:0,
    maxId:0,
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
            animalInfoList:res.data,
            maxId:res.data[0].id,
            minId:res.data[res.data.length-1].id
          })
        }
        })
  },
  getNotice:function(){
    wx.request({
      url: api.NoticeApi,
      method:'GET',
      dateType:'json',
      responseType:'text',
      success:(res)=> {
        console.log(res)
        this.setData({
          notice:res.data,
        })
      }
      })

  },
   /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getanimalinfo(true);
      this.getNotice(true)
    },
  
        /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () { 
    },
  adoptclick:function(e){
    //跳转
    wx.navigateTo({
      url: '/pages/indexitem/adopt/adopt', //和app.json一致
    })
  },
  seekclick:function (e) {
    wx.navigateTo({
      url: '/pages/indexitem/find/find',
    })
    
  },
  answerclick:function (e) {
    wx.navigateTo({
      url: '/pages/indexitem/answer/answer',
    })
  },
  registerclick:function (e) {
    wx.navigateTo({
      url: '/pages/indexitem/attendance/attendance',
    })
  }
})
