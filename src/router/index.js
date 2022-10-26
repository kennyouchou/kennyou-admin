import { createRouter, createWebHashHistory } from 'vue-router'
// 页面
import Index from '@/pages/index.vue'
import About from '@/pages/about.vue'
import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'
const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/login',
    component: Login,
  },
  {  // 404页面
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
