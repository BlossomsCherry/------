<template>
  <div class="total">
    <template v-for="(item, index) in countData" :key="index">
      <div class="item">
        <div class="icon" :style="{ backgroundColor: item.color }">
          <el-icon><i-ep-Notebook /></el-icon>
        </div>
        <div class="right">
          <p class="price">{{ item.value }}</p>
          <p class="text">{{ item.name }}</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  countData: {
    type: Array
  }
})
</script>

<style lang="less" scoped>
.total {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    display: flex;
    width: 270px;
    margin: 0 20px 20px 0;
    background-color: #fff;
    justify-content: start;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .icon {
      display: flex;
      width: 80px;
      height: 80px;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: #2ec7c9;
      i {
        font-size: 30px;
      }
    }
    .right {
      display: flex;
      padding-left: 15px;
      flex-direction: column;
      justify-content: space-around;
      .price {
        font-size: 26px;
      }
      .text {
        color: #666;
      }
    }
  }
}
</style>
