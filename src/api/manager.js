import axios from '@/axios.js'

export function login(){
  return axios.post(
    '/admin/login',
    {
      username,
      password
    }
  )
}