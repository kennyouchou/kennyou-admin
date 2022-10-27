<template>
  <div class="home">
    <h2>后台首页</h2>
    {{ $store.state.user.username }}
    <el-button @click="handleLogout"></el-button>
  </div>
</template>

<script setup>
import { showMsgBox , toast } from "@/composables/utils"
import { logout } from "@/api/manager"
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
  function handleLogout(){
    showMsgBox("是否要退出登录")
    .then(res=>{
      // 因为是退出登录 不管成功失败都一样 干脆直接走finally 
      logout().finally(() => {

          store.dispatch('actionLogout')
        // 跳转回登录页
          router.push("/login")
        // 提示退出登录成功
          toast("退出登录成功")
      })
    })
  }
</script>

<style lang="less" scoped>

</style>