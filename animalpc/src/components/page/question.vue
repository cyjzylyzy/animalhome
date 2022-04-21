<template>
<div>
    <span>题库管理</span>
    <el-button type="primary" icon="el-icon-plus" @click="">新增问题</el-button>
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
        <el-table-column prop="answer_A"  label="A"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.answer_A}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="answer_B"  label="B "  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.answer_B}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="answer_C"  label="C"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.answer_C}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="answer_D"  label="D"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.answer_D}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="current_ans"  label="正确答案"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.current_ans}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope.row)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="修改题目信息" :visible.sync="dialogFormEdit">
        <el-form :model="question">
          <el-form-item label="标题">
            <el-input v-model="question.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="A">
            <el-input v-model="question.answer_A" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="B">
            <el-input v-model="question.answer_B" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="C">
            <el-input v-model="question.answer_C" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input v-model="question.answer_D" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="正确答案">
            <el-input v-model="question.current_ans" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="edit(question)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加题目信息" :visible.sync="dialogFormAdd">
        <el-form :model="question">
          <el-form-item label="标题">
            <el-input v-model="question.title" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="A">
            <el-input v-model="question.answer_A" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="B">
            <el-input v-model="question.answer_B" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="C">
            <el-input v-model="question.answer_C" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input v-model="question.answer_D" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="正确答案">
            <el-input v-model="question.current_ans" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="add(question)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: "question",
  data() {
      return {
        tableData: [],
        dialogFormEdit: false,
        dialogFormAdd: false,
        question:{
          id :'',
          title :'',
          answer_A :'',
          answer_B :'',
          answer_C :'',
          answer_D :'',
          current_ans :'',
        }
      };
    },
  created(){
          this.getquestionList();
  },
  methods: {
        getquestionList:function (){

            this.$axios.get(`${this.$settings.HOST}/question/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });

        },
    add(question){
      let params = new URLSearchParams()
      params.append('title',question.title)
      params.append('answer_A',question.answer_A)
      params.append('answer_B',question.answer_B)
      params.append('answer_C',question.answer_C)
      params.append('answer_D',question.answer_D)
      params.append('current_ans',question.current_ans)

      this.$axios.post(`${this.$settings.HOST}/question/`,params).then(res=>{
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
    edit(question){
      let params = new URLSearchParams()
      params.append('title',question.title)
      params.append('answer_A',question.answer_A)
      params.append('answer_B',question.answer_B)
      params.append('answer_C',question.answer_C)
      params.append('answer_D',question.answer_D)
      params.append('current_ans',question.current_ans)
      this.$axios.put(`${this.$settings.HOST}/question/`,params).then(res=>{
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
      this.question.id = scope.row.id
      this.question.answer_A = scope.row.answer_A
      this.question.answer_B = scope.row.answer_B
      this.question.answer_C = scope.row.answer_C
      this.question.answer_D = scope.row.answer_D
      this.question.current_ans = scope.row.current_ans
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
          this.$axios.delete(`${this.$settings.HOST}/question/`+scope.row.id+`/`).then(res=>{
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
