// pages/indexitem/attendance/attendance.js
var api = require("../../../config/api");
const app = getApp();
var calendarSignData = [];
var date;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        calendarSignData: [],
        calendarSignDay:'0',
        month:'',
        year:'',
        userInfo:'',
        prev:'<<',
        next:'>>',
        show:false,
        length:''
    },
    sign_prev:function () {
        var year = this.data.year;
        var month = this.data.month;
        if (month =="1") {
            var month ="12";
            var year = parseInt(this.data.year)-1;
        }else{
            var month = parseInt(this.data.month)-1;
            var showYear = this.data.year;
        }
        this.setData({
            month:month,
            year:year
        })
    },

    sign_next:function () {
        var year = this.data.year;
        var month = this.data.month;
        if (month =="11") {
            var month ="1";
            var year = parseInt(this.data.year)+1;
        }else{
            var month = parseInt(this.data.month)+1;
            var showYear = this.data.year;
        }
        this.setData({
            month:month,
            year:year
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        if(!app.globalData.userInfo){
            wx.showToast({
              title: '你还没有登录喔！',
            })
            wx.navigateTo({
              url: '/pages/user/login/login',
            })
          }
          wx.request({
            url: api.signUrl,
            data:{
              userid:app.globalData.userInfo.id
            },
            method:'GET',
            success:(res)=>{
                console.log(res.data)
                  this.setData({
                      calendarSignDay:res.data[0].series_days,
                  }) 
            }
          })
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth()+1;
        date = mydate.getDate();
        console.log("date",date);
        var day = mydate.getDay();
        var nbsp;
        if ((date-day)<=0) {
            nbsp = day-date+1;
            
        } else {
            nbsp = 7-((date-day)%7)+1;
        }
        console.log("nbsp"+nbsp);
        console.log(day)
        var monthDaySize;
        if (month == 1||month == 3||month == 5||month == 7||month == 8||month == 10||month == 12) {
            monthDaySize =31;
        } else if(month == 4||month == 6||month == 9||month == 11) {
            monthDaySize =30;
        }else if(month == 2){
            if ((year-2000)%4==0) {
                monthDaySize =29;
            } else {
                monthDaySize =28;
            }
        };
        this.setData({
            year:year,
            month:month,
            nbsp:nbsp,
            monthDaySize:monthDaySize,
            date:date,
            calendarSignData:calendarSignData,
            userInfo:app.globalData.userInfo
        })
    },
    date(){
        var that = this;
        wx.request({
          url: api.signlogUrl,
          data:{
            userid:app.globalData.userInfo.id
          },
          method:'GET',
          success:(res)=>{
              console.log(res.data)
            that.setData({
                calendarSignData:res.data,
                length:res.data.length
            }) 
            console.log(that.data.calendarSignData[13])
          }
        })
        console.log(this.data.calendarSignData)
    },
    bindsign:function () {
        var userid = app.globalData.userInfo.id;
        var length = this.data.length;
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth()+1;
        date = mydate.getDate();
        // time = this.data.caledarSignData[length-1].sign_time
        console.log(date)
        console.log(this.data.calendarSignData[length-1].sign_day);
        if(this.data.calendarSignData[length-1].sign_day!=date){
            wx.request({
                url: api.signlogUrl,
                data:{
                  userid:app.globalData.userInfo.id,
                  year:year,
                  month:month,
                  day:date,
                  series_days:this.data.calendarSignDay+1
                },
                method:'POST',
                dataType:'json',
                success:(res)=>{
                    this.setData({
                      calendarSignData:res.data,
                    })
                },
              })
              console.log(this.data.calendarSignData)
        }
        
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.date();       
    },
})