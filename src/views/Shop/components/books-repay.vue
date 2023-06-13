<template>
  <div class="repay">
    <div class="box">
      <div class="head">
        <h1>归还图书</h1>
      </div>
      <div class="body">
        <el-form
          label-width="100px"
          :hide-required-asterisk="true"
          :model="ruleForm"
          :rules="rules"
          style="max-width: 460px"
          ref="ruleFormRef"
        >
          <el-form-item label="用户ID" prop="userId">
            <el-input v-model="ruleForm.userId" />
          </el-form-item>
          <el-form-item label="图书编号" prop="bookId">
            <el-input v-model="ruleForm.bookId" />
          </el-form-item>
          <el-form-item label="归还日期" prop="returnDate">
            <el-input v-model="ruleForm.returnDate" />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="borrowBtn" @click="repayClick" style="width: 70%"
          >归还</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import { borrowUpdate, borrowMessage } from '@/services/modules/books'

const date = new Date()
const time = dayjs(date).format('YYYY-MM-DD')

const newTime = dayjs(time).subtract(3, 'month')
const ruleForm = ref({
  userId: '',
  bookId: '',
  returnDate: time,
  borrowDate: dayjs(newTime).format('YYYY-MM-DD'),
  status: 0
})

//校验规则
const rules = {
  userId: [{ required: true, message: '请输入用户ID', trigger: 'blur' }],
  bookId: [{ required: true, message: '请输入图书ID', trigger: 'blur' }],
  returnDate: [{ required: true, message: '请输入日期', trigger: 'blur' }]
}

const ruleFormRef = ref(null)
async function repayClick() {
  const borrowData = ref([])
  await borrowMessage().then((res) => {
    borrowData.value = res.data.data
    console.log(borrowData.value)

    function filterBy(obj) {
      return obj.bookId == ruleForm.value.bookId && obj.userId == ruleForm.value.userId
    }

    const result = borrowData.value.filter((item) => filterBy(item))
    console.log(result)
  })

  ruleFormRef.value.validate((volid) => {
    console.log(volid)

    if (volid) {
      borrowUpdate(ruleForm.value)
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
