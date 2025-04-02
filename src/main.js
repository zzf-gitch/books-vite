import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/fonts/iconfont.css'
import Directives from "@/directive/directives.js"
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
// import '@/directive/table-sticky.js'
const app = createApp(App)
app.use(store)
app.use(router)
app.use(Directives)
app.use(ElementPlus, {
    locale: zhLocale
})
app.mount('#app')
