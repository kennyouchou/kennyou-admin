import axios from '@/axios'

export function getStatistics1() {
  // 请求拦截器已经自动加token了 这里没必要传了
  return axios.get("/admin/statistics1")
}

// echarts图表组件
export function getStatistics3(type) {
  // 请求拦截器已经自动加token了 这里没必要传了
  return axios.get("/admin/statistics3?type="+type)
}