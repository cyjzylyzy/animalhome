
var api = require('../../../config/api')
var COS = require('../../../utils/cos-wx-sdk-v5.js')
Page({
    data: {
        items: [
            {value: 'smc', name: '仅限同城'},
            {value: 'dym', name: '按时打疫苗'},
            {value: 'love', name: '不得遗弃、转让、贩卖、虐待'},
            {value: 'visit', name: '接受领养前家访，领养后回访'},
            {value: 'emo', name: '工作稳定，有经济基础'},
            {value: 'cul', name: '文明养宠，科学喂养'},
            {value: 'adopt', name: '签订领养协议'}
          ],
      imagelist:'https://cyj-1301925644.cos.ap-chengdu.myqcloud.com/animalimage%2Fitem%2F%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87.png',
      onlineImageList:'',
      category:"",
      age:'',
      gender:'',
      vaccine:'',
      repellent:'',
      sterilization:'',
      detail:'',
      username:'',
      phone:''
    },
    uploadImage:function (e) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType:['compressed','original'],
        sourceType:['album','camera'],
        success:function (res) {
          that.setData({
            imagelist:that.data.imagelist.concat(res.tempFilePaths)
          })
          
        }
      })
    },
    uploadFile:function () {
      var that=this;
      var cos = new COS({
        SecretId:'AKIDLepqdGboyykIckhSzHLGzXwGRPPFrHUU',
        SecretKey:'pPnxsZ2HH2YqujJekcHjwud8OQDk25sQ',
      });
      for (var index in this.data.imagelist) {
        var filePath = this.data.imagelist[index];
        var filename = filePath.substr(filePath.lastIndexOf('/') + 1);
        cos.postObject({
          Bucket:'cyj-1301925644',
          Region:'ap-chengdu',
          Key: 'animalimage/animal/'+filename,
          FilePath:filePath,
          onProgress:function (info) {
            console.log('进度条',JSON.stringify(info));
          }
        },function (err,data) {
          console.log('上传后的返回值',data.Location);
        
        });
      }
    },
    checkboxChange(e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    
        const items = this.data.items
        const values = e.detail.value
        for (let i = 0, lenI = items.length; i < lenI; ++i) {
          items[i].checked = false
    
          for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
            if (items[i].value === values[j]) {
              items[i].checked = true
              break
            }
          }
        }
        this.setData({
          items
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
    bindUsername:function(e){
      this.setData({
        username:e.detail.value
      })
    },
    bindphone:function(e){
      this.setData({
        phone:e.detail.value
      })
    },
    onClickcat:function(e){
      this.setData({
        category:'猫猫'
      })
    },
    onClickdog:function(e){
      this.setData({
        category:'狗狗'
      })
    },
    onClickboy:function(e){
      this.setData({
        gender:'男生'
      })
    },
    onClickgirl:function(e){
      this.setData({
        gender:'女生'
      })
    },
    onClickWmy:function(e){
      this.setData({
        vaccine:'未免疫'
      })
    },
    onClickYmy:function(e){
      this.setData({
        vaccine:'已免疫'
      })
    },
    onClickWqc:function(e){
      this.setData({
        repellent:'未驱虫'
      })
    },
    onClickYqc:function(e){
      this.setData({
        repellent:'已驱虫'
      })
    },
    onClickWjy:function(e){
      this.setData({
        sterilization:'未绝育'
      })
    },
    onClickYjy:function(e){
      this.setData({
        sterilization:'已绝育'
      })
    },
    binddetail:function(e){
      this.setData({
        detail:e.detail.data
      })
    },
    submitClick:function(e){
        wx.request({
          url: api.sendApi,
          data:{
            imageUrl:this.data.onlineImageList,
            name:this.data.name,
            age:this.data.age,
            category:this.data.category,
            repellent:this.data.repellent,
            vaccine:this.data.vaccine,
            sterilization:this.data.sterilization,
            username:this.data.username,
            phone:this.data.phone,
            details:this.data.detail
          },
          method:'POST',
          dataType:'json',
          success:(res)=>{
            console.log(res)
          }

        })
    },


    onLoad: function (options) {
      

    },

})