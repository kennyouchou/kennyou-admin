import axios from "@/axios"

// 获取配置 
export function getSysconfig(){
    return axios.get(`/admin/sysconfig`)
}

export function setSysconfig(data){
    return axios.post(`/admin/sysconfig`,data)
}

// 上传文件
export const uploadAction = "/api/admin/sysconfig/upload"