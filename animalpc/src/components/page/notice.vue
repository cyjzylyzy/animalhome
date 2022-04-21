<template >
  <div>
    <span>宠物信息管理</span>
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormAdd">新增公告</el-button>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title"  label="标题"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="details"  label="内容"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.details}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="n_time"  label="时间"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.n_time}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope)">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改公告信息" :visible.sync="dialogFormEdit">
        <el-form>
          <el-form-item label="标题">
            <el-input v-model="notice.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="notice.details" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input v-model="notice.time" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="edit(notice)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加用户信息" :visible.sync="dialogFormAdd">
        <el-form :model="notice">
          <el-form-item label="标题">
            <el-input v-model="notice.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="notice.details" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input v-model="notice.n_time" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="add(notice)">确 定</el-button>
        </div>
      </el-dialog>

  </div>

</template>

<script>
export default {
  name: "notice",
  data() {
      return {
        tableData: [],
        dialogFormEdit:false,
        dialogFormAdd:false,
        notice:{
          id:'',
          title:'',
          details:'',
          n_time:'',

        }
      };
    },
  created(){
          this.getNoticeList();
  },
  methods: {
        getNoticeList:function (){

            this.$axios.get(`${this.$settings.HOST}/notice/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });

        },
   add(notice){
      let params = new URLSearchParams()
      params.append('title',notice.title)
      params.append('details',notice.details)
      params.append('n_time',notice.n_time)
      this.$axios.post(`${this.$settings.HOST}/notice/`,params).then(res=>{
        if (res.data.success == true){
          this.$message.success('添加成功')
          this.dialogFormAdd=false
          this.getNoticeList()
        }
      })
        .catch(function (error) {
        console.log(error)
      })

    },
    edit(notice){
      let params = new URLSearchParams()
      params.append('title',notice.title)
      params.append('details',notice.details)
      params.append('n_time',notice.n_time)
      this.$axios.put(`${this.$settings.HOST}/notice/`,params).then(res=>{
        if (res.data.success==true){
          this.$message.success('添加成功')
          this.dialogFormEdit=false
          this.getNoticeList()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    hanleEdit(scope){
      this.dialogFormEdit = true
      this.notice.id = scope.row.id
      this.notice.title = scope.row.title
      this.notice.details = scope.row.details
      this.notice.time = scope.row.time
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
          this.$axios.delete(`${this.$settings.HOST}/notice/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
              this.getNoticeList()
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
