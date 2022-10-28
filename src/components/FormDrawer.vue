<template>
      <!-- 修改密码的抽屉界面 -->
  <el-drawer v-model="showDrawer" :title="title" :size="size"
   :click-on-click-modal="false"
   :destroy-on-close="destroyOnClose">
      <div class="formDrawer">
        <div class="main">
          <slot></slot>
        </div>

        <div class="actions">
          <el-button type="primary" @click="submit">{{ confirmText }}</el-button>
          <el-button type="default" @click="close">取消</el-button>
        </div>
      </div>
  </el-drawer>

</template>

<script setup>
  import { ref } from "vue"

  const showDrawer = ref(false)

  // 暴露属性

  const props = defineProps({
    title:String,

    size:{
      type:String,
      default:"45%"
    },
    // 控制是否在关闭 Drawer 之后将子元素全部销毁
    destroyOnClose:{
      type:String,
      default:false
    },

    confirmText:{
      type:String,
      default:"提交"
    }
  })

  // 打开
  const open = () => showDrawer.value = true
  // 关闭
  const close = () => showDrawer.value = false

  // 提交
  const emit = defineEmits(["submit"])
  const submit = () => emit("submit")
  // 向父组件暴露方法

  defineExpose({
    open,
    close
  })

</script>

<style>
  .formDrawer{
    width: 100%;
    height: 100%;
    @apply flex flex-col;
  }
  .formDrawer .body{
    flex:1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    /* 超出部分 变成可滚动 */
    overflow-y: auto;
  }
  .formDrawer .actions{
    height: 50px;
    @apply mt-auto flex items-center;
  }
</style>