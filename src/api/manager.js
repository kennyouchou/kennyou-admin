import axios from '@/axios'
import { queryParams } from "@/composables/utils";
export function login(username,password){
  return axios.post(
    '/admin/login',
    {
      username,
      password
    }
  )
}

export function getInfo() {
    // 请求拦截器已经自动加token了 这里没必要传了
    return axios.post("/admin/getinfo")
}

export function logout() {
  // 请求拦截器已经自动加token了 这里没必要传了
  return axios.post("/admin/logout")
}

export function updatePassword(data) {
  // 请求拦截器已经自动加token了 这里没必要传了
  return axios.post("/admin/updatepassword",data)
}

// 获取管理员列表
export function getManagerList(page,query = {}){

  let r = queryParams(query)
  return axios.get(`/admin/manager/${page}${r}`)
}
  // limit:10,
  // keyword:"ceshi"

  // 拼接出来的结果 limit=10&keyword=ceshi
  


// 修改管理员状态
export function updateManagerStatus(id,status){
  return axios.post(`/admin/manager/${id}/update_status`,{
    status
  })
}

// 新增管理员
export function addManager(data){
  return axios.post(`/admin/manager`,data)
}

// 修改管理员
export function editManager(id,data){
  return axios.post(`/admin/manager/${id}`,data)
}

// 删除管理员
export function deleteManager(id){
  return axios.post(`/admin/manager/${id}/delete`)
}