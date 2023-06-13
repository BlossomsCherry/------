<template>
  <div class="user">
    <div class="head">
      <el-button type="primary" @click="showLayer">+新增</el-button>

      <!-- form搜索 -->
      <el-form>
        <el-form-item><el-input /></el-form-item>
        <el-form-item> <el-button type="primary" @click="confirm">搜索</el-button> </el-form-item>
      </el-form>
    </div>
    <!-- 用户表单信息 -->
    <user-form v-if="isShow"></user-form>
    <!-- <edit-form></edit-form> -->

    <!-- 表格数据 -->
    <user-table :user-list="userList"></user-table>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useUserStore from '@/stores/user'
import userForm from './components/user-form.vue'
import userTable from './components/user-table.vue'
// import editForm from '@/components/edit-form.vue'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isShow, userList, page } = storeToRefs(userStore)

//发送网络请求，获取用户数据

userStore.fetchGetUser(page.value).then((res) => {
  console.log('user:', res.data.list)
  userList.value = res.data.list
})

//监听page的改变，重新渲染数据
watch(page, (newPage) => {
  userStore.fetchGetUser(newPage).then((res) => {
    userList.value = res.data.list
  })
})

//显示表单
function showLayer() {
  isShow.value = true
}

//搜索
function confirm() {}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  margin: 30px 0 20px 0;
  justify-content: space-between;
  .el-form {
    display: flex;
    flex-direction: row;
  }
}
</style>
