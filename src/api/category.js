import axios from '@/axios'

export function getCategoryList(){
  return axios.get("/admin/category")
}

// 创建分类
export function createCategory(data){
  return axios.post("/admin/category",data)
}

// 修改分类
export function updateCategory(id,data){
  return axios.post("/admin/category/"+id,data)
}

// 更新商品分类状态
export function updateCategoryStatus(id,status){
  return axios.post(`/admin/category/${id}/update_status`,{
      status
  })
}

// 删除分类
export function deleteCategory(id){
  return axios.post(`/admin/category/${id}/delete`)
}



// 得到当前分类的商品列表
export function getCategoryGoods(id){
  return  axios.get(`/admin/app_category_item/list?category_id=${id}`)
}

export function deleteCategoryGoods(id){
  return axios.post(`/admin/app_category_item/${id}/delete`)
}

export function connectCategoryGoods(data){
  return axios.post(`/admin/app_category_item`,data)
}