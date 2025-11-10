<script setup lang="ts">
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'
import type { Rule } from 'ant-design-vue/es/form'
import { reqRegister } from '@/api/register-login/index'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
//更改页面标题
document.title = '图书管理系统-注册'
//表单数据
interface FormState {
  username: string
  password: string
}
//获取表单
const formRef = ref()

const formState = reactive<FormState>({
  username: '',
  password: ''
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
//注册按钮回调函数
const key = 'updatable'
const onSubmit = async () => {
  try {
    await formRef.value.validate()
    message.loading({ content: '注册中...', key })
    setTimeout(async () => {
      let res = await reqRegister(formState)
      if (res.code === 200) {
        message.success({ content: res.msg, duration: 2, key })
      } else {
        message.error({ content: res.msg, duration: 2, key })
      }
    }, 1000)
  } catch (err) {
    console.log(err)
  }
}
</script>
<script lang="ts">
export default {
  name: 'Register'
}
</script>

<template>
  <div class="register">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#3f51b5'
        }
      }"
    >
      <a-card
        title="注册"
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

          <a-form-item>
            <span
              style="float: right; color: var(--main-color)"
              @click="router.push('/login')"
              >去登录</span
            >
          </a-form-item>

          <a-form-item id="btn-form">
            <a-button
              type="primary"
              html-type="submit"
              shape="round"
              style="width: 200px; height: 40px"
              @click="onSubmit"
              >注册</a-button
            >
          </a-form-item>
          <a-divider>其他方式注册</a-divider>
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
.register {
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
