<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { useRouter } from 'vue-router'
import Router from '@/router'
import { message } from 'ant-design-vue'
import { reqLogin } from '@/api/register-login/index'
import Vcode from 'vue3-puzzle-vcode'
import userStore from '@/stores/user'
//管理员路由表
import { adminRouter } from '@/router/adminRouter'
//用户路由表
import { userRouter } from '@/router/userRouter'

const router = useRouter()
//更改页面标题
document.title = '图书管理系统-登录'
//表单数据
interface FormState {
  username: string
  password: string
  remember: boolean
}
//获取表单
const formRef = ref()

//控制滑动验证组件是否显示
let isShow = ref(false)
const key = 'updatable'
const success = () => {
  isShow.value = false
  message.loading({ content: '登录中...', key })
  //验证成功，发送请求
  setTimeout(async () => {
    let res = await reqLogin(formState)
    if (res.code === 200) {
      //登录成功
      message.success({ content: res.msg, key, duration: 2 })
      //保存token
      localStorage.setItem('bookToken', res.token)
      localStorage.setItem('book-user-id', res.userID as string)
      userStore()
        .getUser(res.userID as number)
        .then((res) => {
          //注册路由
          if (res) {
            Router.addRoute(adminRouter)
          } else {
            Router.addRoute(userRouter)
          }
          //跳转页面
          router.push('/')
        })
    } else {
      //登录失败
      message.error({ content: res.msg, key, duration: 2 })
    }
  }, 1000)
}

const formState = reactive<FormState>({
  username: 'admin',
  password: '123456',
  remember: false
})
//表单校验
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      min: 2,
      max: 20,
      message: '2-20个字符',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: '6-20个字符',
      trigger: 'blur'
    }
  ]
}
//登录按钮回调函数

const onSubmit = async () => {
  try {
    await formRef.value.validate()
    //显示登录验证组件
    isShow.value = true
  } catch (err) {
    console.log(err)
  }
}
</script>
<script lang="ts">
export default {
  name: 'Login'
}
</script>

<template>
  <div class="login">
    <!-- 滑动验证组件 -->
    <Vcode :show="isShow" @close="isShow = false" @success="success"></Vcode>
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#3f51b5'
        }
      }"
    >
      <a-card
        title="登录"
        :bordered="false"
        style="width: 400px"
        hoverable
        :headStyle="{ color: '#3f51b5' }"
      >
        <a-form
          ref="formRef"
          name="basic"
          autocomplete="off"
          :model="formState"
          :rules="rules"
        >
          <a-form-item name="username">
            <a-input
              placeholder="请输入账号"
              v-model:value="formState.username"
            >
              <template #prefix
                ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input>
          </a-form-item>

          <a-form-item name="password">
            <a-input-password
              placeholder="请输入密码"
              v-model:value="formState.password"
            >
              <template #prefix
                ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
              /></template>
            </a-input-password>
          </a-form-item>

          <a-form-item name="remember">
            <a-checkbox v-model:checked="formState.remember"
              >记住密码</a-checkbox
            >
            <span
              style="float: right; color: var(--main-color)"
              @click="router.push('/register')"
              >注册</span
            >
          </a-form-item>

          <a-form-item id="btn-form">
            <a-button
              type="primary"
              html-type="submit"
              shape="round"
              style="width: 200px; height: 40px"
              @click="onSubmit"
              >登录</a-button
            >
          </a-form-item>
          <a-divider>其他方式登录</a-divider>
          <div class="qq-weixin">
            <img
              src="@/assets/img/QQ.png"
              alt=""
              @click="message.warning('还未开发,请换种方式注册', 1)"
            />
            <img
              src="@/assets/img/weixin.png"
              alt=""
              @click="message.warning('还未开发,请换种方式注册', 1)"
            />
          </div>
        </a-form>
      </a-card>
    </a-config-provider>
  </div>
</template>

<style scoped lang="less">
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/beijing.jpg') center;
  background-size: cover;
  .ant-card {
    // 卡片样式
    position: absolute;
    top: 50%;
    right: 5%;
    transform: translateY(-50%);
    .ant-checkbox-wrapper {
      color: var(--main-color);
    }
    :deep(#btn-form) {
      text-align: center;
    }
    .qq-weixin {
      display: flex;
      justify-content: center;
      img {
        width: 30px;
        margin: 0 15px;
      }
    }
  }
}
</style>
