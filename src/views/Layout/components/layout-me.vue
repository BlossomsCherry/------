<template>
  <div class="me">
    <div class="user" @mousemove="enterUser" @mouseleave="leaveUser" ref="userRef">
      <img src="@/assets/image/user.jpg" alt="" />
    </div>

    <div class="bottom" ref="bottomRef" @mouseenter="enterUser" @mouseleave="leaveUser">
      <div class="head">
        <h2>name</h2>
        <p class="id">ID:</p>
      </div>
      <div class="body">
        <el-collapse accordion="true">
          <el-collapse-item title="个人账号" name="1">
            <div class="message">
              <div class="item">
                <span>邮箱：</span>
                <a href="javascript:;"></a>
              </div>
              <div class="item">
                <span>GitHub: </span>
                <a href="https://github.com/BlossomsCherry/small-rabbit.git"> BlossomsCherry</a>
              </div>
              <div class="item">
                <span>Gitee: </span>
                <a href="https://gitee.com/changantuanzi"> @changantuanzi</a>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="个人介绍" name="2">
            <div class="introduce">立身贞固，内含玉润，外表澜清！</div>
          </el-collapse-item>
          <el-collapse-item title="修改信息" name="3">
            <div class="update">
              <el-button type="primary">修改密码</el-button>
              <el-button type="primary">修改用户名</el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="footer">
        <i class="iconfont icon-tuichu"></i>
        <span @click="confirm">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const bottomRef = ref(null)
const userRef = ref(null)
function enterUser() {
  bottomRef.value.style.display = 'block'
  userRef.value.style.width = '80px'
  userRef.value.style.height = '80px'
  userRef.value.style.top = '11px'
  userRef.value.style.boxShadow = ' 0 0 0 2px rgba(255, 255, 255, 1)'
}
function leaveUser() {
  bottomRef.value.style.display = 'none'
  userRef.value.style.width = '34px'
  userRef.value.style.height = '34px'
  userRef.value.style.top = '10px'
  userRef.value.style.boxShadow = ' 0 0 0  1px rgba(255, 255, 255, 1) '
}
</script>

<style lang="less" scoped>
.user {
  position: absolute;
  top: 10px;
  right: 191px;
  width: 34px;
  height: 34px;
  border-radius: 100px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 1);
  transition: all 0.5s;
  z-index: 9999999;
  box-sizing: border-box;

  img {
    width: 100%;
    border-radius: 100px;
  }

  &:hover {
    width: 80px;
    height: 80px;
    top: 11px;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 1);
  }
}
.bottom {
  display: none;
  position: absolute;
  top: 58px;
  right: 82px;
  width: 305px;
  height: 450px;
  transition: all 0.5s;
  border-radius: 10px;
  color: var(--primary-color);
  background-color: #fff;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 999;

  //隐藏滚动条
  &::-webkit-scrollbar {
    display: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .head {
    margin: 45px 0;
    width: 100%;
    height: 32px;
    text-align: center;
    cursor: pointer;

    .id {
      margin-top: 10px;
    }
  }

  .body {
    position: relative;
    padding: 0 10px;
    cursor: pointer;

    &:deep(.el-collapse-item__header) {
      font-weight: 600;
      color: #666;
    }

    &:deep(.el-collapse-item) {
      padding-left: 20px;
    }

    .message {
      display: flex;
      font-size: 16px;
      // color: skyblue;
      flex-direction: column;

      .item {
        display: flex;
        align-items: center;

        span {
          width: 70px;
        }

        a {
          color: pink;
          font-size: 16px;

          &:hover {
            color: var(--primary-color);
          }
        }
      }
    }

    .introduce {
      font-size: 14px;
      text-align: center;
      color: pink;
    }

    .update {
      display: flex;
      padding-top: 10px;
      justify-content: center;
    }
  }

  .footer {
    display: flex;
    margin: 50px 0;
    justify-content: center;
    align-items: center;

    i {
      margin-right: 15px;
      font-size: 22px;
    }

    span {
      border: 0;
      font-size: 20px;
      color: var(--primary-color);
      cursor: pointer;
    }
  }
}
</style>
