<template>
    <el-container class="bg-gray-50 rounded" :style="{height:(h + 'px')}">
      <el-header class="image-header">
        <el-button type="primary" size="small" @click="handleOpenCreate">
            新增图片分类
        </el-button>
        <el-button type="warning" size="small" @click="handleOpenLoad">
            上传图片
        </el-button>
      </el-header>
      <el-container>
        <!-- 侧边 -->
        <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
        <!-- 主体区域 -->
        <ImageMain ref="ImageMainRef" />
      </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
// 拿到浏览器高度 占满
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight -64 -44 - 40

const ImageAsideRef = ref(null)
const handleOpenCreate = () =>ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) =>{
    // console.log(image_class_id);
    ImageMainRef.value.loadData(image_class_id)
}

const handleOpenLoad = () => ImageMainRef.value.openUploadFile()
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