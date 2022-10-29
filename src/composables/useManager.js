import { ref, reactive } from 'vue'
import { showMsgBox, toast } from '@/composables/utils'
import { logout, updatePassword } from '@/api/manager'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 修改密码功能
export function useRepassword() {
  const router = useRouter()
  const store = useStore()
  // 修改密码
  const formDrawerRef = ref(null)
  const showDrawer = ref(false)

  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
  })

  const rules = {
    oldpassword: [
      {
        required: true,
        message: '警告，旧密码不能为空',
        trigger: 'blur', //失去焦点时
      },
    ],
    password: [
      {
        required: true,
        message: '警告，新密码不能为空',
        trigger: 'blur', //失去焦点时
      },
    ],
    repassword: [
      {
        required: true,
        message: '警告，确认密码不能为空',
        trigger: 'blur', //失去焦点时
      },
    ],
  }
  const formRef = ref(null)
  const openRePasswordForm = () => formDrawerRef.value.open()
  // 表单验证 需要向服务器传入用户名和密码
  const onSubmit = () => {
    // validate对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise
    formRef.value.validate((valid) => {
      if (!valid) {
        return false
      }
      formDrawerRef.value.showLoading()
      updatePassword(form)
        .then((res) => {
          toast('修改密码成功,请重新登录')
          store.dispatch('actionLogout')
          router.push('/login')
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  return { formDrawerRef, form, onSubmit, formRef, openRePasswordForm }
}
// 退出登录功能
export function useLogout() {
  const router = useRouter()
  const store = useStore()
  // 退出登录功能
  function handleLogout() {
    showMsgBox('是否要退出登录').then((res) => {
      // 因为是退出登录 不管成功失败都一样 干脆直接走finally
      logout().finally(() => {
        store.dispatch('actionLogout')
        // 跳转回登录页
        router.push('/login')
        // 提示退出登录成功
        toast('退出登录成功')
      })
    })
  }
  return { handleLogout }
}

