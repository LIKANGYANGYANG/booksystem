<script setup lang="ts">
import { ref, watch, reactive, nextTick } from 'vue'
import {
  reqGetBook,
  GetBookType,
  reqAddbook,
  deleteBook,
  patchBook,
  searchBook,
  searchType
} from '@/api/book/index'
import { PlusOutlined } from '@ant-design/icons-vue'
import upload from '@/components/upload/index.vue'
import type { SelectProps } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { message } from 'ant-design-vue'

let dataSource = ref<any>([])

const columns: any = [
  {
    title: '书名',
    dataIndex: 'bookName',
    key: 'bookName',
    align: 'center'
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
    align: 'center'
  },
  {
    title: '出版社',
    dataIndex: 'publish',
    key: 'publish',
    align: 'center'
  },
  {
    title: '类别',
    dataIndex: 'typestr',
    key: 'typestr',
    align: 'center'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    align: 'center'
  },
  {
    title: '操作',
    key: 'controls',
    align: 'center'
  }
]

//当前页码
const current = ref(1)
//每条页数
let PageSize = ref(10)
//总数
const totality = ref(0)
//页数数组
const pageSizeOptions = ref(['5', '10', '15', '20'])
//获取图书数据
const getUser = async (size = 10, offset = 0) => {
  let res = await reqGetBook(size, offset)
  if (res.code === 200) {
    totality.value = res.totality
    dataSource.value = res.data
  }
}
getUser()
//每条页数改变的回调函数
const changePage = (size, pageSize) => {
  if (size === 1) {
    getUser(pageSize)
  }
  //回到第一页
  current.value = 1
  PageSize.value = pageSize
}
//监听页数变化
watch(current, (newCurrent) => {
  let offset = (newCurrent - 1) * PageSize.value
  getUser(PageSize.value, offset)
})

//控制对话框
let open = ref(false)

watch(open, (newOpen) => {
  if (newOpen) {
    //获取图书类别数据
    GetBookType()
      .then((res) => {
        if (res.code === 200) {
          //处理数据
          let newData = res.data.map((item) => {
            return {
              value: item.id,
              label: item.typestr
            }
          })
          options.value = newData
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
//对话框确认按钮回调
const handleOk = (e: MouseEvent) => {
  formEl.value
    .validate()
    .then(async (res) => {
      if (modalTitle.value === '添加图书') {
        let res1: any = await reqAddbook(res)
        if (res1.code === 200) {
          message.success('添加图书成功', 2)
        }
      } else {
        let res1: any = await patchBook(bookid.value, res)
        if (res1.code === 200) {
          message.success('修改图书成功', 2)
        }
      }
      open.value = false
      let offset = (current.value - 1) * PageSize.value
      getUser(PageSize.value, offset)
    })
    .catch((err) => {
      console.log(err)
    })
  // open.value = false
}
//对话框标题
let modalTitle = ref('')
//添加按钮回调
const plusClick = () => {
  open.value = true
  Object.assign(formState, {
    bookname: '',
    author: '',
    publish: '',
    describe: '',
    price: 1,
    picture: '',
    category: 1
  })
  picture.value = ''
  // 清除表单验证信息
  nextTick(() => {
    formEl.value.clearValidate()
  })

  modalTitle.value = '添加图书'
}
//表单
interface FormState {
  bookname: string
  author: string
  publish: string
  describe: string
  price: number
  picture: string
  category: number
}

let formState = reactive<FormState>({
  bookname: '',
  author: '',
  publish: '',
  describe: '',
  price: 1,
  picture: '',
  category: 1
})
//图片地址
let picture = ref('')
//移除上传图片验证消息
watch(
  () => formState.picture,
  (newpicture) => {
    formEl.value?.clearValidate('picture')
  }
)
//图书上传成功回调
const uploadSuccess = (url) => {
  formState.picture = url
}
//选择框值
const options = ref<SelectProps['options']>([
  {
    value: 1,
    label: '历史'
  },
  {
    value: 2,
    label: '地理'
  }
])
//表单验证
const formEl = ref()
const publicRules = {
  required: true,
  message: '不能为空'
}
const rules: Record<string, Rule[]> = {
  bookname: [publicRules, { min: 1, max: 20, message: '字符长度必须是1-20位' }],
  author: [publicRules, { min: 1, max: 10, message: '字符长度必须是1-10位' }],
  publish: [publicRules, { min: 1, max: 20, message: '字符长度必须是1-20位' }],
  describe: [
    publicRules,
    { min: 1, max: 200, message: '字符长度必须是1-200位' }
  ],
  picture: [publicRules]
}
//控制抽屉组件
const openDrawer = ref<boolean>(false)
//图书详情，数据
let bookView = reactive({
  bookName: '',
  author: '',
  describe: '',
  id: 0,
  picture: '',
  price: 0,
  publish: '',
  typestr: ''
})
//查看详情按钮回调
const viewBtn = (item) => {
  bookView = item
  openDrawer.value = true
}
//删除按钮回调
const deleteBtn = async (id: number) => {
  let res: any = await deleteBook(id)
  if (res.code === 200) {
    message.success('删除成功', 2)
    let offset = (current.value - 1) * PageSize.value
    if (dataSource.value.length == 1) {
      current.value = current.value - 1
      offset = (current.value - 2) * PageSize.value
    }
    getUser(PageSize.value, offset)
  }
}
//保存图书ID
let bookid = ref(0)
//编辑按钮回调
const editBtn = async (record) => {
  modalTitle.value = '编辑图书'
  bookid.value = record.id
  nextTick(() => {
    formEl.value?.clearValidate()
  })
  let json = JSON.parse(JSON.stringify(record).replace(/bookName/g, 'bookname'))
  let res = await GetBookType()
  if (res.code == 200) {
    // console.log(res)
    open.value = true
    let json1 = JSON.parse(JSON.stringify(json).replace(/typestr/g, 'category'))
    res.data.forEach((item) => {
      if (item.typestr === json1.category) {
        json1.category = item.id
      }
    })
    Object.assign(formState, json1)
    picture.value = json1.picture
  }
}
//
let value1 = ref('类别')
let value2 = ref('')
//控制分页器显示与隐藏
const isSearch = ref(true)
//搜索按钮回调
const searchBtn = async () => {
  //如果搜索值为空，则返回第一页数据
  if (!value2.value) {
    isSearch.value = true
    getUser()
    current.value = 1
    return
  }
  if (value1.value === '书名') {
    let res = await searchBook(value2.value)
    if (res.code === 200) {
      dataSource.value = res.data
      message.success('搜索成功', 1)
      isSearch.value = false
    }
  } else {
    let res = await searchType(value2.value)
    if (res.code === 200) {
      dataSource.value = res.data.list

      message.success('搜索成功', 1)
      isSearch.value = false
    }
  }
}
</script>
<script lang="ts">
export default {
  name: 'BookManage'
}
</script>

<template>
  <div class="book-manage">
    <div class="box">
      <a-tooltip>
        <template #title>添加图书</template>
        <a-button type="primary" class="btn" @click="plusClick">
          <PlusOutlined />
        </a-button>
      </a-tooltip>

      <a-input-group compact style="width: auto">
        <a-select v-model:value="value1">
          <a-select-option value="类别">类别</a-select-option>
          <a-select-option value="书名">书名</a-select-option>
        </a-select>
        <a-auto-complete
          v-model:value="value2"
          style="width: 200px"
          placeholder="关键字"
        />
        <a-button type="primary" class="btn" @click="searchBtn">搜索</a-button>
      </a-input-group>
    </div>

    <a-table
      :dataSource="dataSource"
      :columns="columns"
      bordered
      :pagination="false"
      style="background-color: var(--main-color1); color: var(--main-wenzi1)"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'price'">
          {{ record.price.toFixed(2) }}
        </template>
        <template v-if="column.key === 'controls'">
          <a-tooltip>
            <template #title>查看详情</template>
            <a-button type="primary" class="btn" @click="viewBtn(record)">
              <i class="iconfont icon-chakan"></i>
            </a-button>
          </a-tooltip>

          <a-tooltip>
            <template #title>编辑</template>
            <a-button type="primary" class="btn" @click="editBtn(record)">
              <i class="iconfont icon-bianji"></i>
            </a-button>
          </a-tooltip>

          <a-tooltip>
            <template #title>删除</template>
            <a-button
              type="primary"
              danger
              class="btn"
              @click="deleteBtn(record.id)"
            >
              <i class="iconfont icon-shanchu"></i>
            </a-button>
          </a-tooltip>
        </template>
      </template>
    </a-table>
    <!-- 分页器 -->
    <template v-if="isSearch">
      <a-pagination
        v-model:current="current"
        :total="totality"
        :pageSizeOptions="pageSizeOptions"
        :defaultPageSize="PageSize"
        style="
          margin-top: 10px;
          background-color: var(--main-color1);
          color: var(--main-wenzi1);
        "
        showQuickJumper
        @showSizeChange="changePage"
        id="pag"
      />
    </template>
    <div
      v-if="!isSearch"
      style="margin-top: 20px; font-size: 18px; padding-bottom: 20px"
    >
      总计:{{ dataSource.length }}条
    </div>

    <!-- 对话框 -->
    <a-modal v-model:open="open" :title="modalTitle" @ok="handleOk">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        :rules="rules"
        ref="formEl"
      >
        <a-form-item label="书名" name="bookname">
          <a-input v-model:value="formState.bookname" />
        </a-form-item>
        <a-form-item label="作者" name="author">
          <a-input v-model:value="formState.author" />
        </a-form-item>
        <a-form-item label="出版社" name="publish">
          <a-input v-model:value="formState.publish" />
        </a-form-item>
        <a-form-item label="图书描述" name="describe">
          <a-textarea
            v-model:value="formState.describe"
            placeholder="图书描述"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="价格" name="price">
          <a-input-number
            id="inputNumber"
            v-model:value="formState.price"
            :min="1"
          />
        </a-form-item>
        <a-form-item label="图书照片" name="picture">
          <upload
            @uploadSuccess="uploadSuccess"
            :open="{ open }"
            :imgSrc="picture"
          />
        </a-form-item>
        <a-form-item label="类别" name="category">
          <a-select
            v-model:value="formState.category"
            style="width: 120px"
            :options="options"
          ></a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 抽屉组件 -->
    <a-drawer
      v-model:open="openDrawer"
      class="custom-class"
      root-class-name="root-class-name"
      :root-style="{ color: 'blue' }"
      style="color: red"
      title="图书详情"
      placement="right"
      width="50%"
    >
      <a-descriptions
        bordered
        :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
      >
        <a-descriptions-item label="书名">{{
          bookView.bookName
        }}</a-descriptions-item>
        <a-descriptions-item label="作者">{{
          bookView.author
        }}</a-descriptions-item>
        <a-descriptions-item label="出版社">{{
          bookView.publish
        }}</a-descriptions-item>
        <a-descriptions-item label="类别">{{
          bookView.typestr
        }}</a-descriptions-item>
        <a-descriptions-item label="价格" :span="2"
          >{{ bookView.price.toFixed(2) }}元</a-descriptions-item
        >
        <a-descriptions-item label="图书照片" :span="3">
          <img
            :src="bookView.picture"
            :alt="bookView.bookName"
            style="width: 200px; height: 200px"
          />
        </a-descriptions-item>
        <a-descriptions-item label="图书描述">{{
          bookView.describe
        }}</a-descriptions-item>
      </a-descriptions>
    </a-drawer>
  </div>
</template>

<style scoped lang="less">
.book-manage {
  width: 100%;
  height: 100%;
  .btn {
    margin: 0px 10px;
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  // 等会修改
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-table-wrapper
        .ant-table-tbody
        > tr
        > td.ant-table-cell-row-hover
    ) {
    background: var(--main-hover);
  }
  ::v-deep(#pag li) {
    button {
      color: var(--main-wenzi1);
    }
    a {
      color: var(--main-wenzi1);
    }
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-pagination
        .ant-pagination-jump-next
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis
    ) {
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-pagination
        .ant-pagination-jump-prev
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis
    ) {
    color: var(--main-wenzi1);
  }
  :where(.css-dev-only-do-not-override-1t25xim).ant-pagination
    .ant-pagination-item-active {
    background-color: var(--main-color1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-select:not(
          .ant-select-customize-input
        )
        .ant-select-selector
    ) {
    background-color: var(--main-color1);
    border: 1px solid #3f51b5;
  }
  ::v-deep(.ant-select-selection-item) {
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-pagination
        .ant-pagination-options-quick-jumper
        input
    ) {
    color: var(--main-wenzi1);
    background-color: var(--main-color1);
  }
  ::v-deep(.ant-table-thead tr th) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
  ::v-deep(
      .ant-select-show-search:where(
          .css-dev-only-do-not-override-1t25xim
        ).ant-select:not(.ant-select-customize-input)
        .ant-select-selector
        input
    ) {
    color: var(--main-wenzi1);
  }
  ::v-deep(
      .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td
    ) {
    background: var(--main-hover);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-pagination
        .ant-pagination-item-active
    ) {
    background-color: var(--main-color1);
  }
}
</style>
