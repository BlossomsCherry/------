<template>
  <div class="header">
    <div class="icon">
      <el-button type="primary" color="#fff" @click="isCollapse">
        <el-icon><i-ep-Menu /></el-icon>
      </el-button>
    </div>
    <div class="bread">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/' }">首页 </el-breadcrumb-item>
        <el-breadcrumb-item v-if="route.path !== '/layout'" :to="{ path: `${route.path}` }"
          >{{ route.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown>
        <img src="@/assets/image/user.jpg" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/me">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import useLayoutStore from '@/stores/layout'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import Cookie from 'js-cookie'

const route = useRoute()
const router = useRouter()

const layoutStore = useLayoutStore()
const { isCollapsed } = storeToRefs(layoutStore)

//决定侧边栏显示和隐藏
function isCollapse() {
  isCollapsed.value = !isCollapsed.value
}

watch(route, (newValue) => {
  console.log(newValue.path)
})

//退出
function logout() {
  //清除token
  Cookie.remove('token')
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 60px;
  background-color: #333;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  .icon {
    display: flex;
    margin-left: 15px;
    width: 43px;
    height: 30px;
    border-radius: 5px;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    .el-icon {
      font-size: 20px;
      color: #000;
    }
  }
  .bread {
    flex: 1;
    margin-left: 20px;
    &:deep(.el-breadcrumb__inner) {
      color: #999;
      cursor: pointer;
    }
    &:deep(.el-breadcrumb__inner.is-link) {
      font-weight: 400;
      // color: #fff;
    }
  }
  .right {
    width: 50px;
    padding-right: 20px;
    img {
      width: 100%;
      border-radius: 50px;
      cursor: pointer;
    }
  }
}
</style>
