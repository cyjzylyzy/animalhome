// pages/user/myaddress/myaddress.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressInfo: null
      },

      chooseAddress() {
        wx.chooseAddress({
          success: (res) => {
            this.setData({
              addressInfo: res
            })
          },
          fail: function(err) {
            console.log(err)
          }
        })
      },
      onLoad:function(options){
        if(!app.globalData.userInfo){
          wx.showToast({
            title: '你还没有登录',
          })
          wx.navigateTo({
            url: '/pages/user/login/login',
          })
        }
      }
})