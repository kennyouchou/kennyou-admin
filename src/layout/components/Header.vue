<template>
  <div class="header">
    <span class="logo">
      <!-- 左边 -->
      <el-icon class="mr-2">
        <ChromeFilled />
      </el-icon>
      Kennyouchou
    </span>
    <!-- 折叠图标 -->
    <el-icon class="icon-btn">
      <fold />
    </el-icon>
    <!-- 刷新图标 -->
    <el-tooltip
        effect="dark"
        content="刷新"
        placement="bottom"
      >
      <el-icon class="icon-btn" @click="handleRefresh"> 
      <refresh />
      </el-icon>
      </el-tooltip>

    <!-- 右边 -->
    <div class="ml-auto flex items-center ">
      <!-- 全屏图标 -->
      <el-tooltip
        effect="dark"
        content="全屏"
        placement="bottom"
      >
      <el-icon class="icon-btn" @click="toggle">
        <full-screen v-if="!isFullscreen"/>
        <Aim v-else />
      </el-icon>
    </el-tooltip>
      <!-- 下拉菜单 -->
      <el-dropdown class="dropdownmenu" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <FormDrawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit" >
          <!-- 修改密码表单 -->
    <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
        <!-- 登录框 -->
        <el-form-item prop="oldpassword" label="旧密码">
          <el-input type="password" v-model="form.oldpassword" placeholder="请输入旧密码">
          </el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password" label="新密码">
          <el-input type="password" v-model="form.password" placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword" label="确认密码">
          <el-input type="password" v-model="form.repassword" placeholder="请输入确认密码">
          </el-input>
        </el-form-item>
      </el-form>
  </FormDrawer>

</template>

<script setup>
import { showMsgBox , toast } from "@/composables/utils"
import { logout,updatePassword } from "@/api/manager"
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import { useFullscreen } from '@vueuse/core'
import { ref,reactive } from 'vue'
import FormDrawer from "@/components/FormDrawer.vue"
const router = useRouter()
const store = useStore()
const {
// 是否全屏状态
isFullscreen, 
// 切换全屏
toggle 
} = useFullscreen()
// 下拉菜单选择功能
const handleCommand = (c)=>{
  // console.log(c);
  switch (c) {
    case "logout":
      handleLogout()
      break;
  
    case "rePassword":
          // showDrawer.value = true
          formDrawerRef.value.open()
          break;
  }
}
// 刷新功能
function handleRefresh(){
  location.reload()
}
// 退出登录功能
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

// 修改密码
const formDrawerRef = ref(null)
const showDrawer = ref(false)

const form = reactive({
  oldpassword:"",
  password: "",
  repassword: ""
})

const rules = {
  oldpassword: [
    {
      required: true,
      message: '警告，旧密码不能为空',
      trigger: 'blur' //失去焦点时
    },
  ],
  password: [
    {
      required: true,
      message: '警告，新密码不能为空',
      trigger: 'blur' //失去焦点时
    },
  ],
  repassword: [
    {
      required: true,
      message: '警告，确认密码不能为空',
      trigger: 'blur' //失去焦点时
    },
  ]
}
const formRef = ref(null)
const loading = ref(false)
// 表单验证 需要向服务器传入用户名和密码
const onSubmit = () => {
  // validate对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise
  formRef.value.validate((valid) => {
    if (!valid) {
      return false
    }
    loading.value = true
    updateassword(form).then(res=>{
      toast("修改密码成功,请重新登录")
      store.dispatch("actionLogout")
      router.push("/login")
    }).finally(()=>{
      loading.value = false
    })
  })
}

</script>

<style scoped>
.header{
  @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 right-0 left-0;
  height: 64px;
}

.logo{
  width: 250px;
  @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn{
  @apply flex items-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover{
  @apply bg-indigo-600;
}
.header .dropdownmenu{
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center mx-5;
}


</style>