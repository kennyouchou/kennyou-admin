import { createRouter, createWebHashHistory } from 'vue-router'
// 页面
import Admin from "@/layout/admin.vue";
import Index from '@/pages/index.vue'
import NotFound from '@/pages/404.vue'
import Login from '@/pages/login.vue'
import GoodList from '@/pages/goods/list.vue'
import CategoryList from '@/pages/category/list.vue'
import UserList from '@/pages/user/userlist.vue'
import Setting from '@/pages/setting/base.vue'
import OrderList from '@/pages/order/orderlist.vue'
import Notice from '@/pages/notice/noticelist.vue'
import GalleryList from '@/pages/gallery/gallerylist.vue'
import CouponList from '@/pages/coupon/couponlist.vue'
import CommentList from '@/pages/comment/commentlist.vue'
import Manager from "@/pages/manager/list.vue";
// 默认路由，所有用户都拥有
const routes = [
  {
      path: "/",
      name:"admin",
      component: Admin,
  },
  {
      path: "/login",
      component: Login,
      meta: {
          title: "登录页"
      }
  }, 
  {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
  }]


// 动态路由，用于匹配菜单动态添加路由
const asyncRoutes = [{
  path:"/",
  name:"/",
  component:Index,
  meta:{
      title:"后台首页"
  }
},{
  path:"/goods/list",
  name:"/goods/list",
  component:GoodList,
  meta:{
      title:"商品管理"
  }
},
{
  path:"/category/list",
  name:"/category/list",
  component:CategoryList,
  meta:{
      title:"分类列表"
  }
},
{
  path:"/user/list",
  name:"/user/list",
  component:UserList,
  meta:{
      title:"用户列表"
  }
},
{
  path:"/order/list",
  name:"/order/list",
  component:OrderList,
  meta:{
      title:"订单列表"
  }
},
{
  path:"/notice/list",
  name:"/notice/list",
  component:Notice,
  meta:{
      title:"公告列表"
  }
},
{
  path:"/comment/list",
  name:"/comment/list",
  component:CommentList,
  meta:{
      title:"评价列表"
  }
},
{
  path:"/image/list",
  name:"/image/list",
  component:GalleryList,
  meta:{
      title:"图库列表"
  }
},
{
  path:"/coupon/list",
  name:"/coupon/list",
  component:CouponList,
  meta:{
      title:"优惠券列表"
  }
},
{
  path:"/setting/base",
  name:"/setting/base",
  component:Setting,
  meta:{
      title:"配置"
  }
},
{
  path:"/manager/list",
  name:"/manager/list",
  component:Manager,
  meta:{
      title:"管理员管理"
  }
},
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 动态添加路由的方法
export function addRoutes(menus){
  // 是否有新的路由
  let hasNewRoutes = false
  const findAndAddRoutesByMenus = (arr) =>{
      arr.forEach(e=>{
          let item = asyncRoutes.find(o=>o.path == e.frontpath)
          if(item && !router.hasRoute(item.path)){
              router.addRoute("admin",item)
              hasNewRoutes = true
          }
          if(e.child && e.child.length > 0){
              findAndAddRoutesByMenus(e.child)
          }
      })
  }

  findAndAddRoutesByMenus(menus)

  return hasNewRoutes
}