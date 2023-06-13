import { defineStore } from 'pinia'
import { getUser, addUser, editUser } from '@/services/modules/user'

const useUserStore = defineStore('user', {
  state: () => ({
    isShow: false,
    userMessage: [
      {
        name: 'Admin',
        title: '超级管理员',
        img: '../assets/image/user.jpg'
      },
      {
        name: '用户',
        title: '普通用户',
        img: '../assets/image/common.jpg'
      }
    ],

    userList: [],
    //分页码
    page: 1
  }),
  actions: {
    //获取用户数据
    async fetchGetUser(page) {
      const res = await getUser(page)
      // this.userList = await res.data.list
      this.userList = await res.data.list.map((item) => {
        if (item.sex !== '男' || item.sex !== '女') {
          item.sex = item.sex === 0 ? '女' : '男'
        }
      })
      return res
    },

    //添加用户
    async fetchAddUser(data) {
      const res = await addUser(data)
      // this.userList = res

      return res
    },

    //编辑用户信息
    async fetchEditUser() {
      const res = await editUser()
      this.userList = await res.data.list.map((item) => {
        if (item.sex !== '男' || item.sex !== '女') {
          item.sex = item.sex === 0 ? '女' : '男'
        }
      })
    }
  }
})

export default useUserStore
