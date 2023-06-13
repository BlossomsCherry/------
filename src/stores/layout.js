import { defineStore } from 'pinia'
import Cookie from 'js-cookie'

const useLayoutStore = defineStore('layout', {
  state: () => ({
    //侧边栏展示
    isCollapsed: false,

    //面包屑
    tabsList: [
      {
        name: '首页',
        path: '/layout'
      }
    ],

    //权限
    menu: Cookie.get('menu') - 0
  })
})

export default useLayoutStore
