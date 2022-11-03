import { ElNotification, ElMessageBox } from 'element-plus'
import nprogress from 'nprogress'
// 消息提示的方法

export function toast(
  message,
  type = 'success',
  dangerouslyUseHTMLString = true
) {
  ElNotification({
    type,
    message,
    dangerouslyUseHTMLString,
    duration: 3000,
  })
}

// 带有确定取消的提示框
export function showMsgBox(content = '提示内容', type = 'warning', title = '') {
    return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type,
    }
  )
}

// 显示全屏loading
export function showLoading(){
  nprogress.start()
}

// 隐藏全屏loading
export function hideLoading(){
  nprogress.done()
}