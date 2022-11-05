<template>
    <!-- 头部的 新增 刷新功能 -->
    <div class="flex items-center justify-between mb-4">
      <el-button class="ml-4" type="primary" size="small" @click="$emit('create')">
        新增
      </el-button>
      <!-- 刷新数据 -->
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-button @click="$emit('refresh')">
          <el-icon :size="20">
            <Refresh />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
</template>

<script setup>
defineEmits(["create","refresh"])
</script>

<style scoped>

</style>