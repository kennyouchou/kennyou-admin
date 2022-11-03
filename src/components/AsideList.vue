<template>
  <div class="aside-list" :class="{ 'active': active }">
    <span class="truncate">
      <!-- 图片列表 -->
      <slot />
    </span>
    <el-button class="ml-auto px-1" text type="primary" size="small" @click="$emit('edit')">
      <el-icon :size="14">
        <Edit />
      </el-icon>
    </el-button>

    <!-- 删除按钮 -->
    <el-popconfirm title="是否要删除该分类" confirm-button-text="确认"
    cancel-button-text="取消" @confirm="$emit('delete')">
      <template #reference>
        <el-button text class="px-1" type="primary" size="small">
          <el-icon :size="14">
            <Close />
          </el-icon>
        </el-button>
      </template>
    </el-popconfirm>

  </div>
</template>

<script setup>
defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

defineEmits(["edit", "delete"])
</script>

<style scoped>
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  cursor: pointer;
  @apply flex items-center p-3 text-sm text-gray-600;
}

.aside-list:hover,
.active {
  @apply bg-blue-100;
}
</style>