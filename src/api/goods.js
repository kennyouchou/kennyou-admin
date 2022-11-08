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

// 修改商品详情
export function updateGoods(id,data){
  return axios.post(`/admin/goods/${id}`,data)
}

// 批量删除
export function deleteGoods(ids){
  return axios.post(`/admin/goods/delete_all`,{
    ids
  })
}

//  读取商品资料
export function readGoods(id){
  return axios.get(`/admin/goods/read/${id}`)
}

// 设置商品轮播图
export function setGoodsBanner(id,data){
  return axios.post(`/admin/goods/banners/${id}`,data)
}

// 修改商品规格
export function updateGoodsSkus(id,data){
  return axios.post(`/admin/goods/updateskus/${id}`,data)
}

// 添加商品规格
export function createGoodsSkusCard(data){
  return axios.post(`/admin/goods_skus_card`,data)
}

// 修改商品规格选项
export function updateGoodsSkusCard(id,data){
  return axios.post(`/admin/goods_skus_card/${id}`,data)
}

// 删除商品规格选项
export function deleteGoodsSkusCard(id){
  return axios.post(`/admin/goods_skus_card/${id}/delete`)
}

// 排序商品规格选项
export function sortGoodsSkusCard(data){
  return axios.post(`/admin/goods_skus_card/sort`,data)
}

// 创建商品规格选项值
export function createGoodsSkusCardValue(data){
  return axios.post(`/admin/goods_skus_card_value`,data)
}

// 修改商品规格选项值
export function updateGoodsSkusCardValue(id,data){
  return axios.post(`/admin/goods_skus_card_value/${id}`,data)
}

// 删除规格选项的值
export function deleteGoodsSkusCardValue(id){
  return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}

// 选择设置商品规格和选项
export function chooseAndSetGoodsSkusCard(id,data){
  return axios.post(`/admin/goods_skus_card/${id}/set`,data)
}