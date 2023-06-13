import axios from 'axios'

const httpRequest = axios.create({
  baseURL: '/api',
  timeout: 5000
})

//请求拦截器
httpRequest.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return err
  }
)

//响应拦截器
httpRequest.interceptors.response.use(
  (config) => {
    return config
  },
  (err) => {
    return err
  }
)
export default httpRequest
