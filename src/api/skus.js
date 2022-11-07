import axios from "@/axios"
// 获取规格管理列表
export function getSkusList(page) {
    return axios.get(`/admin/skus/${page}`)
}

// 创建规格管理
export function createSkus(data) {
  return axios.post("/admin/skus",data)
}

// 修改规格管理
export function updateSkus(id,data) {
  return axios.post("/admin/skus/"+id,data)
}

// 删除规格管理

export function deleteSkus(ids) {
  // 判断数组 如果不是数组就存入数组
  ids = !Array.isArray(ids) ? [ids] : ids
  return axios.post(`/admin/skus/delete_all`,{ids})
}

// 修改规格管理状态
export function updateSkusStatus(id,status){
  return axios.post(`/admin/skus/${id}/update_status`,{
    status
  })
}
