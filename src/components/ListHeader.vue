<template>
  <!-- 头部的 新增 刷新功能 -->
  <div class="flex items-center justify-between mb-4">
    <div>
      <el-button v-if="btns.includes('create')" class="ml-4" type="primary" size="small" @click="$emit('create')">
        新增
      </el-button>

      <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中记录" confirm-button-text="确认" cancel-button-text="取消"
        @confirm="$emit('delete')">
        <template #reference>
          <el-button  class="ml-4" type="danger" size="small">
            批量删除
          </el-button>
        </template>
      </el-popconfirm>
    </div>
    <!-- 刷新数据 -->
    <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="top">
      <el-button @click="$emit('refresh')">
        <el-icon :size="20">
          <Refresh />
        </el-icon>
      </el-button>
    </el-tooltip>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  layout: {
    type: String,
    // 默认只显示这两个按钮
    default: "create,refresh"
  }
})
// 将字符串转为逗号分割的数组
const btns = computed(() => props.layout.split(","))

defineEmits(["create", "refresh", "delete"])


</script>

<style scoped>

</style>