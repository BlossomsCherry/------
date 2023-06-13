<template>
  <div class="borrow">
    <div class="box">
      <div class="head">
        <h1>图书借阅</h1>
      </div>
      <div class="body">
        <el-form
          label-width="100px"
          status-icon
          :hide-required-asterisk="true"
          :model="ruleForm"
          :rules="rules"
          ref="ruleFormRef"
        >
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="ruleForm.userId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="图书编号" prop="bookId">
            <el-input v-model="ruleForm.bookId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="借阅日期" prop="borrowDate">
            <el-input v-model="ruleForm.borrowDate" autocomplete="off" />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="borrowBtn" @click="borrowClick" style="width: 70%"
          >借阅</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { borrowAdd } from '@/services/modules/books'

const date = new Date()
//格式化借阅日期
const time = dayjs(date).format('YYYY-MM-DD')

//归还日期
const newTime = dayjs(time).add(3, 'month')
const ruleForm = ref({
  userId: '',
  bookId: '',
  borrowDate: time,
  status: 1,
  returnDate: dayjs(newTime).format('YYYY-MM-DD')
})

//校验规则
const rules = {
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  bookId: [{ required: true, message: '请输入图书ID', trigger: 'blur' }],
  borrowDate: [{ required: true, message: '请输入日期', trigger: 'blur' }]
}

const ruleFormRef = ref(null)
function borrowClick() {
  ruleFormRef.value.validate((volid) => {
    console.log(volid)

    if (volid) {
      //网络请求
      borrowAdd(ruleForm.value).then((res) => {
        console.log(res)
      })
      ruleFormRef.value.resetFields()
    }
  })
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  margin-top: 30px;
  border-radius: 5px;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  .head {
    margin: 40px 0;
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:deep(.el-input) {
      width: 300px;
    }
    &:deep(.el-input__wrapper) {
      border-radius: 0;
    }
    &:deep(.el-form-item__label) {
      border: 1px solid #dcdfe6;
      border-right: 0;
    }

    .borrowBtn {
      margin: 30px 0 50px 0;
    }
  }
}
</style>
