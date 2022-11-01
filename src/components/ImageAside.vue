<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">

      <AsideList :active="activeId == item.id" v-for="(item,index) in list" :key="index">
        {{item.name}}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination background layout="prev, next" :total="total"
      :current-page="currentPage" :page-size="limit"
      @current-change="getData" />
    </div>
  </el-aside>
</template>

<script setup>
import { ref } from "vue";
import { getImageClassList } from "@/api/image"
import AsideList from "@/components/AsideList.vue";
const activeId = ref(0)
// 加载动画
const loading = ref(false)

// 分页
const currentPage = ref(1) //当前页
const total = ref(1)  //总条数
const limit = ref(1)  // 每页限制10条
// 获取
const list = ref([])
function getData(p = null){
  if(typeof p == "number"){
    currentPage.value = p
  }
  loading.value = true
  getImageClassList(currentPage.value).then(res =>{
    total.value = res.totalCount
    list.value = res.list
    let item = list.value[0]
    // 默认第一个激活
    if(item){
      activeId.value = item.id
    }
  }).finally(()=>{
    loading.value = false
  })
}
getData()


</script>

<style scoped>
.image-aside{
  border-right:1px solid #eeeeee;
  position: relative;
}
.image-aside .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}

</style>