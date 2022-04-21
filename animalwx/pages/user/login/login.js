var app = getApp();
var api = require('../../../config/api');
Page({
  data: {
    userphone: '',
    password:'',
    loginErrorCount: 0
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
  },
 
  onReady: function() {

  },
  onShow: function() {
    // 页面显示
  },
  bindphone: function(e) {
    this.setData({
      userphone: e.detail.value
      });
  },
  bindpassword: function(e) {
    this.setData({
      password:e.detail.value
      });
  },
onclickSubmit:function (e) { 
  if(this.data.userphone.length == 0||this.data.password == 0){
    wx.showToast({
      title: '账号和密码不能为空',
      icon:'loading',
      duration:2000
    })
  }else{
    wx.login({
      success:(result)=>{
        var that = this
        wx.request({
          url: api.loginUrl,
          data:{
            userphone: this.data.userphone,
            password:this.data.password,
            code:result.code, 
          },
          method:'POST',
          dataType:'json',
          success:function (res) {
            console.log(res.data)
            if(res.data[0].password==that.data.password){
              app.initUserInfo (res.data[0],e.detail.userInfo);
              console.log(app.globalData.userInfo);
              wx.navigateBack({});
           }else{
             wx.showToast({
               title: '密码错误',
               icon:'error'
             })
             that.setData({
              password:null
              });
           }
          }
        })
      }
    })
    
  }
},
})