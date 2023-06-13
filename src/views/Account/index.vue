<template>
  <div class="login">
    <div class="wrapper">
      <div class="head">
        <div class="left" @click="accountClick">
          <h3>账户</h3>
        </div>
        <div class="right" @click="signClick">
          <h3>注册</h3>
        </div>
        <div class="bottom" ref="bottomRef"></div>
      </div>
      <div class="body">
        <account-update v-if="!isChange"></account-update>
        <account-sign v-if="isChange"></account-sign>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useLayoutStore from '@/stores/layout'
import 'element-plus/theme-chalk/el-message.css'
import accountSign from './components/account-sign.vue'
import accountUpdate from './components/account-update.vue'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

const layoutStore = useLayoutStore()
const { menu } = storeToRefs(layoutStore)
//账户
const isChange = ref(false)
const bottomRef = ref(null)
function accountClick() {
  bottomRef.value.style.left = 100 + 'px'
  isChange.value = false
}
//注册
function signClick() {
  if (menu.value === 1) {
    ElMessage.error('您没有该权限')
    return
  }
  bottomRef.value.style.left = 237 + 'px'
  isChange.value = true
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  margin-top: 30px;
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  justify-content: center;

  .wrapper {
    width: 380px;
    background-color: #fff;

    .head {
      position: relative;
      display: flex;
      margin: 30px 0;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .bottom {
        position: absolute;
        top: 26px;
        left: 100px;
        width: 42px;
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        transition: all 0.4s;
      }
      .left {
        margin-right: 100px;
        h3 {
          // border-bottom: 3px solid var(--primary-color);
          line-height: 1;
          font-size: 18px;
          font-weight: 400;
          color: #333;
          text-align: center;
        }
      }
      .right {
        h3 {
          // border-bottom: 1px solid #f5f5f5;
          font-size: 18px;
          font-weight: 400;
          color: #333;
          text-align: center;
        }
      }
    }

    .body {
      padding: 0 20px 20px 20px;
    }
  }
}
</style>
