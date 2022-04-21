<template>
<div>
    <span>用户信息管理</span>
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormAdd=true">新增用户</el-button>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="avatarUrl"  label="头像"  width="auto">
          <template v-slot:default="scope">
            <img :src="scope.row.avatarUrl" min-width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column prop="username"  label="姓名"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userphone"  label="手机号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.userphone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender"  label="性别"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.gender}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="password"  label="密码"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.password}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email"  label="邮箱"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.password}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userscore"  label="积分"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.userscore}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="role"  label="权限"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.role}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address"  label="用户地址"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="registTime"  label="注册时间"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.registTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sterilization"  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope)">删除</el-button>
        </el-table-column>
      </el-table>


      <el-dialog title="修改用户信息" :visible.sync="dialogFormEdit" >
        <el-form>
          <el-form-item label="姓名" prop="username" >
            <el-input v-model="user.username" ></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="userphone">
            <el-input v-model="user.userphone" ></el-input>
          </el-form-item>
          <el-form-item label="性别"  prop="gender">
            <el-input v-model="user.gender" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" ></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="userscore">
            <el-input v-model="user.userscore"></el-input>
          </el-form-item>
          <el-form-item label="权限" prop="role">
            <el-input v-model="user.role" ></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatarUrl">
            <el-input v-model="user.avatarUrl"></el-input>
          </el-form-item>
          <el-form-item label="用户地址" prop="address">
            <el-input v-model="user.address" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="edit(user)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加用户信息" :visible.sync="dialogFormAdd">
        <el-form :model="user">

          <el-form-item label="姓名" prop="username">
            <el-input v-model="user.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="userphone">
            <el-input v-model="user.userphone" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender">
            <el-input v-model="user.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="积分" prop="userscore">
            <el-input v-model="user.userscore" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像" prop="avatarUrl">
            <el-input v-model="user.avatarUrl" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户地址" prop="address">
            <el-input v-model="user.address" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="add(user)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: "userform",
  data() {
      return {
        tableData: [],
        dialogFormEdit: false,
        dialogFormAdd: false,
        user:{
          id:'',
          username:'',
          userphone:'',
          gender:'',
          password:'',
          email:'',
          userscore:'',
          role:'',
          avatarUrl:'',
          registTime:'',
          address:''
        }

      };
    },
  created(){
          this.getuserList();
  },
  methods: {
    getuserList:function (){

      this.$axios.get(`${this.$settings.HOST}/userinfo/`,{}).then(response => {
        this.tableData = response.data;
      }).catch(error=>{
        console.log(error.response)
      });
    },
    add(user){
      let params = new URLSearchParams()
      params.append('username',user.username)
      params.append('userphone',user.userphone)
      params.append('gender',user.gender)
      params.append('password',user.password)
      params.append('email',user.email)
      params.append('userscore',user.userscore)
      params.append('role',user.role)
      params.append('avatarUrl',user.avatarUrl)
      params.append('address',user.address)
      this.$axios.post(`${this.$settings.HOST}/userinfo/`,params).then(res=>{
        if (res.data.success == true){
          this.$message.success('添加成功')
          this.dialogFormAdd=false
          this.getuserList()
        }
      })
        .catch(function (error) {
        console.log(error)
      })

    },
    edit(user){
      let params = new URLSearchParams()
      params.append('username',user.username)
      params.append('userphone',user.userphone)
      params.append('gender',user.gender)
      params.append('password',user.password)
      params.append('email',user.email)
      params.append('userscore',user.userscore)
      params.append('role',user.role)
      params.append('avatarUrl',user.avatarUrl)
      params.append('registTime',user.registTime)
      params.append('address',user.address)
      this.$axios.put(`${this.$settings.HOST}/userinfo/`+scope.row.id+`/`).then(res=>{
        if (res.data.success==true){
          this.$message.success('添加成功')
          this.dialogFormEdit=false
          this.getuserList()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    hanleEdit(scope){
      this.dialogFormEdit = true
      this.user.id = scope.row.id
      this.user.username = scope.row.username
      this.user.userphone = scope.row.userphone
      this.user.password = scope.row.password
      this.user.email = scope.row.email
      this.user.gender = scope.row.gender
      this.user.userscore = scope.row.userscore
      this.user.avatarUrl = scope.row.avatarUrl
      this.user.role = scope.row.role
      this.user.registTime =scope.row.registTime
      this.user.address = scope.row.address

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
          this.$axios.delete(`${this.$settings.HOST}/userinfo/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
              this.getuserList()
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
