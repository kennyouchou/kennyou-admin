import axios from "@/axios"
// 获取菜单列表
export function getRuleList(page) {
    return axios.get(`/admin/rule/${page}`)
}

// 创建菜单
export function createRule(data){
  return axios.post("/admin/rule",data)
}


// 修改菜单
export function updateRule(id,data){
  return axios.post("/admin/rule/"+id,data)
}

// 修改管理员状态
export function updateRuleStatus(id,status){
  return axios.post(`/admin/rule/${id}/update_status`,{
    status
  })
}

// 删除管理员
export function deleteRule(id){
  return axios.post(`/admin/rule/${id}/delete`)
}