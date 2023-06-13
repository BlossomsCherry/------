<template>
  <div class="login">
    <div class="container">
      <div class="head">
        <div class="title">图书管理系统</div>
      </div>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item label="账号" prop="username" label-width="55px">
          <el-input v-model="ruleForm.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password" label-width="55px">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="loginClick">立即登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer" @click="giteeClick">Gitee</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import Mock from 'mockjs'
import Cookie from 'js-cookie'
// import { getMenu } from '@/services/modules/index'
import useLayoutStore from '@/stores/layout'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { login } from '@/services/modules/account'

const layoutStore = useLayoutStore()
const { menu } = storeToRefs(layoutStore)

const router = useRouter()
const ruleForm = ref({
  password: '',
  username: '',
  giteeId: ''
})

//自定义校验规则
const rules = {
  username: { required: true, message: '账号不能为空', trigger: 'blur' },
  password: { required: true, message: '账号不能为空', trigger: 'blur' }
}

//统一校验/登录
const ruleFormRef = ref(null)
function loginClick() {
  // const { username } = ruleForm.value
  ruleFormRef.value.validate(async (volid) => {
    console.log(volid)

    if (volid) {
      Cookie.set('username', ruleForm.value.username)

      //判断是否用的gitee账号登录
      if (ruleForm.value.username.length === 8) {
        ruleForm.value.giteeId = ruleForm.value.username
        ruleForm.value.username = ''
      }
      login(ruleForm.value)
        .then((res) => {
          console.log(res)

          if (res.data.data.manager === 2 || res.data.data.manager === 1) {
            menu.value = res.data.data.manager === 2 ? 2 : 1
            Cookie.set('menu', menu.value)

            //跳转到首页
            router.push('/')
            ElMessage({ type: 'success', message: '登录成功' })

            // 存储token
            Cookie.set('token', 'asldhglajsldjflasjdf')
          } else {
            ElMessage.error('用户名或密码错误')
          }
        })
        .catch((err) => {
          console.log(err)
          ElMessage.error('用户名或密码错误')
        })

      // getMenu(account, password).then(async ({ data }) => {
      //   console.log(data)

      //   //判断是否登录成功
      //   if (data.code === 20000 || data.code === 10000) {
      //     menu.value = data.code === 20000 ? 2 : 1
      //     Cookie.set('menu', menu.value)

      //     //跳转到首页
      //     router.push('/')
      //     ElMessage({ type: 'success', message: '登录成功' })

      //     //存储token
      //     Cookie.set('token', data.data.token)
      //   } else {
      //     ElMessage.error('用户名或密码错误')
      //   }
      // })
      //随机数生成token信息
      // const token = Mock.Random.guid()
      // console.log(token)
      //token信息存入cookie用于不通页面的通信
      // Cookie.set('token', token)
    }
  })
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .container {
    width: 340px;
    height: 400px;
    border-radius: 5px;
    box-shadow: 0 21px 41px 0 rgba(0, 0, 0, 0.2);

    .footer {
      text-align: center;
      font-size: 22px;
      color: #1baeae;
      cursor: pointer;
    }
    .head {
      padding: 30px;
      margin-bottom: 40px;
      .title {
        font-size: 28px;
        color: #1baeae;
        font-weight: 700;
        text-align: center;
      }
    }

    .el-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-form-item {
        height: 40px !important;
        width: 70% !important;
        align-items: center;
      }

      &:deep(.el-form-item__content) {
        margin: 0 !important;
      }
      .el-button {
        width: 100% !important;
        height: 40px;
        color: #fff;
        background-color: #1baeae;
        border-color: #1baeae;
      }
    }
  }
}
</style>
