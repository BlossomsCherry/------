<template>
  <div class="search">
    <!-- 搜素模块 -->
    <div class="head">
      <el-form ref="formRef" label-width="100px" class="ruleForm">
        <el-form-item label-width="10">
          <span>条件搜索: </span>
          <el-select
            v-model="value"
            class="select"
            placeholder="请选择"
            size="default"
            @change="selectValue"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item prop="search" label-width="10">
          <el-input type="text" v-model="data" autocomplete="off" />
        </el-form-item>
        <el-button type="primary" @click="searchClick">搜索</el-button>
        <el-button type="primary" @click="clearClick()">清空</el-button>
      </el-form>

      <el-button type="primary" @click=";(drawer = true), detailBorrow()">查看借阅</el-button>
    </div>

    <div class="table" lazy>
      <el-table :data="booksList" stripe style="width: 100%">
        <el-table-column prop="id" label="图书编号" width="180" />
        <el-table-column prop="title" label="图书名称" width="180" />
        <el-table-column prop="author" label="作者" width="180" />
        <el-table-column prop="publisher" label="出版社" width="180" />
        <el-table-column prop="lend" label="余量" width="100" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 抽屉 -->
    <el-drawer
      v-if="menu === 2"
      v-model="drawer"
      direction="ttb"
      size="50%"
      title="借阅信息"
      :with-header="false"
    >
      <el-table :data="borrowMessage" stripe style="width: 100%">
        <el-table-column prop="id" label="借阅证号" width="180" />
        <el-table-column prop="bookId" label="图书ID" width="180" />
        <el-table-column prop="bookName" label="图书名称" width="180" />
        <el-table-column prop="username" label="用户" width="180" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-button text style="color: red">
              {{ scope.row.status }}
            </el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态" width="180" /> -->
        <el-table-column prop="borrowDate" label="借阅日期" width="180" />
        <el-table-column prop="returnDate" label="应还日期" />
      </el-table>
    </el-drawer>

    <div class="page">
      <el-pagination background layout="prev, pager, next" @current-change="nowPage" :total="200" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useLayoutStore from '@/stores/layout'
import useBookStore from '@/stores/books'
import { storeToRefs } from 'pinia'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const layoutStore = useLayoutStore()
const { menu } = storeToRefs(layoutStore)
//抽屉
const drawer = ref(false)

const bookStore = useBookStore()
const { booksList, page, borrowMessage } = storeToRefs(bookStore)

const value = ref()
const options = [
  {
    value: '图书编号',
    label: '图书编号'
  },
  {
    value: '图书名称',
    label: '图书名称'
  },
  {
    value: '作者',
    label: '作者'
  }
]

//发送网络请求
bookStore.fetchGetBooks(page.value)

//搜索
const formRef = ref(null)
const data = ref()

//select的值：图书编号、图书名称、作者
const selectType = ref()
function selectValue(type) {
  selectType.value = type
  console.log(selectType.value)
}

function searchClick() {
  if (!data.value) return

  //根据select值的不同发送不同的网络请求
  if (selectType.value === '图书编号') {
    bookStore.fetchGetBooksId(data.value)
  } else if (selectType.value === '图书名称') {
    bookStore.fetchGetBooksTitle(data.value).then((res) => {
      console.log(res.data.data)
      console.log(booksList.value)
    })
  } else {
    bookStore.fetchGetBooksAuthor(data.value)
  }
}

//清空表单
function clearClick() {
  if (!data.value) return
  data.value = ''
  bookStore.fetchGetBooks(page.value)
}

//删除图书
async function handleDelete(index, row) {
  console.log(index, row.id)
  if (menu.value === 1) {
    ElMessage.error('您没有该权限')
    return
  }
  ElMessage({
    type: 'success',
    message: '删除成功'
  })

  await bookStore.fetchDeleteBook(row.id)
  //删除后重新渲染
  bookStore.fetchGetBooks(page.value)
}

//编辑
function handleEdit() {
  if (menu.value === 1) {
    ElMessage.error('您没有该权限')
    return
  }
}
//查看借阅
function detailBorrow() {
  if (menu.value === 1) {
    ElMessage.error('您没有该权限')
    return
  }
  bookStore.fetchBorrowMessage()
}

//分页
function nowPage(value) {
  console.log(value)
  page.value = value
  //重新发送网络请求
  bookStore.fetchGetBooks(page.value)
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  .ruleForm {
    display: flex;

    span {
      margin-right: 10px;
      color: #333;
    }
    .el-button {
      margin-left: 5px;
      border-color: #27ba9b;
      background-color: #27ba9b;
    }
  }
}
.table {
  border-radius: 5px;
  &:deep(.cell) {
    text-align: center;
  }
}

.page {
  display: flex;
  padding-right: 20px;
  height: 50px;
  background-color: #fff;
  justify-content: end;
}
</style>
