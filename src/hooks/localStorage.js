//存储token
export function setToken(token) {
  // 存储复杂数据类型必须装换成 JSON 字符串来存储
  localStorage.setItem('token', JSON.stringify(token))
}

//获取token
export async function getToken() {
  //JSON.parse 可以将JSON字符串转为对象形式
  const res = await JSON.parse(localStorage.getItem('token'))
  return res
}

//删除token
export function delToken() {
  localStorage.removeItem('token')
}
