import { ref } from 'vue'

//优化首页白屏
export const useDefer = (max = 1000) => {
  const frameCount = ref(0)
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value < max) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount: number) {
    return frameCount.value >= showInFrameCount
  }
}
