import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import 'normalize.css'
import '@/styles/main.scss'
import pinia from '@/store/index'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ElementIcon from '@/components/SvgIcon/ElementIcon'
import SvgIcon from '@/components/SvgIcon/index.vue'
import '@/styles/theme.scss'
import App from './App.vue'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(ElementIcon)
app.component('SvgIcon', SvgIcon)

app.mount('#app')
