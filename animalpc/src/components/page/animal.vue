<template>
  <div >
    <span>宠物信息管理</span>
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormAdd=true">新增宠物</el-button>
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id"  label="编号"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="imgurl"  label="商品图片"  width="auto">
          <template v-slot:default="scope">
            <img :src="scope.row.imgurl" min-width="100" height="100">
          </template>
        </el-table-column>
        <el-table-column prop="name"  label="宠物昵称"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age"  label="年龄"  width="auto" >
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
        <el-table-column prop="vaccine"  label="免疫"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.vaccine}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="repellent"  label="驱虫"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.repellent}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sterilization"  label="绝育"  width="auto">
          <template v-slot:default="scope">
            <span>{{ scope.row.sterilization}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sterilization"  label="操作"  width="auto">
          <el-button type="text" size="small" @click="hanleEdit(scope)">编辑</el-button>
          <el-button type="text" size="small" @click="hanleDel(scope)">删除</el-button>
        </el-table-column>
      </el-table>
      <el-dialog title="修改宠物信息" :visible.sync="dialogFormEdit">
        <el-form :model="animals">
          <el-form-item label="宠物昵称">
            <el-input v-model="animals.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="animals.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="animals.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="种类">
            <el-input v-model="animals.category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="免疫">
            <el-input v-model="animals.vaccine" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="驱虫">
            <el-input v-model="animals.repellent" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="绝育">
            <el-input v-model="animals.sterilization" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEdit = false">取 消</el-button>
          <el-button type="primary" @click="edit(animals)">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加宠物信息" :visible.sync="dialogFormAdd">
        <el-form :model="animals">

          <el-form-item label="宠物昵称">
            <el-input v-model="animals.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="animals.age" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="animals.gender" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="种类">
            <el-input v-model="animals.category" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="免疫">
            <el-input v-model="animals.vaccine" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="驱虫">
            <el-input v-model="animals.repellent" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="绝育">
            <el-input v-model="animals.sterilization" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormAdd = false">取 消</el-button>
          <el-button type="primary" @click="add(animals)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
export default {
  name: "animal",
  data() {
      return {
        tableData: [],
        dialogFormEdit: false,
        dialogFormAdd: false,
        animals:{
          id :'',
          name :'',
          age :'',
          gender :'',
          category :'',
          vaccine :'',
          repellent :'',
          sterilization :'',
        }
      };
    },
  created(){
          this.getAniamlList();
  },
  methods: {
        getAniamlList:function (){

            this.$axios.get(`${this.$settings.HOST}/animalinfo/`,{}).then(response => {
              this.tableData = response.data;
            }).catch(error=>{
              console.log(error.response)
            });

        },
    add(animals){
      let params = new URLSearchParams()
      params.append('name',animals.name)
      params.append('age',animals.age)
      params.append('gender',animals.gender)
      params.append('category',animals.category)
      params.append('vaccine',animals.vaccine)
      params.append('repellent',animals.repellent)
      params.append('sterilization',animals.sterilization)
      this.$axios.post(`${this.$settings.HOST}/animalinfo/`,params).then(res=>{
        if (res.data.success == true){
          this.$message.success('添加成功')
          this.dialogFormAdd=false
          this.getAniamlList()
        }
      })
        .catch(function (error) {
        console.log(error)
      })

    },
    edit(animals){
      let params = new URLSearchParams()
      params.append('name',animals.name)
      params.append('age',animals.age)
      params.append('gender',animals.gender)
      params.append('category',animals.category)
      params.append('vaccine',animals.vaccine)
      params.append('repellent',animals.repellent)
      params.append('sterilization',animals.sterilization)
      this.$axios.put(`${this.$settings.HOST}/animal/`+scope.row.id+`/`,params).then(res=>{
        if (res.data.success==true){
          this.$message.success('添加成功')
          this.dialogFormEdit=false
          this.getAniamlList()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    hanleEdit(scope){

      this.animals.id = scope.row.id
      this.animals.name = scope.row.name
      this.animals.age = scope.row.age
      this.animals.gender = scope.row.gender
      this.animals.category = scope.row.category
      this.animals.vaccine = scope.row.vaccine
      this.animals.repellent = scope.row.repellent
      this.animals.sterilization = scope.row.sterilization
      this.dialogFormEdit = true

    },
    hanleDel(scope){
          console.log(scope.row.id)
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
          this.$axios.delete(`${this.$settings.HOST}/animal/`+scope.row.id+`/`).then(res=>{
            if (res.data.success==true){
              this.$message.success('删除成功')
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
