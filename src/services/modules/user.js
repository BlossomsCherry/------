import httpRequest from '../request'

//获取用户数据
export function getUser(page) {
  //返回用户列表
  return httpRequest({
    url: '/user/getUser',
    params: {
      page: page,
      limit: 20
    }
  })
}

//新增用户
export function addUser(data) {
  return httpRequest({
    url: '/user/add',
    method: 'POST',
    data
  })
}

//编辑
export function editUser(id, name, addr, age, birth, sex) {
  return httpRequest({
    url: '/user/edit',
    method: 'POST',
    data: {
      id,
      name,
      addr,
      age,
      birth,
      sex
    }
  })
}

//删除用户
export function deleteUser() {
  return httpRequest({
    url: '/user/delete',
    method: 'POST',
    data: {}
  })
}
