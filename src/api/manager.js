import axios from '@/axios'

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
export function getManagerList(page,query = {
  // limit:10,
  // keyword:"ceshi"
}) {
  let q = []
  for (const key in query) {
      if(query[key]){
        q.push(`${key}=${encodeURIComponent(query[key])}`)
      }
  }
  let r = q.join("&")
  r = r ? ("?" + r) : ""
  // 拼接出来的结果 limit=10&keyword=ceshi
  return axios.get(`/admin/manager/${page}${r}`)
}

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