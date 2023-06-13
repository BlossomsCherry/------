<template>
  <div class="table">
    <el-table :data="userList" style="width: 100%" height="500" stripe empty-text="暂无数据">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="age" label="年龄" width="120" />
      <el-table-column prop="sex" label="性别" width="120" />
      <el-table-column prop="birth" label="出生日期" width="180" />
      <el-table-column prop="addr" label="地址" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="200" @current-change="NowPage" />
    </div>
  </div>
</template>

<script setup>
import useUserStore from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { page } = storeToRefs(userStore)

defineProps({
  userList: {
    type: Array
  }
})

//编辑
function handleEdit() {}

//删除
function handleDelete() {}

//分页
function NowPage(value) {
  page.value = value
  console.log('page:', page.value)
}
</script>

<style lang="less" scoped>
.page {
  display: flex;
  height: 50px;
  background-color: #fff;
  justify-content: end;
  z-index: 99;
}
</style>
