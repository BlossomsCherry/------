import { defineStore } from 'pinia'
import { getData } from '@/services/modules/home'

const useHomeStore = defineStore('home', {
  state: () => ({
    tableData: [],
    countData: [],
    orderData: []
  }),
  actions: {
    async fetchGetData() {
      const res = await getData()
      this.tableData = res.data.data.tableData
      return res
    },

    async fetchCountData() {
      const res = await getData()
      this.countData = res.data.data.countData
    },

    async fetchOrderData() {
      const res = await getData()
      this.countData = res.data.data.orderData
    }
  }
})

export default useHomeStore
