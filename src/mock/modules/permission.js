import Mock from 'mockjs'
export default {
  getMenu: (config) => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'layout',
              label: '首页',
              url: 'Home.vue'
            },
            {
              path: '/shop',
              name: 'shop',
              label: '书籍管理',
              url: 'Mall.vue'
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              url: 'User.vue'
            },
            {
              path: '/addBook',
              name: 'book',
              label: '添加图书',
              url: 'User.vue'
            },
            {
              path: '/search',
              name: 'search',
              label: '图书查询',
              url: 'User.vue'
            },
            {
              path: '/borrow',
              name: 'borrow',
              label: '借阅图书',
              url: 'User.vue'
            },
            {
              path: '/repay',
              name: 'repay',
              label: '归还图书',
              url: 'User.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === '0000' && password === '0000') {
      return {
        code: 10000,
        data: {
          menu: [
            {
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
              url: 'Home.vue'
            },
            {
              path: '/video',
              name: 'video',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall.vue'
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}
