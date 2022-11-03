import axios from "@/axios"

export function getImageClassList(page){
  return axios.get("/admin/image_class/" + page)
}

// 创建图片分类
export function createImageClass(data){
  return axios.post("/admin/image_class",data)
}

// 修改图片分类
export function updateImageClass(id,data){
  return axios.post("/admin/image_class/"+id,data)
}

// 删除图片分类
export function deleteImageClass(id){
  return axios.post(`/admin/image_class/${id}/delete`)
}

// 指定图片分类下的图片列表

export function getImageList(id , page = 1){
  return axios.get(`/admin/image_class/${id}/image/${page}`)
}

// 修改图片名字

export function updateImageName(id , name){
  return axios.post(`/admin/image/${id}`,{name})
}

// 删除图片

export function deleteImage(ids){
  return axios.post(`/admin/image/delete_all`,{ids})
}

// 上传图片
export const uploadImageAction = "/api/admin/image/upload"



