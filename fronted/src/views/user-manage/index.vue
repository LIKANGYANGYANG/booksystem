<script setup lang="ts">
//相关接口
import { getAllUser, addUser, updataUser, deleteUser } from '@/api/user/index'
import type { userData } from '@/api/user/type'
import { ref, onMounted, reactive, watch } from 'vue'
import dayjs from 'dayjs'
import { PlusOutlined } from '@ant-design/icons-vue'
import Upload from '@/components/upload/index.vue'
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'

const getUser = async () => {
  let res = await getAllUser()
  if (res.code === 200) {
    //把id换成key
    let json = JSON.parse(JSON.stringify(res.data).replace(/id/g, 'key'))
    data.value = json
  }
}
onMounted(() => {
  //获取用户数据
  getUser()
})
const columns: any = [
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center'
  },
  {
    title: '账号',
    dataIndex: 'username',
    align: 'center'
  },
  {
    title: '密码',
    dataIndex: 'password',
    align: 'center'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    align: 'center'
  },
  {
    title: '身份',
    dataIndex: 'isAdministrator',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: 'center'
  },
  {
    title: '修改时间',
    dataIndex: 'changeTime',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'isAdministrator',
    align: 'center'
  }
]
//表格要展示的数据
const data = ref<userData[]>([])
//控制对话框
const open = ref(false)
//对话框标题
let modalTitle = ref('')
//对话框，确认按钮回调
const handleOk = () => {
  // open.value = false
  FormEl.value
    .validateFields()
    .then(async () => {
      if (modalTitle.value === '添加用户') {
        let res = await addUser(formState)
        if (res.code === 200) {
          message.success(res.msg, 2)
          getUser()
        } else {
          message.error(res.msg, 2)
        }
      } else {
        let res = await updataUser(formState.key as number, formState)
        if (res.code === 200) {
          message.success(res.msg, 2)
          getUser()
        } else {
          message.error(res.msg, 1)
        }
      }

      open.value = false
    })
    .catch((err) => {
      console.log(err)
    })
  // console.log(formState)
}
//头像上传成功回调
const uploadSuccess = (imgUrl) => {
  formState.avatar = imgUrl
}
//表单对象类型
interface FormState {
  username: string
  password: string
  name: string
  avatar: string
  isAdministrator: number
  sex: string
  key?: number
}
//表单元素
const FormEl = ref()
//表单对象
const formState = reactive<FormState>({
  username: '',
  password: '',
  name: '',
  avatar: '',
  isAdministrator: 0,
  sex: '男'
})
//表单验证规则
const publicRules = { required: true, message: '不能为空' }
const rules: Record<string, Rule[]> = {
  username: [publicRules, { min: 2, max: 20, message: '长度为2-20个字符' }],
  password: [publicRules, { min: 6, max: 20, message: '长度为6-20个字符' }],
  name: [publicRules, { min: 2, max: 20, message: '长度为2-20个字符' }],
  avatar: [publicRules]
}
watch(
  () => formState.avatar,
  (newValue) => {
    if (newValue) {
      FormEl.value?.clearValidate('avatar')
    }
  }
)
//添加用户按钮回调
const addBtn = () => {
  open.value = true
  modalTitle.value = '添加用户'
  disabled.value = false
  Object.assign(formState, {
    username: '',
    password: '',
    name: '',
    avatar: '',
    isAdministrator: 0,
    sex: '男'
  })
  picture.value = ''
  //移除表单校验结果
  FormEl.value?.clearValidate()
}
//图书地址
let picture = ref('')
//是否禁用账号输入框
let disabled = ref(false)
//编辑按钮回调
const editBtn = (record) => {
  open.value = true
  modalTitle.value = '编辑用户'
  disabled.value = true
  Object.assign(formState, record)
  picture.value = record.avatar
}
//删除按钮回调
const confirm = async (id: number) => {
  let res = await deleteUser(id)
  if (res.code === 200) {
    message.success(res.msg, 2)
    getUser()
  } else {
    message.error(res.msg, 1)
  }
}
</script>
<script lang="ts">
export default {
  name: 'UserManage'
}
</script>

<template>
  <div class="user-manage">
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="false"
      style="background-color: var(--main-color1); color: var(--main-wenzi1)"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.title === '头像'">
          <img :src="record.avatar" alt="" id="avatar" />
        </template>
        <template v-if="column.title === '密码'">
          <a-input-password
            v-model:value="record.password"
            onfocus="this.blur();"
            style="background-color: var(--main-color1)"
            class="user-password"
          />
        </template>
        <template v-if="column.title === '身份'">
          <span>{{ record.isAdministrator ? '管理员' : '普通用户' }}</span>
        </template>
        <template v-if="column.title === '创建时间'">
          <span>{{
            dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')
          }}</span>
        </template>
        <template v-if="column.title === '修改时间'">
          <span>{{
            record.changeTime
              ? dayjs(record.changeTime).format('YYYY-MM-DD HH:mm:ss')
              : '0'
          }}</span>
        </template>
        <template v-if="column.title === '操作'">
          <template v-if="!record.isAdministrator">
            <a-tooltip>
              <template #title>编辑</template>
              <a-button type="primary" class="btn" @click="editBtn(record)">
                <i class="iconfont icon-bianji"></i>
              </a-button>
            </a-tooltip>

            <a-popconfirm
              title="你确认删除吗?"
              ok-text="确认"
              cancel-text="取消"
              @confirm="confirm(record.key)"
            >
              <a-button type="primary" danger class="btn">
                <i class="iconfont icon-shanchu"></i>
              </a-button>
            </a-popconfirm>
          </template>
          <template v-else>
            <span>不能操作管理员账号</span>
          </template>
        </template>
      </template>
      <template #title>
        <a-tooltip>
          <template #title>添加用户</template>
          <a-button type="primary" class="btn" @click="addBtn">
            <PlusOutlined />
          </a-button>
        </a-tooltip>
      </template>
      <template #footer>总计：{{ data.length }}&nbsp;&nbsp;个用户</template>
    </a-table>
    <!-- 对话框 -->
    <a-modal v-model:open="open" :title="modalTitle" @ok="handleOk">
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
          <a-input v-model:value="formState.username" :disabled="disabled" />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="身份">
          <a-select
            ref="select"
            style="width: 120px"
            v-model:value="formState.isAdministrator"
          >
            <a-select-option :value="0">普通用户</a-select-option>
            <a-select-option :value="1">管理员</a-select-option>
          </a-select>
        </a-form-item>
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
.user-manage {
  width: 100%;
  height: 100%;
  .btn {
    margin: 0px 10px;
  }
  #avatar {
    width: 100px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  ::v-deep(.ant-table-thead tr th) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
  ::v-deep(.ant-table-footer) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-input-affix-wrapper
        > input.ant-input
    ) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-input-affix-wrapper
        .anticon.ant-input-password-icon
    ) {
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-table-wrapper
        .ant-table-tbody
        > tr
        > td.ant-table-cell-row-hover
    ) {
    background: var(--main-hover);
  }
  ::v-deep(
      .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td
    ) {
    background: var(--main-hover);
  }
  ::v-deep(.user-password input) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
  ::v-deep(.ant-input-suffix .ant-input-password-icon) {
    color: var(--main-wenzi1);
  }
}
</style>
