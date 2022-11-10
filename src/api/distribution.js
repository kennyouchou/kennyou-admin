import axios from "@/axios"
import { queryParams } from "@/composables/utils"

// 用户列表

export function getAgentList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/agent/${page}${r}`)
}

// 得到推广订单数据
export function getAgentOrderList(page,query = {}){
    let r = queryParams(query)
    return axios.get(`/admin/user_bill/${page}${r}`)
}

// 统计数据
export function getAgentStatistics(){
    return axios.get("/admin/agent/statistics")
}

// 获取分销设置
export function getConfig(){
    return axios.get(`/admin/distribution_setting/get`)
}

// 修改分销设置
export function setConfig(data){
    return axios.post(`/admin/distribution_setting/set`,data)
}