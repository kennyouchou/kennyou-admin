import store from "@/store"
function hasPermission(value,el = false){
  if(!Array.isArray(value)){
    throw new Error(`需要配置权限，例如 v-permission="['getStatistics3,GET']"`)
  }
  // 只要有一个就设为-1 就有权限
  const hasAuth = value.findIndex(v=>store.state.ruleNames.includes(v)) != -1
  if(el && !hasAuth){
    // 数组不匹配 就移除
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app){
    app.directive("permission",{
      // el当前节点 binding可以获取当前数组的值 
      mounted(el,binding) {
          hasPermission(binding.value,el) 
      },
    })
  }
}