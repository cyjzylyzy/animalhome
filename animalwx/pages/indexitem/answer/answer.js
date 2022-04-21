// pages/indexitem/answer/answer.js
var api = require("../../../config/api");
// var app = getApp();
let count = 0; //计数
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false, //蒙版
    time: "", //倒计时的时间
    questionlist:[],
    jstm: {},
    limtTime:5, //竞赛限制时间，分钟
    num: 15, //当前题型一共有多少题
    id: 1, //题目顺序id
    title: "",
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    answer_A: "",
    answer_B: "",
    answer_C: "",
    answer_D: "",
    current_ans: "",
    score: 0, //总成绩
    userscore:''
  },
  //判断点击的是否正确
  isright: function (e) {
    let current = e.currentTarget.dataset.text //用户选择的答案
    let userscore = app.globalData.userInfo.userscore
    console.log(e.currentTarget.dataset.text)
    if (current == this.data.current_ans) {
      this.setData({
        score: this.data.score + 1,
        userscore: userscore+1,      
      })
      console.log(this.data.userscore)
      wx.showToast({
        title: '答对了!',
        icon:'none'
      })
      
    } else {
      wx.showToast({
        title: '答错了!',
        icon:'none'
      })
    }
    console.log('当前成绩', this.data.score)
    this.nextOne() //调用下一题
  },

  //点击空白处取消蒙版
  preventTouchMove: function () {
    this.setData({
      showModal: false
    })
  },
  //点击按钮关闭蒙版
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },
  //答题完返回页面
  back:function(){
    console.log('返回首页了')
    //关闭所有页面，跳转到某一页面
    wx.reLaunch({
      url:"../../index/index"
    })
  },
  //重新答题
  again:function(){
    wx.reLaunch({
      url: "../answer/answer",
      success: function (res) {},
    })
  },
  //显示下一题
  nextOne: function () {
    count = count + 1;
    if (count != this.data.num && count != 0) {
      this.setData({
        id:this.data.jstm[count].id,
        title:this.data.jstm[count].title,
        answer_A:this.data.jstm[count].answer_A,
        answer_B:this.data.jstm[count].answer_B,
        answer_C:this.data.jstm[count].answer_C,
        answer_D:this.data.jstm[count].answer_D,
        current_ans:this.data.jstm[count].current_ans
      })
    } else {
      // showToast("您的成绩为:" + this.data.score + "分", "none")
      this.setData({
        showModal: true, //弹出蒙版
        id: 1, //题目id重新赋值为1
        // score: 0 //成绩重新赋值为0
      })
      count = 0 //计算题目的计数器重新赋值给0
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(!app.globalData.userInfo){
      wx.showToast({
        title: '你还没有登录！！',
        icon:'loading'
      })
      wx.navigateTo({
        url: '/pages/user/login/login',
      })
    }
    wx.request({
      url: api.questionUrl,
      method:'GET',
      dataType:'json',
      responseType:'text',
      success:(res)=>{
        console.log(res.data)
        this.setData({
          questionlist:res.data,
        });
        console.log(this.data.questionlist[0])
        let nums=15
        //先给页面赋值第一次
        let map = new Map(); 
        for (let i = 0; i < nums; i++) {
          let tmp_json = this.data.questionlist[i]
          map.set(i, tmp_json)
          console.log(tmp_json)
        }
        let json = this._mapToJson(map)
        this.setData({
          jstm: JSON.parse(json)
        })
        console.log(this.data.jstm)
        this.setData({
          title:this.data.jstm[0].title,
          answer_A:this.data.jstm[0].answer_A,
          answer_B:this.data.jstm[0].answer_B,
          answer_C:this.data.jstm[0].answer_C,
          answer_D:this.data.jstm[0].answer_D,
          current_ans:this.data.jstm[0].current_ans
        })
      },
      
    })
    //时间倒计时
    let createTime = new Date(); //开始时间 
    let that = this
    // 倒计时 入口 
    setInterval(function () {
      // let limitTime = 1 //倒计时限制的时间，分钟
      let arr = that.cutDoowns(that.data.limtTime, createTime);
      let time = arr[0] + '分' + that.formatDate(arr[1]) + "秒";
      that.setData({
        time: time,
      })
      if (arr[2]) {
        that.setData({
          showModal: true, //弹出蒙版
          id: 1, //题目id重新赋值为1
        })
      }
    });
  },
  //将Map转化为Object（对象）
  _strMapToObj: function (strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
      obj[k] = v;
    }
    return obj;
  },
  /**
   *map转换为json
   */
  _mapToJson: function (map) {
    return JSON.stringify(this._strMapToObj(map));
  },
  /*
  num 要产生多少个随机数
  from 产生随机数的最小值
  to 产生随机数的最大值
  */
  createRandom: function (num, from, to) {
    let arr = [];
    for (let i = from; i <= to; i++)
      arr.push(i);
    arr.sort(function () {
      return 0.5 - Math.random();
    });
    arr.length = num;
    return arr;
  },
   


  //获取倒计时时间
  cutDoowns: function (s, date) {
    let flag = false;
    let arr = []; //arr[0]:分，arr[1]:秒，arr[2]:返回boolean 
    let now = new Date(); //当前时间 
    let now1 = new Date(date); //开始时间 
    now1.setMinutes(now1.getMinutes() + s); //10分钟后的时间 
    // 转化成年月日 时分秒 格式 
    let n = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDay() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    let n1 = now1.getFullYear() + '/' + (now1.getMonth() + 1) + '/' + now1.getDay() + ' ' + now1.getHours() + ':' + now1.getMinutes() + ':' + now1.getSeconds();
    // 日期转化成毫秒 
    let time1 = (new Date(n)).getTime();
    let time2 = (new Date(n1)).getTime();
    // 毫秒转日期格式 
    let time11 = new Date(time1);
    let time21 = new Date(time2);

    let surplusSec = time2 - time1; //距离解锁剩余毫秒 
    if (surplusSec <= 0) {
      flag = true;
      return arr = [0, 0, flag];
    }
    let minute = Math.floor(surplusSec / 1000 / 60); //分钟 
    let second = Math.floor((surplusSec - minute * 60 * 1000) / 1000); //剩余秒数 
    arr = [minute, second, flag];
    return arr;
  },

  //格式化日期：把单字符转成双字符 
  formatDate: function (n) {
    let m = n.toString();
    if (m.length <= 1) {
      m = '0' + m;
    }
    return m;
  },

})