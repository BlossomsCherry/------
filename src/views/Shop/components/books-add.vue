<template>
  <div class="add">
    <div class="head">
      <h1>添加书籍</h1>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="ruleForm.isbn" autocomplete="off" />
      </el-form-item>
      <el-form-item label="图书名称" prop="title">
        <el-input v-model="ruleForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="ruleForm.author" />
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="ruleForm.publisher" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm">重置 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useBookStore from '@/stores/books'
import { ElMessage } from 'element-plus'

const bookstore = useBookStore()

const ruleForm = ref({
  isbn: '',
  title: '',
  author: '',
  publisher: '',
  pubDate: '2006-6-3',
  price: 28.0,
  total: 100
})

//校验规则
const rules = {
  isbn: [{ required: true, message: '请填入图书ID', trigger: 'blur' }],
  title: [{ required: true, message: '请填入图书名称', trigger: 'blur' }],
  author: [{ required: true, message: '作者不能为空', trigger: 'blur' }],
  publisher: [{ required: true, message: '出版社不能为空', trigger: 'blur' }]
}

const ruleFormRef = ref(null)

//统一校验
function submitForm() {
  ruleFormRef.value.validate((volid) => {
    console.log(volid)

    if (volid) {
      bookstore.fetchAddBooks(ruleForm.value).then((res) => {
        console.log(res)
      })

      ElMessage({
        type: 'success',
        message: '添加成功'
      })

      console.log(ruleForm.value)
      //清空表单
      ruleFormRef.value.resetFields()
    }
  })
}

//清空表单
function resetForm() {
  ruleFormRef.value.resetFields()
}
</script>

<style lang="less" scoped>
.add {
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  .head {
    margin: 15px 0;
    h1 {
      font-weight: 400;
    }
  }
}
</style>
