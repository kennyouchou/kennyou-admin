<template>
    <el-container class="bg-gray-100 rounded" :style="{height:(h + 'px')}">
      <el-header class="image-header">Header</el-header>
      <el-container>
        <!-- 侧边 -->
        <ImageAside />
        <!-- 主体区域 -->
        <ImageMain />
      </el-container>
    </el-container>
</template>

<script setup>
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
// 拿到浏览器高度 占满
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight -64 -44 - 40

</script>

<style scoped>
.image-header{
  border-bottom: 1px solid #eeeeee;
  @apply flex items-center;
}

.image-aside .top,.image-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom,.image-main .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>