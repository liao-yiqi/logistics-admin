import { createApp } from 'vue'
import 'normalize.css'
import '@/styles/main.scss'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/store'
import App from './App.vue'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(pinia)

app.mount('#app')
