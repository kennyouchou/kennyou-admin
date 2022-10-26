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