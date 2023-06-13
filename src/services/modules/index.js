import httpRequest from '../request'

export function getMenu(username, password) {
  return httpRequest({
    url: '/permission/getMenu',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
