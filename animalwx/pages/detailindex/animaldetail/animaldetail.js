// pages/detailindex/animaldetail/animaldetail.js
var api = require("../../../config/api")
var util = require('../../../utils/util')
const app = getApp()
Page({
    data: {
      aniaml:[],
      reply:[],
      adoptinfo:[],
      userInfo:'',
      isShowCommentModal:false

    },
    onClickClearReply:function () {
      this.setData({
        ['reply.cid']:null,
        ['reply.username']:null,
        ['reply.depth']:1,

      })
    },
    onClickShowCommentModal:function (e) {
      this.setData({
        isShowCommentModal:true,
        reply:e.currentTarget.dataset
      })
    },
    onClickCancelCommentModal:function () {
      this.setData({
        isShowCommentModal:false,
        reply:{}
      })
    },
    onClickPostComment:function () {
      if(!this.data.reply.content){
        wx.showToast({
          title: '评论不能为空',
          icon:'none'
        })
        return
      }
      var create_data = util.formatDate(new Date())
      wx.request({
        url: api.CommentApi,
        data:{
          depth:this.data.reply.depth,
          reply:this.data.reply.cid,
          content:this.data.reply.content,
          root:this.data.reply.rid,
          aniaml:this.data.reply.did,
          create_data:create_data
        },
        method:'POST',
        dataType:'json',
        responseType:'text',
        success:(res)=>{
          if (res.statusCode==201) {
            console.log(res.data)
            if (this.data.reply.rootindex == undefined) {
              var dataList = this.data.aniaml.comment;
              dataList.unshift(res.data)
              this.setData({
                ["aniaml.comment"]:dataList
              });
              this.onClickCancelCommentModal();
            }else{
             var childCommentList= this.data.aniaml.comment[this.data.reply.rootindex].child;
             childCommentList.unshift(res.data);
             this.setData({
              ["aniaml.comment["+this.data.reply.rootindex+"].child"]:dataList
             });
             this.onClickCancelCommentModal();
            } 
          }
        }
      })
    },
    inputComment:function(e) {
      this.setData({
        ['reply.content']:e.detail.value
      })
    },
    getMore:function (e) {
      var rootId = e.currentTarget.dataset.root;
      var idx = e.currentTarget.dataset.idx;
      wx.request({
        url: api.CommentApi,
        data:{
          root:rootId
        },
        method:'GET',
        dataType:'json',
        responseType:'text',
        success:(res)=> {
          //找到根评论下的child，替换
          console.log(idx,res.data)
          this.setData({
            ["aniaml.comment["+idx+"].child"]:res.data
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var aniamlId = options.aniamlId;
        console.log(aniamlId);
        wx.request({
          url: api.animalApi + aniamlId +"/",
          method:'GET',
          dateType:'json',
          responseType:'text',
          success:(res)=> {
              this.setData({
                aniaml:res.data
              })
          }
        })
        this.setData({
          userInfo:app.globalData.userInfo
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

    },
    onClickapply:function () {
      var userscore = app.globalData.userInfo.userscore
      console.log(userscore)
      if(userscore>=500){
        wx.navigateTo({
          url: '/pages/publish/adopt/adopt',
        })
      }else{
        wx.showToast({
          title: '你的积分不足',
          icon:'error'
        })
      }
    },
})
