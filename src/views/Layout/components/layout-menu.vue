<template>
  <div class="menu">
    <el-menu
      :default-active="`${route.path}`"
      class="el-menu-vertical-demo"
      background-color="rgb(84, 92, 101)"
      text-color="#fff"
      :router="true"
      :collapse="isCollapsed"
    >
      <div class="head">{{ !isCollapsed ? '图书后台管理系统' : '后台' }}</div>
      <el-menu-item index="/layout">
        <el-icon><i-ep-HomeFilled /></el-icon>
        <template #title>
          <span>首页</span>
        </template>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>
          <el-icon><i-ep-Menu /></el-icon>
          <span>书籍管理</span>
        </template>

        <el-menu-item-group v-if="menu === 2">
          <el-menu-item index="/addBook"> 添加图书 </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="/search"> 图书查询 </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-sub-menu index="3" v-if="menu === 2">
        <template #title>
          <i class="iconfont icon-leftfont-83"></i>
          <span>图书借阅</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/borrow"> 借阅图书 </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="/repay"> 归还图书 </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>

      <el-menu-item index="/user" v-if="menu === 2">
        <el-icon><i-ep-UserFilled /></el-icon>
        <template #title>用户管理</template>
      </el-menu-item>

      <el-sub-menu index="4">
        <template #title>
          <el-icon><i-ep-setting /></el-icon>
          <span>设置</span>
        </template>

        <el-menu-item-group>
          <el-menu-item index="/account"> 账户管理 </el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <el-menu-item index="/me"> 个人中心 </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useLayoutStore from '@/stores/layout'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import Cookie from 'js-cookie'

const route = useRoute()
const layoutStore = useLayoutStore()
const { isCollapsed, tabsList, menu } = storeToRefs(layoutStore)

watch(route, (newValue) => {
  //判断有无重复添加
  const index = tabsList.value.findIndex((item) => item.name === newValue.meta.title)
  if (index === -1) {
    tabsList.value.push({
      name: newValue.meta.title,
      path: newValue.path
    })
    Cookie.set('tag', tabsList.value)
  }
})
</script>

<style lang="less" scoped>
.menu {
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    border: 0;
    height: 100%;
    .head {
      height: 60px;
      font-size: 18px;
      color: #fff;
      line-height: 60px;
      text-align: center;
      overflow: hidden;
      -webkit-line-clamp: 1; //当属性值为3，表示超出3行隐藏
      cursor: default;
    }
    .icon-leftfont-83 {
      margin: 0 10px 0 5px;
      font-size: 13px;
    }
  }
}
</style>
