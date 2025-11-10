import './assets/style/main.less'
//icon
import './assets/icon/iconfont.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//进度条
import 'nprogress/nprogress.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
