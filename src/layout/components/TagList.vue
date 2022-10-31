<template>
  <div class="tagList" :style="{ left:$store.state.asideWidth}">
    <el-tabs
    v-model="activeTab"
    type="card"
    class="flex-1"
    @tab-remove="removeTab"
    style="min-width:100px;"
    @tab-change="changeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :closable="item.path !='/'"
      :key="item.path"
      :label="item.title"
      :name="item.path"
    >

    </el-tab-pane>
  </el-tabs>

    <span class="tag-btn"> 
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>Action 1</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </div>
  <div style="height:44px;"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute,onBeforeRouteUpdate } from "vue-router"
import { useCookies } from '@vueuse/integrations/useCookies'
import { router } from '@/router';
const route = useRoute()
const cookie = useCookies()
const activeTab = ref(route.path)
const tabList = ref([
  {
    title: '后台首页',
    path:"/"
  },
])

// 添加标签导航
function addTab(tab){
  let noTab = tabList.value.findIndex(item=> (item.path == tab.path) == -1)
  if(noTab){
    tabList.value.push(tab)
  }

  cookie.set("tabList",tabList.value)
}

// 初始化标签导航列表 防止刷新后只剩一个Tag标签
function initTaList(){
  let tabs = cookie.get("tabList")
  if(tabs){
    tabList.value = tabs
  }
}
initTaList()
onBeforeRouteUpdate((to,from)=>{
  activeTab.value = to.path
  addTab({
      title:to.meta.title,
      path:to.path
  })
})
// 点击tab上标签进入对应页面
const changeTab = (t)=>{
  activeTab.value = t
  router.push(t)
}

const removeTab = (targetName) => {

}
</script>

<style scoped>
.tagList{
    @apply fixed bg-gray-100 flex items-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 99;
}
.tag-btn{
  @apply bg-white rounded ml-auto flex items-center justify-center px-2;
  height: 32px;
}

:deep(.el-tabs__header){
  @apply mb-0 pt-1;
  border: 0 !important;
}

:deep(.el-tabs__nav){
  border: 0!important;
}

:deep(.el-tabs__item){
  border: 0!important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-next),:deep(.el-tabs__nav-prev){
  line-height: 32px;
  height: 32px;
}
:deep(.is-disabled){
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>