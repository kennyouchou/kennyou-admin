import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/router'

export function useTabList() {
  const route = useRoute()
  const cookie = useCookies()
  const activeTab = ref(route.path)
  const tabList = ref([
    {
      title: '后台首页',
      path: '/',
    },
  ])

  // 添加标签导航
  function addTab(tab) {
    let noTab = tabList.value.findIndex((e) => e.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab)
    }

    cookie.set('tabList', tabList.value)
  }

  // 初始化标签导航列表 防止刷新后只剩一个Tag标签
  function initTaList() {
    let tabs = cookie.get('tabList')
    if (tabs) {
      tabList.value = tabs
    }
  }
  initTaList()

  onBeforeRouteUpdate((to, from) => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path,
    })
  })
  // 点击tab上标签进入对应页面 监听点击
  const changeTab = (t) => {
    activeTab.value = t
    router.push(t)
  }
  // 移除标签 监听删除
  const removeTab = (t) => {
    let tabs = tabList.value
    let a = activeTab.value
    if (a == t) {
      tabs.forEach((tab, index) => {
        if (tab.path == t) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            a = nextTab.path
          }
        }
      })
    }
    activeTab.value = a
    // 将没有关闭的标签存入数组
    tabList.value = tabList.value.filter((tab) => tab.path != t)
    // 存入cookie
    cookie.set('tabList', tabList.value)
  }

  // 关闭其他标签和关闭所有标签功能 监听关闭
  const handleClose = (commandValue) => {
    if (commandValue == 'clearAll') {
      // 切换回首页标签
      activeTab.value = '/'
      // 过滤只剩下首页标签 把其他标签都删除
      tabList.value = [
        {
          title: '后台首页',
          path: '/',
        },
      ]
    } else if (commandValue == 'clearOther') {
      // 只剩下首页标签和当前激活的标签
      tabList.value = tabList.value.filter(
        (tab) => tab.path == '/' || tab.path == activeTab.value
      )
    }
    cookie.set('tabList', tabList.value)
  }

  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
  }
}
