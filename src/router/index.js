import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      redirect: '/layout'
    },
    //一级路由
    {
      path: '/layout',

      component: () => import('@/views/Layout/index.vue'),
      //二级路由
      children: [
        {
          path: '',
          component: () => import('@/views/Home/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/shop',
          component: () => import('@/views/Shop/index.vue'),
          meta: {
            title: '图书管理'
          }
        },
        {
          path: '/account',
          component: () => import('@/views/Account/index.vue'),
          meta: {
            title: '账户'
          }
        },
        {
          path: '/me',
          component: () => import('@/views/Account/components/account-me.vue'),
          meta: {
            title: '个人中心'
          }
        },
        {
          path: '/addBook',
          component: () => import('@/views/Shop/components/books-add.vue'),
          meta: {
            title: '添加图书'
          }
        },
        {
          path: '/search',
          component: () => import('@/views/Shop/components/books-search.vue'),
          meta: {
            title: '图书查询'
          }
        },
        {
          path: '/borrow',
          component: () => import('@/views/Shop/components/books-borrow.vue'),
          meta: {
            title: '借阅图书'
          }
        },
        {
          path: '/repay',
          component: () => import('@/views/Shop/components/books-repay.vue'),
          meta: {
            title: '归还图书'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    }
  ]
})

export default router
