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
  return ElMessageBox.confirm(content, title, {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type,
  })
}

// 显示全屏loading
export function showLoading() {
  nprogress.start()
}

// 隐藏全屏loading
export function hideLoading() {
  nprogress.done()
}

// 弹出输入框
export function showPrompt(tip,value = '') {
  return ElMessageBox.prompt(tip, '', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputValue:value
  })
}


// 将query对象转成url参数

export function queryParams(query) {
  let q = []
  for (const key in query) {
      if(query[key]){
        q.push(`${key}=${encodeURIComponent(query[key])}`)
      }
  }
  let r = q.join("&")
  r = r ? ("?" + r) : ""
  return r
}