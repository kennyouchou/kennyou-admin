import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
const app = createApp(App)
app.use(ElementPlus).use(router)
import 'virtual:windi.css'
app.mount('#app')
