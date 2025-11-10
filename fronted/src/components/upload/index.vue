<template>
  <div class="upload">
    <div class="content" @click="btn">
      <template v-if="!imgUrl && !props.imgSrc">
        <PlusOutlined id="icon" />
        <span>Upload</span>
      </template>
      <template v-else>
        <img :src="imgUrl || props.imgSrc" alt="" />
      </template>
    </div>
    <input
      type="file"
      accept="image/png, image/jpeg"
      @input="upload"
      ref="inputEl"
      v-show="false"
      :value="values"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import require from '@/api/index'

const emit = defineEmits(['uploadSuccess'])
const values = ref()

const props = defineProps({
  open: {
    type: Object,
    default: {}
  },
  imgSrc: {
    type: String,
    default: ''
  }
})

const inputEl = ref()
const imgUrl = ref('')
const upload = (e) => {
  const fd = new FormData()
  fd.append('assets', e.target.files[0])
  require.post('/assets', fd).then((res: any) => {
    imgUrl.value = res.avatarUrl
  })
}
const btn = () => {
  inputEl.value.click()
}
watch(imgUrl, (newImgurl) => {
  emit('uploadSuccess', newImgurl)
})
watch(
  () => props.open,
  (newOpen) => {
    if (!newOpen.open) {
      imgUrl.value = ''
    }
  }
)
// watch(
//   () => props.imgSrc,
//   (newValue) => {
//     console.log(newValue)

//     if (newValue) {
//       imgUrl.value = newValue
//     }
//   }
// )
</script>
<script lang="ts">
export default {
  name: 'Upload'
}
</script>
<style scoped lang="less">
.upload {
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d9d9d9;
  border-radius: 5px;
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    #icon {
      font-size: 20px;
    }
  }
}
</style>
