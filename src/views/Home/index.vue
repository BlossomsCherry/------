<template>
  <div class="home">
    <el-row class="row">
      <el-col :span="8">
        <home-left :table-data="tableData" :table="table"></home-left>
      </el-col>
      <el-col :span="16">
        <el-row>
          <home-total :count-data="count"></home-total>
        </el-row>
        <el-row style="height: 280px; background-color: #fff; margin-bottom: 20px">
          <!-- 折线图 -->
          <div ref="mainRef" style="height: 280px; width: 100%"></div>
          <!-- <home-pic1 :order-data="orderData"></home-pic1> -->
        </el-row>
        <el-row style="height: 300px">
          <el-col :span="12" style="background-color: #fff; margin-right: 10px">
            <!-- 柱状图 -->
            <div ref="mainRef2" style="height: 300px; width: 100%"></div>
          </el-col>
          <el-col :span="12" style="background-color: #fff; flex: 1; margin-left: 10px">
            <!-- 饼状图 -->
            <div ref="mainRef3" style="height: 300px; width: 100%"></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getData } from '@/services/modules/home'
import useHomeStore from '@/stores/home'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import homeLeft from './components/home-left.vue'
import homeTotal from './components/home-total.vue'
// import homePic1 from './components/home-pic1.vue'

const homeStore = useHomeStore()
const { tableData } = storeToRefs(homeStore)

const table = {
  name: '课程',
  todayBuy: '今日购买',
  monthBuy: '本月购买',
  totalBuy: '总购买'
}

const mainRef = ref(null)
const mainRef2 = ref(null)
const mainRef3 = ref(null)

const count = ref()
const orderData = ref({})
const userData = ref([])
const videoData = ref([])

onMounted(async () => {
  const xAxisData = ref([])

  //发送网络请求
  await homeStore.fetchGetData().then(async (res) => {
    count.value = await res.data.data.countData
    orderData.value = await res.data.data.orderData
    userData.value = await res.data.data.userData
    videoData.value = await res.data.data.videoData

    xAxisData.value = Object.keys(orderData.value.data[0])
  })

  //折线图
  //初始化echarts实列
  const myChart = echarts.init(mainRef.value)

  const series = []
  const color = ['#0f78f4', '#dd536b', '#9462e5', '#e1bb22', '#ccc', '#3ed1cf']

  xAxisData.value.forEach((key, index) => {
    series.push({
      name: key,
      data: orderData.value.data.map((item) => item[key]),
      type: 'line',
      stack: 'x',
      areaStyle: {
        color: color[index],
        opacity: key === 1 ? 1 : 0.5
      }
    })
  })

  //指定图标的配置项和数据
  const option = {
    xAxis: {
      data: xAxisData.value
    },
    yAxis: {},
    series: series,
    legend: {
      data: xAxisData.value
    }
  }

  // console.log(series)

  //使用指定的配置项和数据显示图表
  myChart.setOption(option)

  //柱状图
  //创建实例
  const myChart2 = echarts.init(mainRef2.value)

  const option2 = {
    xAxis: {
      type: 'category',
      data: userData.value.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: '#17b3a3'
        }
      },
      axisLabel: {
        interval: 0,
        color: '#333'
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3'
        }
      }
    },
    color: ['#2ec7c9', '#b6a2de'],
    series: [
      {
        name: '新增用户',
        type: 'bar',
        data: userData.value.map((item) => item.new)
      },
      {
        name: '活跃用户',
        type: 'bar',
        data: userData.value.map((item) => item.active)
      }
    ],
    legend: {
      // 图例文字颜色
      textStyle: {
        color: '#333'
      }
    },
    grid: {
      left: '20%'
    },
    // 提示框
    tooltip: {
      trigger: 'axis'
    }
  }

  myChart2.setOption(option2)

  //饼状图
  const myChart3 = echarts.init(mainRef3.value)

  const option3 = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'top',
      data: videoData.value.map((item) => item.name)
    },
    series: [
      {
        type: 'pie',
        radius: [20, 140],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
          borderRadius: 5
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: videoData.value
      }
    ]
  }

  myChart3.setOption(option3)
})

getData().then((res) => {
  console.log(res)
})
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .row {
    margin-top: 30px;
    height: 100%;
  }
}
</style>
