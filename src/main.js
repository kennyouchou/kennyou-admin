import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {router} from './router/index'
import store from './store/index.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
app.use(ElementPlus).use(router).use(store)
// 引入全部图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'virtual:windi.css'
import "./permission"
import "nprogress/nprogress.css"
app.mount('#app')
