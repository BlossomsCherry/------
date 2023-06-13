<template>
  <div id="main" ref="mainRef" style="height: 280px; width: 100%"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  orderData: {
    type: Object,
    default: () => ({})
  }
})
//折线图
const mainRef = ref(null)

onMounted(async () => {
  const xAxisData = ref([])
  //初始化echarts实列
  const myChart = echarts.init(mainRef.value)

  console.log('t', props.orderData.value?.data[0])
  xAxisData.value = Object.keys(props.orderData.value.data[0])

  const series = []
  const color = ['#0f78f4', '#dd536b', '#9462e5', '#e1bb22', '#ccc', '#3ed1cf']

  xAxisData.value.forEach((key, index) => {
    series.push({
      name: key,
      data: props.orderData.value.data.map((item) => item[key]),
      type: 'line',
      stack: 'x',
      areaStyle: {
        color: color[index],
        opacity: key === 1 ? 1 : 0.5
      }
    })
  })

  myChart.setOption({
    xAxis: {
      data: xAxisData.value
    },
    yAxis: {},
    series: series,
    legend: {
      data: xAxisData.value
    }
  })
})
</script>

<style lang="less" scoped></style>
