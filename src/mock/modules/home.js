// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          红楼梦: Mock.Random.float(100, 500, 0, 0),
          西游记: Mock.Random.float(100, 500, 0, 0),
          小王子: Mock.Random.float(100, 500, 0, 0),
          龙族: Mock.Random.float(100, 500, 0, 0),
          Java: Mock.Random.float(100, 500, 0, 0),
          Python: Mock.Random.float(100, 500, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '科学',
            value: 2999
          },
          {
            name: '文学',
            value: 5999
          },
          {
            name: '神学',
            value: 1500
          },
          {
            name: '自然',
            value: 1999
          },
          {
            name: '技术',
            value: 2200
          },
          {
            name: '生活',
            value: 4500
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: 5,
            active: 20
          },
          {
            date: '周二',
            new: 10,
            active: 50
          },
          {
            date: '周三',
            new: 12,
            active: 55
          },
          {
            date: '周四',
            new: 6,
            active: 80
          },
          {
            date: '周五',
            new: 6,
            active: 55
          },
          {
            date: '周六',
            new: 5,
            active: 77
          },
          {
            date: '周日',
            new: 33,
            active: 17
          }
        ],
        // 折线图
        orderData: {
          date: [
            '20191001',
            '20191002',
            '20191003',
            '20191004',
            '20191005',
            '20191006',
            '20191007'
          ],
          data: List
        },
        tableData: [
          {
            name: '老人与海',
            todayBuy: 50,
            monthBuy: 350,
            totalBuy: 2200
          },
          {
            name: '小王子',
            todayBuy: 30,
            monthBuy: 220,
            totalBuy: 2400
          },
          {
            name: '红楼梦',
            todayBuy: 80,
            monthBuy: 450,
            totalBuy: 6500
          },
          {
            name: '龙族',
            todayBuy: 120,
            monthBuy: 650,
            totalBuy: 4500
          },
          {
            name: 'Python',
            todayBuy: 30,
            monthBuy: 200,
            totalBuy: 3400
          },
          {
            name: 'JAVA',
            todayBuy: 350,
            monthBuy: 300,
            totalBuy: 2200
          }
        ],
        countData: [
          {
            name: '今日借阅',
            value: 12,
            icon: 'i-ep-Select',
            color: '#2ec7c9'
          },
          {
            name: '今日归还',
            value: 8,
            icon: 'i-ep-star',
            color: '#ffb980'
          },
          {
            name: '今日访问',
            value: 12,
            icon: 'i-ep-goods',
            color: '#5ab1ef'
          },
          {
            name: '本月借阅',
            value: 123,
            icon: 'i-ep-Select',
            color: '#2ec7c9'
          },
          {
            name: '本月归还',
            value: 210,
            icon: 'i-ep-star',
            color: '#ffb980'
          },
          {
            name: '本月访问',
            value: 1234,
            icon: 'i-ep-goods',
            color: '#5ab1ef'
          }
        ]
      }
    }
  }
}
