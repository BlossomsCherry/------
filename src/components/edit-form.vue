<template>
  <div class="hidden">
    <div class="layer" ref="layerRef">
      <h2>更新用户</h2>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div class="left">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" autocomplete="off" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select placeholder="男" v-model="ruleForm.sex">
              <el-option label="男" value="shanghai" />
              <el-option label="女" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model.number="ruleForm.address" placeholder="请输入地址" />
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="ruleForm.age" autocomplete="off" placeholder="请输入年龄" />
          </el-form-item>
          <el-form-item label="出生日期" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>

        <div class="bottom">
          <el-button @click="onSubmit">取消</el-button>
          <el-button type="primary" @click="submit">确认</el-button>
        </div>
        <div class="icon" @click="hiddenLayer">
          <el-icon><i-ep-Close /></el-icon>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useUserStore from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const userStore = useUserStore()
const { isShow } = storeToRefs(userStore)

//隐藏表单
function hiddenLayer() {
  isShow.value = false
}

//取消
function onSubmit() {
  isShow.value = false
}

//1.准备表单对象
const ruleForm = ref({
  name: '',
  sex: '',
  address: '',
  age: '',
  date: ''
})

//2.配置规则对象
const rules = {
  name: [
    {
      required: true,
      message: '姓名不能为空',
      trigger: 'blur'
    }
  ],
  sex: [
    {
      required: true,
      message: '请选择性别',
      trigger: 'change'
    }
  ],
  address: [
    {
      required: true,
      message: '地址不能为空',
      trigger: 'blur'
    }
  ],
  age: [
    {
      validator: (rule, value, callback) => {
        console.log('年龄', value)

        let age = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/ //年龄是1-120之间有效

        if (value && value.length > 0) {
          if (!age.test(value)) {
            callback([new Error('年龄输入不合法')])
          } else {
            callback()
          }
        } else if (value.length === 0) {
          callback(new Error('年龄不能为空'))
        }
      },
      required: true
    }
  ],
  date: [
    {
      required: true,
      message: '请选择出生日期',
      trigger: 'blur'
    }
  ]
}

//3.统一校验
const ruleFormRef = ref(null)
async function submit() {
  //调用实例方法
  //volid是一个布尔值  当条件满足时输出true，否则为false
  ruleFormRef.value.validate((volid) => {
    console.log(volid)

    if (volid) {
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      isShow.value = false
    }
  })
}
</script>

<style lang="less" scoped>
.hidden {
  background-color: rgba(0, 0, 0, 0.2);
  .layer {
    position: absolute;
    top: 128px;
    right: 27%;
    width: 45%;
    height: 280px;
    background-color: #fff;
    z-index: 9999;
    h2 {
      margin: 20px;
      font-weight: 400;
    }
    .el-form {
      position: relative;
      display: flex;
      padding: 0 24px;

      &:deep(.el-form-item__content) {
        display: block;
        width: 80px;
      }
      &:deep(.el-input__wrapper) {
        width: 180px;
      }
      .left {
        flex: 1;
        .el-select {
          width: 100%;
        }
      }
      .right {
        flex: 1;
      }
      .bottom {
        position: absolute;
        right: 30px;
        bottom: -45px;
      }
      .icon {
        position: absolute;
        top: -50px;
        right: 16px;
        font-size: 18px;
        color: #666;
        cursor: pointer;
      }
    }
  }
}
</style>
