<template>
    {{ d.num.toFixed(0) }}
</template>

<script setup>
  import { reactive,watch } from "vue"
  import gsap from "gsap"


const props = defineProps({
      value:{
          type:Number,
          default:0
      }
  })
  const d = reactive({
    num:0
  })


  function AnimateToNumber(){
      // 0.5秒内从0滚动到传过来的value值
      gsap.to(d,{
          duration:0.5,
          num:props.value
      })
  }
  AnimateToNumber()
  watch(()=>props.value,()=>AnimateToNumber())
</script>
