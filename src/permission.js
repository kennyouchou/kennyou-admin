import {router,addRoutes} from '@/router'
import { getToken } from "@/composables/auth"
import { toast,showLoading,hideLoading } from "@/composables/utils"
import store from './store'

// 全局前置路由守卫
let hasGetInfo = false
router.beforeEach(async (to,from,next) => {
    // 显示loading
    showLoading()
    const token = getToken()

    // 没有登录，强制跳转回登录页
    if(!token && to.path != "/login"){
      toast("请您先登录","error")
      return next('/login')
    }
    // 防止用户重复登录 登陆后又进入登录页
    if(token && to.path == "/login"){
      toast("请勿重复登陆","error")
      return next({ path:from.path ? from.path : "/"})
    }

    // 如果用户登录了 自动获取用户信息 并放在vuex中
    let hasNewRoutes = false
    if(token && !hasGetInfo){
      let { menus } = await store.dispatch("actionGetInFo")
      hasGetInfo = true
      // 这里动态添加路由
      hasNewRoutes = addRoutes(menus)
    }

    // 设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "--kennyouchou"
    document.title = title
    hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach((to,from)=>{
    hideLoading()
})