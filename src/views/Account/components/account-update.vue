<template>
  <div class="body">
    <div class="account">
      <el-form
        :model="form"
        :rules="rules"
        :hide-required-asterisk="true"
        status-icon
        ref="formRef"
      >
        <el-form-item label="账户" prop="username" label-width="100px">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword" label-width="100px">
          <el-input v-model="form.oldPassword" autocomplete="off" placeholder="请输入原密码" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" label-width="100px">
          <el-input v-model="form.newPassword" autocomplete="off" placeholder="请输入新密码" />
        </el-form-item>
        <el-button type="primary" @click="updateClick">更新</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { updatePassword } from '@/services/modules/account'

//表单校验（账户名、密码）
//1.准备表单对象
const form = ref({
  username: '',
  oldPassword: '',
  newPassword: ''
})

//2.规则对象
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  oldPassword: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
  newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }]
}

//3.获取form实例做统一校验
const formRef = ref(null)
function updateClick() {
  formRef.value.validate(async (volid) => {
    console.log(volid)

    if (volid) {
      //网络请求
      await updatePassword(form.value).then((res) => {
        console.log(res.data.status)

        if (res.data.status === 201) {
          ElMessage.error('用户名或原密码错误')
        } else {
          ElMessage({ type: 'success', message: '修改成功' })
        }
      })
      //清空表单
      formRef.value.resetFields()
    }
  })
}
</script>

<style lang="less" scoped>
.body {
  padding: 0 20px 20px 20px;

  .el-form-item {
    border: 1px solid #c0c4cc;
    border-radius: 3px;

    &:deep(.el-input__wrapper) {
      box-shadow: none;
    }
    &:deep(.el-form-item__label) {
      display: block;
      text-align: center;
      font-weight: 600;
      border-right: 1px solid #c0c4cc;
    }
  }
  .el-button {
    width: 100%;
  }
}
</style>
