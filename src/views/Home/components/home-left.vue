<template>
  <div class="left">
    <div class="user">
      <div class="head">
        <img src="@/assets/image/user.jpg" alt="" />
        <div class="name">
          <h3>{{ userMessage[index].name }}</h3>
          <span>{{ userMessage[index].title }}</span>
        </div>
      </div>
      <div class="body">
        <span>上次登录时间</span>
        <span>上次登录地点</span>
      </div>
    </div>
    <div class="list">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column
          v-for="(value, key) in table"
          :key="key"
          :prop="key"
          :label="value"
          width="120"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import useUserStore from '@/stores/user'
import useLayoutStore from '@/stores/layout'
import { storeToRefs } from 'pinia'

defineProps({
  tableData: {
    type: Array
  },
  table: {
    type: Object,
    default: () => ({})
  }
})

const layoutStore = useLayoutStore()
const userStore = useUserStore()
const { userMessage } = storeToRefs(userStore)
const { menu } = storeToRefs(layoutStore)

const index = menu.value === 2 ? 0 : 1
</script>

<style lang="less" scoped>
.left {
  display: flex;
  height: 100%;
  flex-direction: column;
  .user {
    flex: 0.33;
    margin: 0 20px 20px 0;
    border-radius: 5px;
    background-color: #fff;

    .head {
      padding: 20px 0;
      margin: 0 10px;
      display: flex;
      border-bottom: 1px solid #ccc;
      align-items: center;
      img {
        margin: 0 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
      .name {
        flex: 1;
        h3 {
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        span {
          font-size: 16px;
          color: #666;
        }
      }
    }
    .body {
      display: flex;
      padding: 25px 10px;
      flex-direction: column;

      span {
        color: #666;
        &:first-child {
          padding-bottom: 15px;
        }
      }
    }
  }
  .list {
    flex: 1;
    background-color: #fff;
    padding: 0 10px;
    min-height: 100px;
    margin-right: 20px;
    border-radius: 5px;
  }
}
</style>
