<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import {
  getBookCategory,
  addBookCategory,
  updataType
} from '@/api/bookType/index'
import { searchType } from '@/api/book/index'
import { message } from 'ant-design-vue'

interface collapseType {
  id: number
  typestr: string
}
//图书类别数据列表
const collapseList = ref<collapseType[]>()
//获取图书类别
const getType = async () => {
  let res = await getBookCategory()
  if (res.code === 200) {
    collapseList.value = res.data
  }
}
interface numBookType {
  num: number
  str: string
}
let numBook = ref<numBookType[]>([])
//获取每个图书类别对应的图书
const getBook = async (type: string) => {
  let res = await searchType(type)
  if (res.code === 200) {
    numBook.value.push({
      num: res.data.list.length,
      str: res.data.type
    })
  }
}

watch(collapseList, (newValue) => {
  newValue?.forEach((item) => {
    getBook(item.typestr)
  })
})
onMounted(() => {
  getType()
})
const open = ref(false)
let openTitle = ref('')
let value = ref('')
//添加按钮回调
const addBtn = () => {
  open.value = true
  value.value = ''
  openTitle.value = '添加类别'
}
//确认按钮回调
const handleOk = async () => {
  if (!value.value) {
    message.error('不能为空', 1)
  } else {
    if (openTitle.value === '添加类别') {
      let res: any = await addBookCategory(value.value)
      if (res.code === 200) {
        message.success(res.msg, 2)
        getType()
      }
    } else {
      let res: any = await updataType(typeId, value.value)
      if (res.code === 200) {
        message.success(res.msg, 2)
        getType()
      }
    }
    open.value = false
  }
}
let typeId
//编辑按钮回调
const editBtn = (item) => {
  open.value = true
  openTitle.value = '编辑类别'
  value.value = item.typestr
  typeId = item.id
}
</script>
<script lang="ts">
export default {
  name: 'Category'
}
</script>

<template>
  <div class="category">
    <a-tooltip>
      <template #title>添加类别</template>
      <a-button type="primary" class="btn" @click="addBtn">
        <PlusOutlined />
      </a-button>
    </a-tooltip>
    <a-collapse accordion>
      <a-collapse-panel
        v-for="item in collapseList"
        :key="item.id"
        :header="item.typestr"
      >
        <template v-for="i in numBook" :key="i">
          <div v-if="i.str === item.typestr" class="box">
            <p>
              该{{ item.typestr }}类别存在<span
                class="num"
                style="color: var(--main-wenzi1)"
                >{{ i.num }}</span
              >本图书
            </p>

            <div class="btn-box">
              <a-button type="primary" class="btn-item" @click="editBtn(item)"
                >编辑</a-button
              >
            </div>
          </div>
        </template>
      </a-collapse-panel>
    </a-collapse>
    <!-- 对话框 -->
    <a-modal v-model:open="open" :title="openTitle" @ok="handleOk">
      <a-input v-model:value="value" />
    </a-modal>
  </div>
</template>

<style scoped lang="less">
.category {
  width: 100%;
  height: 100%;
  .btn {
    margin: 10px 0 25px;
  }
  .num {
    color: var(--main-color);
    font-size: 20px;
    padding: 0 10px;
  }
  .box {
    display: flex;
    justify-content: space-between;
    .btn-item {
      margin: 0 10px;
    }
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-collapse
        > .ant-collapse-item
        > .ant-collapse-header
    ) {
    color: var(--main-wenzi1);
  }
  ::v-deep(
      :where(.css-dev-only-do-not-override-1t25xim).ant-collapse
        .ant-collapse-content
        > .ant-collapse-content-box
    ) {
    background-color: var(--main-color1);
    color: var(--main-wenzi1);
  }
}
</style>
