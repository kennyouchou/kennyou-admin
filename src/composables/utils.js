import { ElNotification } from 'element-plus'

// 消息提示的方法

export function toast(message,type = "success",dangerouslyUseHTMLString = false){
  ElNotification({
    type,
    message,
    dangerouslyUseHTMLString,
    duration: 3000
  })
}