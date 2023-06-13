<template>
  <div class="me" ref="meRef">
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="clearfix">
              <span>个人中心</span>
            </div>
            <div class="name-role">
              <span class="sender">Admin</span>
            </div>
            <div class="registe-info"></div>
            <el-divider></el-divider>
            <div class="personal-relation">
              <div class="relation-item">
                QQ邮箱:
                <div style="float: right; padding-right: 20px">2234867838</div>
              </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">
                个人简介:
                <div style="float: right; padding-right: 20px"></div>
              </div>
            </div>
            <div class="personal-relation">
              <div class="relation-item">
                Gitee绑定:
                <div
                  style="float: right; padding-right: 20px; color: #27ba9b; cursor: pointer"
                  @click="giteeClick"
                >
                  点击绑定
                </div>
              </div>
            </div>
            <el-button type="primary" style="margin-left: 125px" @click="updateClick"
              >更改个人信息</el-button
            >
          </el-card>
        </div>
      </el-col>
      <el-col :span="16" v-if="isShow">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div class="clearfix" style="margin-bottom: 20px">
              <span>基本资料</span>
            </div>
            <div>
              <el-form label-width="80px" size="small" label-position="right">
                <el-form-item label="用户昵称" prop="nickName">
                  <el-input auto-complete="off" v-model="dataForm.username"></el-input>
                </el-form-item>
                <el-form-item label="个人简介" prop="phone">
                  <el-input auto-complete="off" v-model="dataForm.phone"></el-input>
                </el-form-item>
              </el-form>
              <div class="dialog-footer">
                <el-button size="default" type="primary">提交</el-button>
                <el-button size="default" type="warning">关闭</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { getToken } from '@/services/modules/account'
import useAccountStore from '@/stores/account'
import useLayoutStore from '@/stores/layout'
import { storeToRefs } from 'pinia'
import { getBind } from '@/services/modules/account'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import Cookie from 'js-cookie'

const layoutStore = useLayoutStore()
const { menu } = storeToRefs(layoutStore)

const accountStore = useAccountStore()
const { token } = storeToRefs(accountStore)
const route = useRoute()

console.log(route.query.code)

//获取token
getToken(route.query.code).then(async (res) => {
  console.log(res)
  token.value = res.data.data.accessToken

  const username = Cookie.get('username')
  //当前用户绑定Gitee
  await getBind(token.value, username)

  //获取用户信息
  accountStore.fetchAccountMessage(token.value).then((res) => {
    console.log(res)
  })
})

const dataForm = ref({
  username: '',
  phone: '',
  homeUrl: ''
})

//gitee授权
function giteeClick() {
  const authorize_uri = 'https://gitee.com/oauth/authorize'
  const client_id = '8e3e44e237892aef9c1bfd1d3b2f5395b45483433707fc1391028975a1e736ee'
  const redirect_uri = 'http://localhost:5173/me'

  window.location.href = `${authorize_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`
}

//更新个人信息
const meRef = ref(null)
const isShow = ref(false)
function updateClick() {
  if (menu.value === 1) {
    ElMessage.error('您没有该权限')
    return
  }
  isShow.value = !isShow.value
}
</script>

<style lang="less" scoped>
//卡片样式
.me {
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
    font-size: 22px;
    font-weight: 600;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }
  //文本样式区
  .name-role {
    font-size: 22px;
    padding: 5px;
    text-align: center;
  }
  .sender {
    text-align: center;
  }
  .registe-info {
    text-align: center;
    padding-top: 10px;
  }
  .personal-relation {
    font-size: 16px;
    padding: 0px 5px 15px;
    margin-right: 1px;
    width: 100%;
  }

  .relation-item {
    padding: 12px;
  }
  .dialog-footer {
    padding-top: 10px;
    padding-left: 10%;
  }
  //布局样式区
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
}
</style>
