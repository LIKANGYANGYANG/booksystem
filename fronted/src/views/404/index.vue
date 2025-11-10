<script setup lang="ts"></script>
<script>
export default {
  name: 'NotFound'
}
</script>

<template>
  <div>
    <a-result status="404" title="404" sub-title="未找到该页面">
      <template #extra>
        <a-button type="primary">Back Home</a-button>
      </template>
    </a-result>
  </div>
</template>

<style scoped lang="less"></style>
