<script setup lang="ts">
import user from '@/stores/user'
import { ref, reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import Upload from '@/components/upload/index.vue'
import { updataUser } from '@/api/user/index'
import { message } from 'ant-design-vue'

const userStores = user()

//表单内容
const formState = reactive({
  username: '',
  password: '',
  name: '',
  isAdministrator: 0,
  sex: '男',
  avatar: ''
})
//表单元素
const FormEl = ref()
//控制对话框
const open = ref(false)
const id = Number(localStorage.getItem('book-user-id'))
//确认按钮回调
const handleOk = () => {
  //表单验证
  FormEl.value
    .validateFields()
    .then(async () => {
      //验证通过
      open.value = false
      //发送请求
      let res = await updataUser(id, formState)
      if (res.code === 200) {
        message.success('修改成功', 2)
        //重新获取信息
        userStores.getUser(id)
      }
    })
    .catch((err) => {
      //验证失败
      console.log(err)
    })
}
//头像地址
let picture = ref('')
//上传头像回调
const uploadSuccess = (url: string) => {
  if (url) {
    formState.avatar = url
  }
}
//表单验证规则
const publicRules = { required: true, message: '不能为空' }
const rules: Record<string, Rule[]> = {
  username: [publicRules, { min: 2, max: 20, message: '长度为2-20个字符' }],
  password: [publicRules, { min: 6, max: 20, message: '长度为6-20个字符' }],
  name: [publicRules, { min: 2, max: 20, message: '长度为2-20个字符' }],
  avatar: [publicRules]
}
//修改按钮回调
const uploadBtn = () => {
  open.value = true
  //移除表单校验结果
  FormEl.value?.clearValidate()
  const { name, username, password, sex, avatar, isAdministrator } = userStores
  formState.name = name
  formState.username = username
  formState.password = password
  formState.sex = sex
  formState.avatar = avatar
  formState.isAdministrator = isAdministrator
  picture.value = avatar
}
</script>
<script lang="ts">
export default {
  name: 'User'
}
</script>
<template>
  <div class="user">
    <div class="avatar">
      <img :src="userStores.avatar" alt="" />
    </div>
    <div class="box">
      <div class="name">
        <div class="title">姓名:</div>
        <span>{{ userStores.name }}</span>
      </div>
      <div class="name">
        <div class="title">账号:</div>
        <span>{{ userStores.username }}</span>
      </div>
      <div class="name">
        <div class="title">密码:</div>
        <span>{{ userStores.password }}</span>
      </div>
      <div class="name">
        <div class="title">身份:</div>
        <span>{{ userStores.isAdministrator ? '管理员' : '普通用户' }}</span>
      </div>
      <div class="name">
        <div class="title">性别:</div>
        <span>{{ userStores.sex }}</span>
      </div>
      <div class="btn">
        <a-button type="primary" @click="uploadBtn">修改</a-button>
      </div>
    </div>
    <!-- 对话框 -->
    <a-modal v-model:open="open" title="修改" @ok="handleOk">
      <!-- 表单 -->
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rules"
        ref="FormEl"
      >
        <a-form-item label="账号" name="username">
          <a-input v-model:value="formState.username" disabled />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <!-- <a-form-item label="身份">
          <a-select
            ref="select"
            style="width: 120px"
            v-model:value="formState.isAdministrator"
          >
            <a-select-option :value="0">普通用户</a-select-option>
            <a-select-option :value="1">管理员</a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="性别">
          <a-radio-group name="radioGroup" v-model:value="formState.sex">
            <a-radio value="男">男</a-radio>
            <a-radio value="女">女</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="头像" name="avatar">
          <Upload
            @uploadSuccess="uploadSuccess"
            :imgSrc="picture"
            :open="{ open }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.user {
  width: 100%;
  height: 100%;
  .avatar {
    img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      margin: auto;
    }
  }
  .box {
    margin-top: 10px;
    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin: 10px 0;
      color: var(--main-wenzi1);
      .title {
        width: 80px;
        height: 100%;
        text-align: center;
      }
      span {
        width: 100px;
        height: 100%;
      }
    }
    .btn {
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
