<template>
  <div>
  <span>评论管理</span>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="content"  label="评论内容"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="depth"  label="评论级数"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.depth}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_data"  label="评论时间"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.create_data}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user.username"  label="评论者"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.user.username}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleDel(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>

    </div>
  </div>

</template>

<script>
export default {
  name: "comment",
  data() {
      return {
        tableData: [],
        dialogFormAdd:false,
        dialogFormEdit:false,
      };
    },
  created(){
          this.getcommentList();
  },
  methods: {
        getcommentList:function (){

            this.$axios.get(`${this.$settings.HOST}/allcomment/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });

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
          this.$axios.delete(`${this.$settings.HOST}/allcomment/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
              this.getcommentList()
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
