<template>
  <el-row class="login-container">
    <!-- 左边 -->
    <el-col :lg="16" :md="12" class=" left">
      <div>
        <div>欢迎光临</div>
        <div>这是kennyouchou的练习项目,欢迎查看</div>
      </div>
    </el-col>
    <!-- 右边 -->
    <el-col :lg="8" :md="12" class=" right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <!-- 表单 -->
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <!-- 登录框 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon>
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon>
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" color="#626aef" round class="w-[250px]">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref , reactive } from 'vue'
import { login } from '@/api/manager'
// import { User,Lock } from '@element-plus/icons-vue'
// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: [
    { 
      required: true, 
      message: '警告，用户名不能为空', 
      trigger: 'blur' //失去焦点时
    },
    { 
      min: 3, 
      max: 5, 
      message: '用户名长度必须是3到5个字符', 
      trigger: 'blur' 
    },
  ],
  password: [
    {  
      required: true, 
      message: '警告，密码不能为空', 
      trigger: 'blur' //失去焦点时
    },
  ]
}
const formRef = ref(null)

const onSubmit = () => {
  formRef.value.validate((valid) => {
    if(!valid){
      return false
    }
    login(form.username,form.password).then(res=>{
      console.log(res);
    }).catch(err=>{
      //拿到具体报错信息
      console.log(err.response.data.msg);
    })
  })
}


</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}

.login-container .left {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply flex items-center justify-center bg-light-50 flex-col;
}

.left>div>div:first-child {
  @apply text-left font-bold text-5xl text-light-50 mb-4;
}

.left>div>div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-warm-gray-800;
}

.right>div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>