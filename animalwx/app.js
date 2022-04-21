// app.js
App({
  onLaunch:function () {
    // 展示本地存储能力
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo){
      this.globalData.userInfo = userInfo;
    }
  },
  globalData: {
    userInfo: null,
    getTM_json:{},
  },
  initUserInfo:function (res,localInfo) {
    var info ={
      id:res.id,
      username:res.username,
      avatarUrl:res.avatarUrl,
      gender:res.gender,
      password:res.password,
      email:res.email,
      userscore:res.userscore,
      role:res.role,
      address:res.address,
      token:res.token,
      openid:res.openid,
      userphone:res.userphone,
    }
    this.globalData.userInfo = info;
    //在本地的“cookie”中赋值
    wx.setStorageSync('userInfo', info); 
  },
  delUserInfo:function () {
    this.globalData.userInfo = null;
    wx.removeStorageSync('userInfo')
  }
})
