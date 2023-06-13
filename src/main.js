import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './mock'

import './assets/css/index.css'
import 'normalize.css'
import './assets/icon/iconfont.css'
import Cookie from 'js-cookie'

const app = createApp(App)

//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookie.get('token')

  //如果token不存在，说明用户未登录，应该跳转到登录页
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else if (token && to.name === 'login') {
    //token存在说明用户登录了，此时跳转到首页
    next({ name: 'layout' })
  } else {
    next()
  }
})
app.use(createPinia())
app.use(router)

app.mount('#app')
