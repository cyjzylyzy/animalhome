<template>
<div>
    <span>送养信息管理</span>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="imgurl"  label="图片"  width="auto">
          <template v-slot:default="scope">
            <img :src="scope.row.imgurl"  min-width="80" height="80">
          </template>
        </el-table-column>
        <el-table-column prop="name"  label="宠物昵称"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age"  label="年龄"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gender"  label="性别"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.gender}}</span>
          </template>
        </el-table-column>
         <el-table-column prop="category"  label="种类"  width="auto">
           <template v-slot:default="scope">
            <span>{{ scope.row.category}}</span>
          </template>
         </el-table-column>
        <el-table-column prop="vaccine"  label="免疫状况"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.vaccine}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="repellent"  label="驱虫状况"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.repellent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sterilization"  label="绝育状况"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.sterilization}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details"  label="Ta的故事"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.details}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status"  label="送养审核"  width="auto">
          <template v-slot:default="scope">
            <span v-if="scope.row.status==1">未审核</span>
            <span v-else>已审核</span>
          </template>
        </el-table-column>
        <el-table-column prop="date"  label="时间"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username"  label="送养人"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.user.username}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sterilization"  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope)">同意</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope)">拒绝</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "seedanimal",
  data() {
      return {
        tableData: [],
      };
    },
  created(){
          this.getsendList();
  },
  methods: {
        getsendList:function (){

            this.$axios.get(`${this.$settings.HOST}/sendanimal/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });
        },
    hanleEdit(scope){
        this.$confirm('确认是否审核','提示',{
          confirmButtonText:'确定',
          cancelButtonText:'取消',
          type:'warning',
          center:'true'
        }).then(()=>{
          console.log(scope.row.id)
          this.$axios.put(`${this.$settings.HOST}/sendanimal/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('审核成功')
              this.getsendList()
            }
          }).catch(function (error){
            console.log(error)
          })
        }).catch(()=>{
          this.$message({
            type:'info',
            message:'已取消'
          })
        })
      }

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
          this.$axios.delete(`${this.$settings.HOST}/sendanimal/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
              this.getsendList()
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

  },

}
</script>

<style scoped>

</style>
