import httpRequest from '../request'

//首页数据
export function getData() {
  return httpRequest({
    url: '/home/getData'
  })
}
