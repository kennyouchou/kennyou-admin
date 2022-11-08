<template>
    <div v-if="modelValue && preview">
        <el-image v-if="typeof modelValue == 'string'" :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
        <div v-else class="flex flex-wrap">
            <div class="relative mx-1 mb-2 w-[100px] h-[100px]" v-for="(url,index) in modelValue" :key="index">
                <el-icon class="absolute right-[5px] top-[5px] cursor-pointer bg-white rounded-full" style="z-index: 10;" @click="removeImage(url)"><CircleClose /></el-icon>
                <el-image :src="url" fit="cover" class="w-[100px] h-[100px] rounded border mr-2"></el-image>
            </div>
        </div>
    </div>

    <div v-if="preview" class="choose-image-btn" @click="open">
        <el-icon :size="25" class="text-gray-500"><Plus /></el-icon>
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
        <ImageMain :limit="limit" openChoose ref="ImageMainRef" @choose="handleChoose" />
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
const callbackFunction = ref(null)
const open = (callback = null)=>{
    callbackFunction.value = callback
    dialogVisible.value = true
}
const close = ()=>dialogVisible.value = false


const props = defineProps({
    modelValue:[String,Array],
    limit:{
        type:Number,
        default:1
    },
    // 只在富文本编辑器不显示加号图标
    preview:{
        type:Boolean,
        default:true
    }
})

const ImageAsideRef = ref(null)
const handleOpenCreate = () =>ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id) =>{
    // console.log(image_class_id);
    ImageMainRef.value.loadData(image_class_id)
}

const handleOpenLoad = () => ImageMainRef.value.openUploadFile()

const emit = defineEmits(["update:modelValue"])

let urls = []
const handleChoose = (e) =>{
  // 拿到图片地址
  urls = e.map(o=>o.url)
}

// 选中图片确认后 
const submit = ()=>{
    let value = []
    if(props.limit == 1){
        value = urls[0]
    } else {
        value = props.preview ? [...props.modelValue,...urls] : [...urls]
        if(value.length > props.limit){
            let limit = props.preview ? (props.limit - props.modelValue.length) : props.limit
            return toast("最多还能选择"+ limit + "张")
        }
    }
    if(value && props.preview){
        emit("update:modelValue",value)
    }
    if(!props.preview && typeof callbackFunction.value === "function"){
        callbackFunction.value(value)
    }
    close()
}


const removeImage = (url)=> 
emit("update:modelValue",props.modelValue.filter(u=> u != url))

defineExpose({
    open
})

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