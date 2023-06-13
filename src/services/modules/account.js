import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'http://10.131.140.99/user',
  timeout: 5000
})

//普通用户名登录  data:  username,password
export function login(data) {
  return httpRequest({
    url: '/login',
    method: 'POST',
    data
  })
}

//修改密码  data:username,oldPassword,newPassword
export function updatePassword(data) {
  return httpRequest({
    url: '/password',
    method: 'put',
    data
  })
}

//注册   data: id(用户名),password(密码),manager(权限)
export function signAccount(data) {
  return httpRequest({
    url: '/register',
    method: 'POST',
    data
  })
}

//Gitee授权登录
//向后端发送code,获取用户信息
export function getToken(code) {
  return httpRequest({
    url: '/auth',
    params: {
      code
    }
  })
}

//Gitee绑定
export function getBind(token, username) {
  return httpRequest({
    url: '/gitee/bind',
    params: {
      token,
      username
    }
  })
}

// 获取Gitee 用户数据：GET
export function getAccountMessage(token) {
  return httpRequest({
    url: '/gitee/info',
    params: {
      token
    }
  })
}
