import { defineStore } from 'pinia'
import {
  getBook,
  getBookId,
  deleteBook,
  getBookAuthor,
  getBookTitle,
  addBooks,
  borrowMessage
} from '@/services/modules/books'

const useBookStore = defineStore('book', {
  state: () => ({
    booksList: [],
    borrowMessage: [],

    //分页码
    page: 1
  }),
  actions: {
    //   获取图书信息
    async fetchGetBooks(page) {
      const res = await getBook(page)
      this.booksList = res.data.data

      return res
    },

    //搜索图书
    async fetchGetBooksId(id) {
      const res = await getBookId(id)
      const newBooks = []

      newBooks.push(res.data.data)
      this.booksList = newBooks

      return res
    },
    async fetchGetBooksTitle(title) {
      const res = await getBookTitle(title)
      this.booksList = res.data.data

      return res
    },
    async fetchGetBooksAuthor(author) {
      const res = await getBookAuthor(author)
      this.booksList = res.data.data

      return res
    },

    //   删除图书
    async fetchDeleteBook(id) {
      const res = await deleteBook(id)
      // this.booksList = res.data.data

      return res
    },

    //   添加图书
    async fetchAddBooks(data) {
      const res = await addBooks(data)
      // this.booksList = res.data.data

      return res
    },

    //   获取借阅信息
    async fetchBorrowMessage(page) {
      const res = await borrowMessage(page)
      this.borrowMessage = res.data.data.map((item) => {
        let obj = {}
        obj = {
          id: item.id,
          bookId: item.bookId,
          bookName: item.bookName,
          username: item.username,
          status: item.status === 0 ? '已归还' : '未归还',
          borrowDate: item.borrowDate,
          returnDate: item.returnDate
        }
        return obj
      })

      return res
    }
  }
})

export default useBookStore
