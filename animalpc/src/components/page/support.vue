<template>
<div>
    <span>交易管理</span>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username"  label="云养者"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.user.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="animal.imgurl"  label="宠物图片"  width="auto">
          <template v-slot:default="scope">
            <img :src="scope.row.animal.imgurl" min-width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column prop="animal.name"  label="宠物昵称"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.animal.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money"  label="金额"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.money}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="status"  label="支付状态"  width="auto">
          <template v-slot:default="scope">
            <span v-if="scope.row.status==1">未支付</span>
            <span v-else>已支付</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope.row)">修改</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="修改云养信息" :visible.sync="dialogFormEdit">
        <el-form :model="support">
          <el-form-item label="宠物昵称">
            <el-input v-model="support.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="support.money" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="edit(support)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: "support",
  data() {
      return {
        tableData: [],
        dialogFormAdd:false,
        dialogFormEdit:false,
        support:{
          id:'',
          username: '',
          name:'',
          imgurl: '',
          money:'',
          uid:'',
          status:'',
        }
      };
    },
  created(){
          this.getcartList();
  },
  methods: {
        getcartList:function (){

            this.$axios.get(`${this.$settings.HOST}/support/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });

        },

    edit(support){
      let params = new URLSearchParams()
      params.append('name',support.name)
      params.append('username',support.username)
      params.append('imgurl',support.imgurl)
      params.append('money',support.money)
      params.append('uid',support.uid)
      params.append('status',support.status)
      this.$axios.put(`${this.$settings.HOST}/support/`,params).then(res=>{
        if (res.data.success==true){
          this.$message.success('添加成功')
          this.dialogFormEdit=false
          this.getcartList()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    hanleEdit(scope){

      this.support.id = scope.row.id
      this.support.username = scope.row.user.username
      this.support.money = scope.row.money
      this.support.imgurl = scope.row.animal.imgurl
      this.support.name = scope.row.animal.name
      this.support.status = scope.row.status
      this.dialogFormEdit = true
    },
    hanleDel(scope){
      if (!scope.row.id){
        this.tableData.splice(scope.$index,1)
      }else {
        this.$confirm('确认是否删除','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          center:'true'
        }).then(()=>{
          console.log(scope.row.id)
          this.$axios.delete(`${this.$settings.HOST}/support/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
              this.getcartList()
            }
          }).catch(function (error){
            console.log(error)
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      }
    }
  },

}
</script>

<style scoped>

</style>
