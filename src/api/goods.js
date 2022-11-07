import axios from '@/axios'
import { queryParams } from "@/composables/utils";
  // 获取商品列表
export function getGoodsList(page,query = {}){

  let r = queryParams(query)
  return axios.get(`/admin/goods/${page}${r}`)


}
  // limit:10,
  // keyword:"ceshi"


  // 拼接出来的结果 limit=10&keyword=ceshi

// 批量上架 下架商品
export function updateGoodsStatus(ids,status){
  return axios.post(`/admin/goods/changestatus`,{
    ids,
    status
  })
}

// 新增管理员
export function createGoods(data){
  return axios.post(`/admin/goods`,data)
}

// 修改管理员
export function updateGoods(id,data){
  return axios.post(`/admin/goods/${id}`,data)
}

// 批量删除
export function deleteGoods(ids){
  return axios.post(`/admin/goods/delete_all`,{
    ids
  })
}