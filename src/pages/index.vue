<template>
  <div class="home">
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="panels.length == 0">
        <el-col :span="6" v-for="i in 4" :key="1">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 15%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <!-- 分割线 -->
                <el-divider />
                <div class="flex justify-between text-sm  text-gray-500">
                  <!-- 左 -->
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <!-- 右 -->
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>

      <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
        <el-card shadow="hover">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor" effect="plain">
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            <NumberTo :value="item.value" />
          </span>
          <!-- 分割线 -->
          <el-divider />
          <div class="flex justify-between text-sm  text-gray-500">
            <!-- 左 -->
            <span>
              {{ item.subTitle }}
            </span>
            <!-- 右 -->
            <span>
              {{ item.subValue }}
            </span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 8个图标的导航组件 -->
    <ToolNavs />

    <el-row :gutter="20" class="mt-5">
        <el-col :span="12" :offset="0">
            <!-- 柱状图 -->
            <Echart v-permission="['getStatistics3,GET']" />
        </el-col>
        <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']" >
            <!-- 店铺交易数据 -->
            <Card class="mb-3" title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" />
            <Card title="交易提示" tip="需要立即处理的交易订单" :btns="orders" />
        </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getStatistics1,getStatistics2 } from "@/api/index"
import NumberTo from "@/components/NumberTo.vue";
import ToolNavs from "@/components/ToolNavs.vue";
import Echart from "@/components/Echarts.vue";
import Card from "@/components/Card.vue";
const panels = ref([])

getStatistics1().then(res => {
  panels.value = res.panels
})


const goods =ref([])
const orders =ref([])
getStatistics2().then(res=>{
    goods.value = res.goods
    orders.value = res.order
})
</script>

<style scoped>

</style>