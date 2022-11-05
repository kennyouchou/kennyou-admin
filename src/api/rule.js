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