<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto">
        <!-- 左侧菜单栏 -->
        <layout-menu></layout-menu>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 头部 -->
          <layout-header></layout-header>
        </el-header>
        <el-main>
          <!-- tag标签页 -->
          <el-tag
            v-for="(item, index) in tabsList"
            :key="item.name"
            class="mx-1"
            closable
            size="large"
            :effect="route.path === item.path ? 'dark' : 'plain'"
            @close="handleClose(index)"
            @click="tagClick(index)"
          >
            {{ item.name }}
          </el-tag>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useLayoutStore from '@/stores/layout'
import layoutMenu from './components/layout-menu.vue'
import layoutHeader from './components/layout-header.vue'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { setToken } from '@/hooks/localStorage'
import Cookie from 'js-cookie'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

const { tabsList } = storeToRefs(layoutStore)

// getToken().then((res) => {
//   console.log(res)
//   tabsList.value = res
// })
watch(tabsList.value, (newValue) => {
  setToken(newValue)
})
//关闭tag标签
function handleClose(index) {
  tabsList.value.splice(index, 1)
  Cookie.set('tag', tabsList.value)

  const length = tabsList.value.length
  if (length > 0) router.push(tabsList.value[length - 1].path)
}

//点击进行路由跳转
function tagClick(index) {
  router.push(tabsList.value[index].path)
}
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  .el-container {
    height: 100%;
    .el-aside {
      &::-webkit-scrollbar {
        display: none;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
    }
    .el-header {
      padding: 0;
    }
    .el-main {
      background-color: #e5e5e580;
      .el-tag.is-closable {
        margin-right: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
