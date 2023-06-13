import axios from 'axios'

const httpRequest = axios.create({
  baseURL: 'http://10.131.140.99/book',
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
    // config = config.data.data
    return config
  },
  (err) => {
    return err
  }
)

/**
 * 获取图书信息(无需传参)
 */
export function getBook(current) {
  return httpRequest({
    url: '/page',
    params: {
      current,
      size: 20
    }
  })
}

/**
 * 根据图书id获取图书信息
 * @param bookId
 *  */
export function getBookId(id) {
  return httpRequest({
    url: '/id',
    params: {
      bookId: id
    }
  })
}

/**
 * 根据作者获取图书信息
 * @param keyword
 *  */
export function getBookAuthor(author) {
  return httpRequest({
    url: '/author',
    params: {
      keyword: author
    }
  })
}

/**
 * 根据书名获取图书信息
 * @param keyword
 *  */
export function getBookTitle(title) {
  return httpRequest({
    url: '/title',
    params: {
      keyword: title
    }
  })
}

/**
 * 删除图书
 * @param id
 */

export function deleteBook(id) {
  return httpRequest({
    url: '',
    method: 'DELETE',
    params: {
      bookId: id
    }
  })
}

/**
 * 添加图书
 * @data title,author,published,total
 */

export function addBooks(data) {
  return httpRequest({
    url: '',
    method: 'post',
    data
  })
}

const httpRequest2 = axios.create({
  baseURL: 'http://10.131.140.99/bookOrder',
  timeout: 5000
})

/* *
 * 查看借阅信息(无需传参)
 */
export function borrowMessage() {
  return httpRequest2({
    url: '/all'
  })
}

/**
 *  新增借阅记录( 前端无需提供图书名和用户名 后端会根据图书id和用户id自动填充)
 * @data bookId, userId, borrowDate,status, borrowDate
 */

export function borrowAdd(data) {
  return httpRequest2({
    url: '',
    method: 'post',
    data
  })
}

/**
 *  修改借阅记录( 前端无需提供图书名和用户名 后端会根据图书id和用户id自动填充)
 * @data bookId, userId, borrowDat,status, borrowDate
 */

export function borrowUpdate(data) {
  return httpRequest2({
    url: '',
    method: 'put',
    data
  })
}

/**
 *  删除借阅记录
 * @data bookId, userId, borrowDate
 */

export function borrowDelete(orderId) {
  return httpRequest2({
    url: '',
    method: 'delete',
    params: {
      orderId
    }
  })
}
