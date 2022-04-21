<template>
<div>
    <span>领养信息管理</span>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="aniaml.name"  label="宠物昵称"  width="auto">
        </el-table-column>
        <el-table-column prop="aniaml.category"  label="宠物种类"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.name"  label="领养者"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.age"  label="领养者年龄"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.work"  label="领养者工作"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.experience"  label="养宠经验"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.married"  label="婚姻状况"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.salary"  label="工资"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.address"  label="地址"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.phone"  label="联系方式"  width="auto">

        </el-table-column>
        <el-table-column prop="adoptUser.adoptdetail"  label="领养宣言"  width="auto">

        </el-table-column>
        <el-table-column prop="status"  label="领养状态"  width="auto">
          <template v-slot:default="scope">
            <span v-if="scope.row.status==1">未审核</span>
            <span v-else>已审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="date"  label="领养时间"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope)">同意</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope)">拒绝</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  name: "adoptanimal",
  data() {
      return {
        tableData: [],
        dialogFormEdit:false,
        adopt:{
          id:'',
          name:'',
          category:'',
          username:'',
          salary:'',
          address:'',
          phone:'',
          adoptdetail:'',
          status:'',
          userage:'',
          userwork:'',
          experience:'',
          married:'',
          date:''
        }
      };
    },
  created(){
          this.getadoptList();
  },
  methods: {
        getadoptList:function (){

            this.$axios.get(`${this.$settings.HOST}/adoptinfo/`,{}).then(response => {
              this.tableData = response.data;

            }).catch(error=>{
              console.log(error.response)
            });

        },

    hanleEdit(scope){
      if (!scope.row.id){
        this.tableData.splice(scope.$index,1)
      }else {
        this.$confirm('确认是否通过','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          center:'true'
        }).then(()=>{
          console.log(scope.row.id)
          this.$axios.put(`${this.$settings.HOST}/adoptinfo/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('审核成功')
              this.getadoptList()
            }
          }).catch(function (error){
            console.log(error)
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消审核'
          })
        })
      }
    }
    },
    hanleDel(scope){
      if (!scope.row.id){
        this.tableData.splice(scope.$index,1)
      }else {
        this.$confirm('确认是否拒绝','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          center:'true'
        }).then(()=>{
          console.log(scope.row.id)
          this.$axios.delete(`${this.$settings.HOST}/adoptinfo/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('拒绝成功')
              this.getadoptList()
            }
          }).catch(function (error){
            console.log(error)
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消选择'
          })
        })
      }
  },

}
</script>

<style scoped>

</style>
