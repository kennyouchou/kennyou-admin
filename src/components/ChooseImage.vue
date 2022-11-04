<template>
  <div v-if="modelValue">
    <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px]
    rounded border m-2" >
    </el-image>
    
  </div>

  <div class="choose-image-btn" @click="open">
      <el-icon :size="25"><Plus /></el-icon>
  </div>
  <el-dialog
    title="选择图片"
    v-model="dialogVisible"
    width="80%"
    top="5vh">
    

    <el-container class="bg-gray-50 rounded" style="height:70vh;">
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
        <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose" />
      </el-container>
    </el-container>
    <span></span>
    <template #footer>
    <span>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import ImageAside from "@/components/ImageAside.vue";
import ImageMain from "@/components/ImageMain.vue";
const dialogVisible = ref(false)

// 图片列表选择框
const open = () =>{
  dialogVisible.value = true
}
const close = () =>{
  dialogVisible.value = false
}

const ImageAsideRef = ref(null)
const handleOpenCreate = () =>ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) =>{
    // console.log(image_class_id);
    ImageMainRef.value.loadData(image_class_id)
}

const handleOpenLoad = () => ImageMainRef.value.openUploadFile()

const props = defineProps({
  modelValue:[String,Array]
})
const emit = defineEmits(["update:modelValue"])

let urls = []
const handleChoose = (e) =>{
  // 拿到图片地址
  urls = e.map(o=>o.url)
}

// 选中图片确认后
const submit = () =>{
  if(urls.length){
    emit("update:modelValue",urls[0])
  }
  close()
}
</script>

<style scoped>
.choose-image-btn{
  @apply w-[100px] h-[100px] rounded border flex
  justify-center items-center cursor-pointer hover:( bg-gray-100);
}
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