<template>
  <div class="body">
    <div class="sign">
      <el-form
        :model="form"
        :hide-required-asterisk="true"
        :rules="rules"
        status-icon
        ref="formRef"
      >
        <el-form-item label="账户" prop="username" label-width="100px">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="100px">
          <el-input v-model="form.password" placeholder="请输入用密码" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限" prop="manager" label-width="100px">
          <el-input v-model="form.manager" placeholder="管理员为2   用户为1" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="signClick">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { signAccount } from '@/services/modules/account'

//表单校验（账户名、密码）
//1.准备表单对象
const form = ref({
  username: '',
  password: '',
  manager: 1
})

//2.规则对象
const rules = {
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  manager: [{ required: true, message: '请选择权限', trigger: 'blur' }]
}

//3.获取form实例做统一校验
const formRef = ref(null)
function signClick() {
  formRef.value.validate(async (volid) => {
    console.log(volid)
    if (volid) {
      await signAccount(form.value).then((res) => {
        console.log(res)
      })
      //清空表单
      formRef.value.resetFields()

      ElMessage({ type: 'success', message: '注册成功' })
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
