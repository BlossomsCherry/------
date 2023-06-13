import { defineStore } from 'pinia'
import { getAccountMessage } from '@/services/modules/account'

const useAccountStore = defineStore('account', {
  state: () => ({
    isChange: false,

    accountMessage: {},
    token: ''
  }),

  actions: {
    //获取用户信息
    async fetchAccountMessage(token) {
      const res = await getAccountMessage(token)
      this.accountMessage = res

      return res
    }
  }
})

export default useAccountStore
